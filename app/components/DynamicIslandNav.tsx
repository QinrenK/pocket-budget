'use client';

import { useRouter, usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';
import { useEffect, useRef, useState } from 'react';

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const pages = ['/', '/history', '/dashboard', '/settings'];
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

  // Detect scroll to adjust nav bar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (path: string) => {
    haptic('light');
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pb-safe">
      {/* Backdrop blur layer - covers full width */}
      <div
        className={`
          absolute inset-0 -top-20 transition-all duration-300
          ${isScrolled ? 'bg-black/10 backdrop-blur-md' : 'bg-transparent'}
        `}
      />
      
      {/* Navigation Island */}
      <div className="relative flex justify-center py-4">
        <div
          className="
            relative overflow-hidden
            w-[540px] max-w-[calc(100vw-32px)] h-[56px] rounded-full
            transition-all duration-300 ease-out
          "
        >
          {/* Glassmorphism background */}
          <div
            className={`
              absolute inset-0
              transition-all duration-300
              backdrop-blur-2xl
              border border-white/10
              shadow-2xl
              ${
                isScrolled
                  ? 'bg-gradient-to-b from-ws-gray-900/98 to-ws-gray-900/95'
                  : 'bg-gradient-to-b from-ws-gray-900/95 to-ws-gray-900/90'
              }
            `}
          />

        {/* Active indicator background - slides smoothly */}
        <div
          className="absolute top-2 bottom-2 transition-all duration-300 ease-out"
          style={{
            left: `calc(${currentIndex * 25}% + 8px)`,
            width: 'calc(25% - 16px)',
          }}
        >
          <div className="w-full h-full bg-white/20 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          {/* Horizontal Navigation Items */}
          <div className="w-full h-full px-2 flex items-center justify-between gap-1">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center justify-center py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
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
              className="flex items-center justify-center py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
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
              onClick={() => handleNavClick('/dashboard')}
              className="flex items-center justify-center py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
            >
              <span
                className={`text-[14px] font-medium tracking-tight transition-colors duration-300 ${
                  pathname === '/dashboard' ? 'text-white' : 'text-white/60'
                }`}
              >
                Dashboard
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/settings')}
              className="flex items-center justify-center py-3 rounded-full transition-all duration-300 flex-1 active:scale-95"
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
