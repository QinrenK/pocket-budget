'use client';

import { useState, useEffect } from 'react';
import { offlineDB, syncOfflineQueue } from '@/lib/db';
import { haptic } from '@/lib/haptics';

export default function OfflineSyncIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [queueSize, setQueueSize] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Update queue size periodically
    const updateQueueSize = async () => {
      try {
        const size = await offlineDB.getQueueSize();
        setQueueSize(size);
      } catch (error) {
        console.error('Failed to get queue size:', error);
      }
    };

    updateQueueSize();
    const interval = setInterval(updateQueueSize, 5000); // Check every 5 seconds

    // Listen for online/offline events
    const handleOnline = async () => {
      setIsOnline(true);
      haptic('success');
      
      // Auto-sync when coming online
      if (queueSize > 0) {
        setIsSyncing(true);
        try {
          await syncOfflineQueue();
          await updateQueueSize();
        } catch (error) {
          console.error('Auto-sync failed:', error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      haptic('warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queueSize]);

  const handleManualSync = async () => {
    haptic('medium');
    setIsSyncing(true);

    try {
      const result = await syncOfflineQueue();
      const size = await offlineDB.getQueueSize();
      setQueueSize(size);
      
      if (result.success > 0) {
        haptic('success');
      }
    } catch (error) {
      console.error('Manual sync failed:', error);
      haptic('error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Don't show if online and no queue
  if (isOnline && queueSize === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 right-4 z-40">
      <div
        className={`
          mx-auto max-w-md px-4 py-3 rounded-xl shadow-lg border-2
          transition-all duration-300
          ${
            isOnline
              ? 'bg-ws-green-light border-ws-green text-ws-gray-900'
              : 'bg-ws-yellow-light border-ws-yellow text-ws-gray-900'
          }
        `}
      >
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <div className="flex-shrink-0">
            {isOnline ? (
              isSyncing ? (
                <div className="animate-spin text-2xl">🔄</div>
              ) : (
                <span className="text-2xl">✓</span>
              )
            ) : (
              <span className="text-2xl">📴</span>
            )}
          </div>

          {/* Status Text */}
          <div className="flex-1 min-w-0">
            {isOnline ? (
              isSyncing ? (
                <p className="text-sm font-semibold">Syncing transactions...</p>
              ) : queueSize > 0 ? (
                <>
                  <p className="text-sm font-semibold">
                    {queueSize} transaction{queueSize !== 1 ? 's' : ''} queued
                  </p>
                  <p className="text-xs opacity-75">Ready to sync</p>
                </>
              ) : (
                <p className="text-sm font-semibold">All synced!</p>
              )
            ) : (
              <>
                <p className="text-sm font-semibold">You're offline</p>
                <p className="text-xs opacity-75">
                  {queueSize > 0
                    ? `${queueSize} transaction${queueSize !== 1 ? 's' : ''} queued`
                    : 'Transactions will be queued'}
                </p>
              </>
            )}
          </div>

          {/* Sync Button */}
          {isOnline && queueSize > 0 && !isSyncing && (
            <button
              onClick={handleManualSync}
              className="flex-shrink-0 px-3 py-1 bg-ws-green text-white rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              Sync Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

