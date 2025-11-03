'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/currency';
import { haptic } from '@/lib/haptics';
import Link from 'next/link';
import DynamicIslandNav from '../components/DynamicIslandNav';
import DateRangePicker from '../components/DateRangePicker';

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
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'custom'>('month');
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [averagePerDay, setAveragePerDay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Date range state
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange, startDate, endDate]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Build query string
      let url = `/api/dashboard?range=${timeRange}`;
      if (timeRange === 'custom') {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCategoryTotals(data.categoryTotals || []);
        setSpendingTrend(data.spendingTrend || []);
        setTotalSpent(data.totalSpent || 0);
        setTransactionCount(data.transactionCount || 0);
        setAveragePerDay(data.averagePerDay || 0);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setTimeRange('custom');
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
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-3">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    haptic('light');
                    setTimeRange(range);
                    // Reset to default date range for preset options
                    if (range === 'week') {
                      const end = new Date();
                      const start = new Date();
                      start.setDate(end.getDate() - 7);
                      setStartDate(start.toISOString().split('T')[0]);
                      setEndDate(end.toISOString().split('T')[0]);
                    } else if (range === 'month') {
                      const end = new Date();
                      const start = new Date();
                      start.setDate(end.getDate() - 30);
                      setStartDate(start.toISOString().split('T')[0]);
                      setEndDate(end.toISOString().split('T')[0]);
                    } else if (range === 'year') {
                      const end = new Date();
                      const start = new Date();
                      start.setFullYear(end.getFullYear() - 1);
                      setStartDate(start.toISOString().split('T')[0]);
                      setEndDate(end.toISOString().split('T')[0]);
                    }
                  }}
                  className={`chip ${timeRange === range ? 'chip-active' : 'chip-inactive'}`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateRangeChange}
            />
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
                  {/* Interactive Donut Chart */}
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
                        const isSelected = selectedCategory === index;

                        return (
                          <circle
                            key={cat.category}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={getColorForCategory(index)}
                            strokeWidth={isSelected ? "14" : "12"}
                            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                            strokeDashoffset={-offset}
                            className="transition-all duration-300 cursor-pointer"
                            style={{
                              opacity: selectedCategory === null || isSelected ? 1 : 0.4,
                              filter: isSelected ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                            }}
                            onClick={() => {
                              haptic('light');
                              setSelectedCategory(isSelected ? null : index);
                            }}
                            onMouseEnter={() => setSelectedCategory(index)}
                            onMouseLeave={() => setSelectedCategory(null)}
                          />
                        );
                      })}
                      {/* Center hole */}
                      <circle cx="50" cy="50" r="28" fill="white" className="transform rotate-90 pointer-events-none" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                      {selectedCategory !== null && categoryTotals[selectedCategory] ? (
                        <>
                          <p className="text-3xl font-bold text-ws-gray-900 transition-all duration-300">
                            {Math.round(categoryTotals[selectedCategory].percentage)}%
                          </p>
                          <p className="text-xs text-ws-gray-500 mt-1 text-center px-2">
                            {categoryTotals[selectedCategory].icon} {categoryTotals[selectedCategory].category}
                          </p>
                          <p className="text-sm font-bold text-ws-gray-900 mt-1">
                            {formatCurrency(categoryTotals[selectedCategory].total)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-3xl font-bold text-ws-gray-900">
                            {categoryTotals.length > 0 ? Math.round(categoryTotals[0].percentage) : 0}%
                          </p>
                          <p className="text-xs text-ws-gray-500 mt-1">
                            {categoryTotals.length > 0 ? categoryTotals[0].category : 'Top'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Interactive Legend */}
                  <div className="grid grid-cols-2 gap-3">
                    {categoryTotals.map((cat, index) => {
                      const isSelected = selectedCategory === index;
                      return (
                        <div
                          key={cat.category}
                          onClick={() => {
                            haptic('light');
                            setSelectedCategory(isSelected ? null : index);
                          }}
                          onMouseEnter={() => setSelectedCategory(index)}
                          onMouseLeave={() => setSelectedCategory(null)}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-ws-coral-light shadow-md scale-105'
                              : 'hover:bg-ws-gray-50'
                          }`}
                          style={{
                            opacity: selectedCategory === null || isSelected ? 1 : 0.5,
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 transition-all duration-300"
                            style={{
                              backgroundColor: getColorForCategory(index),
                              transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                              boxShadow: isSelected
                                ? `0 0 12px ${getColorForCategory(index)}`
                                : 'none',
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{cat.icon}</span>
                              <p className="text-sm font-semibold text-ws-gray-900 truncate">
                                {cat.category}
                              </p>
                            </div>
                            <p className="text-xs text-ws-gray-500">
                              {cat.transactionCount} transaction{cat.transactionCount !== 1 ? 's' : ''} · {cat.percentage.toFixed(1)}%
                            </p>
                          </div>
                          <p className="text-sm font-bold tabular-nums text-ws-gray-900">
                            {formatCurrency(cat.total)}
                          </p>
                        </div>
                      );
                    })}
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
                  {formatCurrency(averagePerDay)}
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

