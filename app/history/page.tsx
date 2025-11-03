'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/currency';
import { haptic } from '@/lib/haptics';
import Link from 'next/link';
import DynamicIslandNav from '../components/DynamicIslandNav';
import DateRangePicker from '../components/DateRangePicker';

interface Transaction {
  id: number;
  amount: number;
  ts: string;
  category: string;
  categoryId: number | null;
  icon: string;
  color: string;
  items: Array<{ name: string; amount: number }>;
  vendor: string | null;
  source: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'all' | 'custom'>('month');
  
  // Custom date range
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [dateRange, filterCategory, startDate, endDate]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      let url = '/api/transactions';
      const params = new URLSearchParams();
      
      if (dateRange === 'custom') {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      } else if (dateRange !== 'all') {
        params.append('range', dateRange);
      }
      if (filterCategory) {
        params.append('category_id', filterCategory.toString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setDateRange('custom');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this transaction?')) return;

    haptic('medium');
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
        haptic('success');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      haptic('error');
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const itemsText = tx.items.map((i) => i.name).join(' ').toLowerCase();
      const categoryMatch = tx.category.toLowerCase().includes(query);
      const vendorMatch = tx.vendor?.toLowerCase().includes(query);
      return itemsText.includes(query) || categoryMatch || vendorMatch;
    }
    return true;
  });

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <main className="min-h-screen bg-ws-gray-50 pt-24 page-transition">
      {/* Header */}
      <header className="bg-white px-4 sm:px-6 pt-safe pt-6 pb-6 border-b border-ws-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex-shrink-0">
              <Link href="/" className="text-ws-coral hover:text-ws-coral-dark text-sm font-medium">
                ← Back
              </Link>
              <h1 className="text-2xl sm:text-h1 mt-2 font-bold">History</h1>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs sm:text-sm text-ws-gray-500 whitespace-nowrap">Total</p>
              <p className="text-3xl sm:text-display font-bold text-ws-gray-900 tabular-nums">{formatCurrency(totalAmount)}</p>
            </div>
          </div>

          {/* Search and Date Range */}
          <div className="flex gap-3 mb-4 flex-wrap items-center" onTouchStart={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="flex-1 min-w-[200px] px-4 py-2 bg-white border-2 border-ws-gray-300 rounded-xl text-sm font-medium placeholder:text-ws-gray-500 focus:border-ws-coral focus:outline-none transition-colors"
            />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateRangeChange}
            />
          </div>

          {/* Filters - Scrollable */}
          <div 
            className="flex gap-3 overflow-x-scroll pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 touch-pan-x hide-scrollbar"
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* Date Range */}
            <button
              onClick={() => {
                haptic('light');
                setDateRange('week');
              }}
              className={`chip whitespace-nowrap flex-shrink-0 ${dateRange === 'week' ? 'chip-active' : 'chip-inactive'}`}
            >
              Week
            </button>
            <button
              onClick={() => {
                haptic('light');
                setDateRange('month');
              }}
              className={`chip whitespace-nowrap flex-shrink-0 ${dateRange === 'month' ? 'chip-active' : 'chip-inactive'}`}
            >
              Month
            </button>
            <button
              onClick={() => {
                haptic('light');
                setDateRange('all');
              }}
              className={`chip whitespace-nowrap flex-shrink-0 ${dateRange === 'all' ? 'chip-active' : 'chip-inactive'}`}
            >
              All Time
            </button>

            {/* Category Filter */}
            <div className="border-l border-ws-gray-300 h-10 mx-1 flex-shrink-0" />
            <button
              onClick={() => {
                haptic('light');
                setFilterCategory(null);
              }}
              className={`chip whitespace-nowrap flex-shrink-0 ${filterCategory === null ? 'chip-active' : 'chip-inactive'}`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  haptic('light');
                  setFilterCategory(filterCategory === cat.id ? null : cat.id);
                }}
                className={`chip whitespace-nowrap flex-shrink-0 ${filterCategory === cat.id ? 'chip-active' : 'chip-inactive'}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Transactions List */}
      <section className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📭</div>
            <p className="text-ws-gray-500">
              {searchQuery || filterCategory
                ? 'No transactions match your filters'
                : 'No transactions yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTransactions.map((tx, i) => (
              <div
                key={tx.id}
                className="card animate-fade-in-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Icon & Category */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: tx.color + '20' }}
                    >
                      {tx.icon || '📦'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-ws-gray-900">
                        {tx.category || 'Uncategorized'}
                      </span>
                      {tx.source === 'receipt' && (
                        <span className="text-xs bg-ws-gray-200 text-ws-gray-700 px-2 py-0.5 rounded">
                          📸 Receipt
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ws-gray-500 truncate">
                      {tx.items?.length > 0
                        ? tx.items.map((i) => i.name).join(', ')
                        : tx.vendor || 'No items'}
                    </p>
                    <p className="text-xs text-ws-gray-400 mt-1">
                      {new Date(tx.ts).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Amount & Actions */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xl font-bold tabular-nums text-ws-gray-900 mb-2">
                      {formatCurrency(tx.amount)}
                    </p>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-xs text-ws-red hover:text-ws-red-dark transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />
    </main>
  );
}

