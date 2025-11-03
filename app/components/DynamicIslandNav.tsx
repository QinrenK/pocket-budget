'use client';

import { useRouter, usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';
import { useEffect, useRef } from 'react';

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const pages = ['/', '/history', '/settings'];
  const currentIndex = pages.indexOf(pathname);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const difference = touchStartX.current - touchEndX.current;
      const threshold = 50;

      if (Math.abs(difference) > threshold) {
        if (difference > 0 && currentIndex < pages.length - 1) {
          // Swipe left - go to next page
          haptic('light');
          router.push(pages[currentIndex + 1]);
        } else if (difference < 0 && currentIndex > 0) {
          // Swipe right - go to previous page
          haptic('light');
          router.push(pages[currentIndex - 1]);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, router]);

  const handleNavClick = (path: string) => {
    haptic('light');
    router.push(path);
  };

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

        {/* Active indicator background - slides smoothly */}
        <div
          className="absolute inset-y-2 transition-all duration-300 ease-out"
          style={{
            left: currentIndex === 0 ? '8px' : currentIndex === 1 ? 'calc(33.33% + 4px)' : 'calc(66.66% + 0px)',
            width: currentIndex === 0 ? 'calc(33.33% - 12px)' : currentIndex === 1 ? 'calc(33.33% - 8px)' : 'calc(33.33% - 12px)',
          }}
        >
          <div className="w-full h-full bg-white/20 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          {/* Horizontal Navigation Items */}
          <div className="w-full h-full px-6 flex items-center justify-around gap-4">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
            >
              <span
                className={`text-[15px] font-medium tracking-tight transition-colors duration-300 ${
                  pathname === '/' ? 'text-white' : 'text-white/60'
                }`}
              >
                Home
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/history')}
              className="flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
            >
              <span
                className={`text-[15px] font-medium tracking-tight transition-colors duration-300 ${
                  pathname === '/history' ? 'text-white' : 'text-white/60'
                }`}
              >
                History
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/settings')}
              className="flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
            >
              <span
                className={`text-[15px] font-medium tracking-tight transition-colors duration-300 ${
                  pathname === '/settings' ? 'text-white' : 'text-white/60'
                }`}
              >
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
