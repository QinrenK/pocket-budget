'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');

  return (
    <main className="min-h-screen bg-ws-gray-50 pb-safe">
      {/* Hero Section - Input Area */}
      <section className="bg-white px-6 pt-safe pt-12 pb-8 border-b border-ws-gray-300">
        <div className="max-w-2xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-h1 text-ws-gray-900 mb-2">
              Pocket Budget
            </h1>
            <p className="text-sm text-ws-gray-500">
              Quick expense entry · EN/中文
            </p>
          </div>

          {/* Main Input */}
          <div className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="15 beef, 12.9 carrot or 牛肉 15..."
              className="input-field"
              autoFocus
            />

            <div className="flex gap-3">
              <button className="btn-primary flex-1">
                Add Expense
              </button>
              <button className="btn-secondary w-16 flex items-center justify-center">
                📸
              </button>
            </div>
          </div>

          {/* Period Chips */}
          <div className="flex gap-3 mt-8 overflow-x-auto hide-scrollbar">
            <button className="chip chip-active">
              Today · $127.50
            </button>
            <button className="chip chip-inactive">
              Week · $856.20
            </button>
            <button className="chip chip-inactive">
              Month · $2,341.80
            </button>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="px-6 py-8 max-w-2xl mx-auto">
        <h2 className="text-h2 mb-4">Recent</h2>
        
        <div className="space-y-3">
          {/* Sample Transaction Card */}
          <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-medium text-ws-gray-900">
                    Grocery
                  </span>
                  <span className="category-pill bg-ws-green-light text-ws-green">
                    🛒 Grocery
                  </span>
                </div>
                <p className="text-sm text-ws-gray-500">
                  beef, carrot, milk
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums text-ws-gray-900">
                  $27.90
                </p>
                <p className="text-xs text-ws-gray-500 mt-1">
                  2:34 PM
                </p>
              </div>
            </div>
          </div>

          {/* Loading Skeleton Example */}
          <div className="skeleton" style={{ animationDelay: '100ms' }}></div>
        </div>
      </section>

      {/* Floating Action Hint (iOS style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-ws-gray-900/90 text-white text-xs rounded-full backdrop-blur-sm no-print">
        ⬆️ Add to Home Screen for best experience
      </div>
    </main>
  );
}

