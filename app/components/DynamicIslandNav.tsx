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
          w-[400px] h-[56px] rounded-full
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
          <div className="w-full h-full px-6 flex items-center justify-around gap-4">
            <Link
              href="/"
              onClick={() => haptic('light')}
              className={`
                flex items-center justify-center px-8 py-3 rounded-full
                transition-all duration-200
                ${
                  pathname === '/'
                    ? 'bg-white/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span
                className={`text-[15px] font-medium tracking-tight ${
                  pathname === '/' ? 'text-white' : 'text-white/60'
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              href="/history"
              onClick={() => haptic('light')}
              className={`
                flex items-center justify-center px-8 py-3 rounded-full
                transition-all duration-200
                ${
                  pathname === '/history'
                    ? 'bg-white/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span
                className={`text-[15px] font-medium tracking-tight ${
                  pathname === '/history' ? 'text-white' : 'text-white/60'
                }`}
              >
                History
              </span>
            </Link>

            <Link
              href="/settings"
              onClick={() => haptic('light')}
              className={`
                flex items-center justify-center px-8 py-3 rounded-full
                transition-all duration-200
                ${
                  pathname === '/settings'
                    ? 'bg-white/20'
                    : 'hover:bg-white/10 active:scale-95'
                }
              `}
            >
              <span
                className={`text-[15px] font-medium tracking-tight ${
                  pathname === '/settings' ? 'text-white' : 'text-white/60'
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
