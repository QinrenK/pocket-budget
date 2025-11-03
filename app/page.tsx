'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { parseExpenseText } from '@/lib/parser';
import { formatCurrency } from '@/lib/currency';
import { haptic, hapticSuccess, hapticError } from '@/lib/haptics';
import DynamicIslandNav from './components/DynamicIslandNav';
import OfflineSyncIndicator from './components/OfflineSyncIndicator';
import { offlineDB } from '@/lib/db';

interface Transaction {
  id: number;
  amount: number;
  category: string;
  items: Array<{ name: string; amount: number }>;
  ts: string;
}

interface Rollup {
  total: number;
  transactionCount: number;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parsePreview, setParsePreview] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeRange, setActiveRange] = useState<'today' | 'week' | 'month'>('today');
  const [rollups, setRollups] = useState<Record<string, Rollup>>({
    today: { total: 0, transactionCount: 0 },
    week: { total: 0, transactionCount: 0 },
    month: { total: 0, transactionCount: 0 },
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Parse preview as user types
  useEffect(() => {
    if (!input.trim()) {
      setParsePreview('');
      return;
    }

    const result = parseExpenseText(input);
    if (result.success) {
      const itemsText = result.items.map((i) => i.name).join(', ');
      setParsePreview(`${itemsText} · ${formatCurrency(result.total)}`);
    } else {
      setParsePreview('');
    }
  }, [input]);

  // Fetch rollups and transactions on mount and after new transaction
  useEffect(() => {
    fetchRollups();
    fetchRecentTransactions();
  }, []);

  const fetchRollups = async () => {
    try {
      const ranges: Array<'today' | 'week' | 'month'> = ['today', 'week', 'month'];
      const results = await Promise.all(
        ranges.map((range) =>
          fetch(`/api/rollups?range=${range}`).then((r) => (r.ok ? r.json() : null))
        )
      );

      const newRollups: Record<string, Rollup> = {};
      ranges.forEach((range, i) => {
        if (results[i]) {
          newRollups[range] = {
            total: results[i].total,
            transactionCount: results[i].transactionCount,
          };
        }
      });

      setRollups((prev) => ({ ...prev, ...newRollups }));
    } catch (error) {
      console.error('Failed to fetch rollups:', error);
    }
  };

  const fetchRecentTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/transactions/recent?limit=20');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    haptic('medium');
    setIsSubmitting(true);

    try {
      // Parse locally first
      const parseResult = parseExpenseText(input);

      if (!parseResult.success) {
        hapticError();
        setToastMessage(parseResult.error || 'Failed to parse input');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      // Check if online
      if (!navigator.onLine) {
        // Offline: Queue transaction
        await offlineDB.addToQueue({
          rawText: input,
          source: 'text',
        });

        hapticSuccess();
        setInput('');
        setParsePreview('');
        setToastMessage('Saved offline · Will sync when online');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      // Submit to API
      const response = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_text: input,
          source: 'text',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }

      const data = await response.json();

      // Success!
      hapticSuccess();
      setInput('');
      setParsePreview('');

      // Update rollups and transactions
      fetchRollups();
      fetchRecentTransactions();

      // Show success toast
      setToastMessage(
        `Added ${data.transaction.category} · ${formatCurrency(data.transaction.amount)}`
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Re-focus input
      inputRef.current?.focus();
    } catch (error) {
      console.error('Submit error:', error);
      hapticError();
      setToastMessage(error instanceof Error ? error.message : 'Failed to save');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRangeChange = (range: 'today' | 'week' | 'month') => {
    haptic('light');
    setActiveRange(range);
  };

  return (
    <main className="min-h-screen bg-ws-gray-50 pt-24 page-transition">
      {/* Hero Section - Input Area */}
      <section className="bg-white px-4 sm:px-6 pt-safe pt-12 pb-8 border-b border-ws-gray-300">
        <div className="max-w-2xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-h1 text-ws-gray-900 mb-2">Pocket Budget</h1>
            <p className="text-sm text-ws-gray-500">Quick expense entry · EN/中文</p>
          </div>

          {/* Main Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative mb-8">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="15 beef, 12.9 carrot or 牛肉 15..."
                className="input-field"
                disabled={isSubmitting}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {parsePreview && (
                <div className="mt-2 text-sm text-ws-gray-600 font-medium animate-fade-in-up">
                  Preview: {parsePreview}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={isSubmitting || !input.trim()}
              >
                {isSubmitting ? 'Adding...' : 'Add Expense'}
              </button>
              <button
                type="button"
                className="btn-secondary w-16 flex items-center justify-center"
                onClick={() => {
                  haptic('medium');
                  alert('Receipt OCR coming soon!');
                }}
              >
                📸
              </button>
            </div>
          </form>

          {/* Period Chips */}
          <div className="flex gap-3 mt-8 overflow-x-auto hide-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6 touch-pan-x" onTouchStart={(e) => e.stopPropagation()}>
            {(['today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => handleRangeChange(range)}
                className={`chip whitespace-nowrap flex-shrink-0 ${activeRange === range ? 'chip-active' : 'chip-inactive'}`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)} ·{' '}
                {formatCurrency(rollups[range]?.total || 0)}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Recent Transactions */}
      <section className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-h2 mb-4">Recent</h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <p className="text-ws-gray-500">
              No expenses yet. Try adding one above!
              <br />
              <span className="text-sm">Example: "15 beef, 12.9 carrot"</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <Link
                key={tx.id}
                href="/history"
                onClick={() => haptic('light')}
                className="card animate-fade-in-up block hover:shadow-ws-md transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-ws-gray-900">
                        {tx.category || 'Uncategorized'}
                      </span>
                    </div>
                    <p className="text-sm text-ws-gray-500">
                      {tx.items?.length > 0 
                        ? tx.items.map((item) => item.name).join(', ')
                        : 'No items'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold tabular-nums text-ws-gray-900">
                      {formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-ws-gray-500 mt-1">
                      {new Date(tx.ts).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {/* See More Button - Only show if we have transactions */}
            {transactions.length >= 20 && (
              <div className="mt-6 text-center">
                <Link
                  href="/history"
                  onClick={() => haptic('light')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ws-gray-900 text-white font-semibold hover:bg-ws-gray-700 transition-colors"
                >
                  See More History →
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast z-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-semibold">{toastMessage}</p>
              <p className="text-sm opacity-80">Today: {formatCurrency(rollups.today.total)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Offline Sync Indicator */}
      <OfflineSyncIndicator />

      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />
    </main>
  );
}
