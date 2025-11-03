'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/currency';
import { haptic } from '@/lib/haptics';
import Link from 'next/link';
import DynamicIslandNav from '../components/DynamicIslandNav';

interface CategoryTotal {
  category: string;
  icon: string;
  color: string;
  total: number;
  percentage: number;
  transactionCount: number;
}

interface SpendingTrend {
  period: string;
  amount: number;
}

export default function DashboardPage() {
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [spendingTrend, setSpendingTrend] = useState<SpendingTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch category totals
      const response = await fetch(`/api/dashboard?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setCategoryTotals(data.categoryTotals || []);
        setSpendingTrend(data.spendingTrend || []);
        setTotalSpent(data.totalSpent || 0);
        setTransactionCount(data.transactionCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorForCategory = (index: number) => {
    const colors = [
      '#A78BFA', // Purple
      '#60A5FA', // Blue
      '#34D399', // Green
      '#FBBF24', // Yellow
      '#F87171', // Red
      '#FB923C', // Orange
      '#EC4899', // Pink
      '#8B5CF6', // Violet
    ];
    return colors[index % colors.length];
  };

  const maxAmount = Math.max(...categoryTotals.map((c) => c.total), 1);

  return (
    <main className="min-h-screen bg-ws-gray-50 pt-24 page-transition">
      {/* Header */}
      <header className="bg-white px-6 pt-safe pt-6 pb-6 border-b border-ws-gray-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/" className="text-ws-coral hover:text-ws-coral-dark text-sm font-medium">
                ← Back
              </Link>
              <h1 className="text-h1 mt-2">Dashboard</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-ws-gray-500">Total Spent</p>
              <p className="text-display text-ws-gray-900">{formatCurrency(totalSpent)}</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-3">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => {
                  haptic('light');
                  setTimeRange(range);
                }}
                className={`chip ${timeRange === range ? 'chip-active' : 'chip-inactive'}`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="skeleton h-64 rounded-2xl" />
            <div className="skeleton h-48 rounded-2xl" />
          </div>
        ) : (
          <>
            {/* Pie Chart Section */}
            <section className="card">
              <h2 className="text-h2 mb-6">Spending by Category</h2>
              
              {categoryTotals.length > 0 ? (
                <div className="space-y-6">
                  {/* Simple Donut Chart */}
                  <div className="relative w-64 h-64 mx-auto">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {categoryTotals.map((cat, index) => {
                        const percentage = cat.percentage;
                        const prevPercentages = categoryTotals
                          .slice(0, index)
                          .reduce((sum, c) => sum + c.percentage, 0);
                        const circumference = 2 * Math.PI * 40;
                        const offset = (prevPercentages / 100) * circumference;
                        const dashLength = (percentage / 100) * circumference;

                        return (
                          <circle
                            key={cat.category}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={getColorForCategory(index)}
                            strokeWidth="12"
                            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                            strokeDashoffset={-offset}
                            className="transition-all duration-500"
                          />
                        );
                      })}
                      {/* Center hole */}
                      <circle cx="50" cy="50" r="28" fill="white" className="transform rotate-90" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-ws-gray-900">
                        {categoryTotals.length > 0 ? Math.round(categoryTotals[0].percentage) : 0}%
                      </p>
                      <p className="text-xs text-ws-gray-500 mt-1">
                        {categoryTotals.length > 0 ? categoryTotals[0].category : 'Top'}
                      </p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3">
                    {categoryTotals.map((cat, index) => (
                      <div
                        key={cat.category}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-ws-gray-50 transition-colors"
                      >
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getColorForCategory(index) }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{cat.icon}</span>
                            <p className="text-sm font-semibold text-ws-gray-900 truncate">
                              {cat.category}
                            </p>
                          </div>
                          <p className="text-xs text-ws-gray-500">
                            {cat.transactionCount} transactions · {cat.percentage.toFixed(1)}%
                          </p>
                        </div>
                        <p className="text-sm font-bold tabular-nums text-ws-gray-900">
                          {formatCurrency(cat.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-ws-gray-500">No spending data yet</p>
                  <Link href="/" className="text-ws-coral hover:text-ws-coral-dark text-sm font-medium mt-2 inline-block">
                    Add your first expense →
                  </Link>
                </div>
              )}
            </section>

            {/* Bar Chart - Top Categories */}
            <section className="card">
              <h2 className="text-h2 mb-6">Top Spending Categories</h2>
              <div className="space-y-4">
                {categoryTotals.slice(0, 5).map((cat, index) => (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm font-semibold text-ws-gray-900">
                          {cat.category}
                        </span>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-ws-gray-900">
                        {formatCurrency(cat.total)}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-ws-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(cat.total / maxAmount) * 100}%`,
                          backgroundColor: getColorForCategory(index),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <p className="text-sm text-ws-gray-500 mb-2">Average per Day</p>
                <p className="text-2xl font-bold tabular-nums text-ws-gray-900">
                  {(() => {
                    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
                    const avgPerDay = days > 0 ? totalSpent / days : 0;
                    return formatCurrency(avgPerDay);
                  })()}
                </p>
              </div>
              <div className="card text-center">
                <p className="text-sm text-ws-gray-500 mb-2">Total Transactions</p>
                <p className="text-2xl font-bold tabular-nums text-ws-gray-900">
                  {transactionCount}
                </p>
              </div>
            </section>

            {/* View Full History */}
            <div className="text-center pt-4">
              <Link
                href="/history"
                onClick={() => haptic('light')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ws-coral text-white font-semibold hover:bg-ws-coral-dark transition-colors"
              >
                View Full History →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />
    </main>
  );
}

