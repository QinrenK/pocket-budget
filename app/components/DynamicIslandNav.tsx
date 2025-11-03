'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';

export default function DynamicIslandNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleExpanded = () => {
    haptic('medium');
    setIsExpanded(!isExpanded);
  };

  const getCurrentPageEmoji = () => {
    if (pathname === '/history') return '📊';
    if (pathname === '/settings') return '⚙️';
    return '🏠';
  };

  const getCurrentPageName = () => {
    if (pathname === '/history') return 'History';
    if (pathname === '/settings') return 'Settings';
    return 'PB';
  };

  return (
    <>
      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleExpanded}
        />
      )}

      {/* Dynamic Island Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`
            relative overflow-hidden
            transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            ${
              isExpanded
                ? 'w-[280px] h-[180px] rounded-[36px]'
                : 'w-[140px] h-[56px] rounded-full'
            }
          `}
        >
          {/* Glassmorphism background */}
          <div
            className={`
              absolute inset-0
              bg-gradient-to-b from-ws-gray-900/95 to-ws-gray-900/90
              backdrop-blur-2xl
              border border-white/10
              shadow-2xl
              transition-all duration-500
            `}
          />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            {!isExpanded ? (
              // Collapsed state - Pill
              <button
                onClick={toggleExpanded}
                className="flex items-center gap-3 px-6 py-3 w-full h-full justify-center group"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  {getCurrentPageEmoji()}
                </span>
                <span className="text-sm font-semibold text-white">
                  {getCurrentPageName()}
                </span>
              </button>
            ) : (
              // Expanded state - Menu
              <div className="w-full h-full p-6 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Navigate
                  </span>
                  <button
                    onClick={toggleExpanded}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <span className="text-white/80 text-lg">×</span>
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 flex flex-col gap-2">
                  <Link
                    href="/"
                    onClick={() => {
                      haptic('light');
                      setIsExpanded(false);
                    }}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-2xl
                      transition-all duration-200
                      ${
                        pathname === '/'
                          ? 'bg-ws-coral/20 shadow-lg shadow-ws-coral/20'
                          : 'hover:bg-white/10'
                      }
                      group
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-200
                        ${
                          pathname === '/'
                            ? 'bg-ws-coral text-white scale-110'
                            : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="text-xl">🏠</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Home</div>
                      <div className="text-xs text-white/50">Quick entry</div>
                    </div>
                    {pathname === '/' && (
                      <div className="w-2 h-2 rounded-full bg-ws-coral animate-pulse" />
                    )}
                  </Link>

                  <Link
                    href="/history"
                    onClick={() => {
                      haptic('light');
                      setIsExpanded(false);
                    }}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-2xl
                      transition-all duration-200
                      ${
                        pathname === '/history'
                          ? 'bg-ws-coral/20 shadow-lg shadow-ws-coral/20'
                          : 'hover:bg-white/10'
                      }
                      group
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-200
                        ${
                          pathname === '/history'
                            ? 'bg-ws-coral text-white scale-110'
                            : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="text-xl">📊</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">History</div>
                      <div className="text-xs text-white/50">All transactions</div>
                    </div>
                    {pathname === '/history' && (
                      <div className="w-2 h-2 rounded-full bg-ws-coral animate-pulse" />
                    )}
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => {
                      haptic('light');
                      setIsExpanded(false);
                    }}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-2xl
                      transition-all duration-200
                      ${
                        pathname === '/settings'
                          ? 'bg-ws-coral/20 shadow-lg shadow-ws-coral/20'
                          : 'hover:bg-white/10'
                      }
                      group
                    `}
                  >
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        transition-all duration-200
                        ${
                          pathname === '/settings'
                            ? 'bg-ws-coral text-white scale-110'
                            : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="text-xl">⚙️</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Settings</div>
                      <div className="text-xs text-white/50">Preferences</div>
                    </div>
                    {pathname === '/settings' && (
                      <div className="w-2 h-2 rounded-full bg-ws-coral animate-pulse" />
                    )}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

