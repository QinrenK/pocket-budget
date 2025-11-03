'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';

export default function DynamicIslandNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          relative overflow-hidden
          w-[320px] h-[72px] rounded-[36px]
          transition-all duration-300 ease-out
        "
      >
        {/* Glassmorphism background */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b from-ws-gray-900/95 to-ws-gray-900/90
            backdrop-blur-2xl
            border border-white/10
            shadow-2xl
          "
        />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          {/* Horizontal Navigation Items */}
          <div className="w-full h-full px-4 flex items-center justify-around gap-2">
            <Link
              href="/"
              onClick={() => haptic('light')}
              className={`
                flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl
                transition-all duration-200 flex-1
                ${
                  pathname === '/'
                    ? 'bg-ws-coral/30 shadow-lg shadow-ws-coral/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span className="text-2xl">🏠</span>
              <span
                className={`text-[10px] font-semibold ${
                  pathname === '/' ? 'text-white' : 'text-white/70'
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              href="/history"
              onClick={() => haptic('light')}
              className={`
                flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl
                transition-all duration-200 flex-1
                ${
                  pathname === '/history'
                    ? 'bg-ws-coral/30 shadow-lg shadow-ws-coral/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span className="text-2xl">📊</span>
              <span
                className={`text-[10px] font-semibold ${
                  pathname === '/history' ? 'text-white' : 'text-white/70'
                }`}
              >
                History
              </span>
            </Link>

            <Link
              href="/settings"
              onClick={() => haptic('light')}
              className={`
                flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl
                transition-all duration-200 flex-1
                ${
                  pathname === '/settings'
                    ? 'bg-ws-coral/30 shadow-lg shadow-ws-coral/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span className="text-2xl">⚙️</span>
              <span
                className={`text-[10px] font-semibold ${
                  pathname === '/settings' ? 'text-white' : 'text-white/70'
                }`}
              >
                Settings
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
