/**
 * IndexedDB wrapper for offline transaction queue
 * Stores transactions locally when offline, syncs when online
 */

const DB_NAME = 'PocketBudgetDB';
const DB_VERSION = 1;
const STORE_NAME = 'offlineQueue';

interface QueuedTransaction {
  id: string;
  data: {
    rawText: string;
    source: string;
  };
  timestamp: number;
  retryCount: number;
}

class OfflineDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (typeof window === 'undefined') {
      return; // Server-side, skip initialization
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[DB] Failed to open database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[DB] Database opened successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store for offline queue
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          console.log('[DB] Object store created');
        }
      };
    });
  }

  async addToQueue(data: { rawText: string; source: string }): Promise<string> {
    if (!this.db) {
      await this.init();
    }

    const id = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const queuedTransaction: QueuedTransaction = {
      id,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(queuedTransaction);

      request.onsuccess = () => {
        console.log('[DB] Transaction added to offline queue:', id);
        resolve(id);
      };

      request.onerror = () => {
        console.error('[DB] Failed to add transaction:', request.error);
        reject(request.error);
      };
    });
  }

  async getQueue(): Promise<QueuedTransaction[]> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('[DB] Failed to get queue:', request.error);
        reject(request.error);
      };
    });
  }

  async removeFromQueue(id: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('[DB] Transaction removed from queue:', id);
        resolve();
      };

      request.onerror = () => {
        console.error('[DB] Failed to remove transaction:', request.error);
        reject(request.error);
      };
    });
  }

  async updateRetryCount(id: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const item = getRequest.result;
        if (item) {
          item.retryCount += 1;
          const updateRequest = store.put(item);

          updateRequest.onsuccess = () => {
            console.log('[DB] Retry count updated:', id, item.retryCount);
            resolve();
          };

          updateRequest.onerror = () => {
            reject(updateRequest.error);
          };
        } else {
          resolve();
        }
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  }

  async clearQueue(): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        console.log('[DB] Queue cleared');
        resolve();
      };

      request.onerror = () => {
        console.error('[DB] Failed to clear queue:', request.error);
        reject(request.error);
      };
    });
  }

  async getQueueSize(): Promise<number> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

// Singleton instance
export const offlineDB = new OfflineDB();

// Sync queue with server
export async function syncOfflineQueue(): Promise<{
  success: number;
  failed: number;
}> {
  const queue = await offlineDB.getQueue();
  let success = 0;
  let failed = 0;

  console.log(`[Sync] Starting sync of ${queue.length} queued transactions`);

  for (const item of queue) {
    try {
      // Attempt to sync with server
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data),
      });

      if (response.ok) {
        // Successfully synced, remove from queue
        await offlineDB.removeFromQueue(item.id);
        success++;
        console.log(`[Sync] ✓ Synced transaction ${item.id}`);
      } else {
        // Failed, update retry count
        if (item.retryCount < 3) {
          await offlineDB.updateRetryCount(item.id);
          failed++;
          console.warn(`[Sync] ✗ Failed to sync ${item.id}, retry ${item.retryCount + 1}/3`);
        } else {
          // Max retries reached, remove from queue
          await offlineDB.removeFromQueue(item.id);
          failed++;
          console.error(`[Sync] ✗ Max retries reached for ${item.id}, removing from queue`);
        }
      }
    } catch (error) {
      console.error(`[Sync] Error syncing ${item.id}:`, error);
      failed++;
    }
  }

  console.log(`[Sync] Complete: ${success} success, ${failed} failed`);
  return { success, failed };
}

// Auto-sync when online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('[Sync] Network online, starting auto-sync');
    syncOfflineQueue().catch(console.error);
  });

  // Initialize database on load
  offlineDB.init().catch(console.error);
}

