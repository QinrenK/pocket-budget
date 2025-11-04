'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import { haptic } from '@/lib/haptics';

interface PageSwiperProps {
  children: ReactNode;
}

export default function PageSwiper({ children }: PageSwiperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchCurrentX, setTouchCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pages = ['/', '/history', '/dashboard', '/settings'];
  const currentIndex = pages.indexOf(pathname);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Ignore if touch started on an interactive element
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'A' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('[role="button"]') ||
      target.closest('textarea')
    ) {
      return;
    }

    // Ignore if touch started on a horizontally scrollable element
    const scrollableParent = target.closest('.overflow-x-auto, .overflow-x-scroll, .touch-pan-x');
    if (scrollableParent) {
      return;
    }

    setTouchStartX(e.touches[0].clientX);
    setTouchCurrentX(e.touches[0].clientX);
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isTransitioning) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchStartX;
    const absDiffX = Math.abs(diffX);

    // Start dragging if movement is significant
    if (absDiffX > 10) {
      setIsDragging(true);
      setTouchCurrentX(currentX);

      // Determine swipe direction
      if (diffX > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }

      // Prevent scrolling while swiping
      if (absDiffX > 20) {
        e.preventDefault();
      }
    }
  }, [isTransitioning, touchStartX]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) {
      setIsDragging(false);
      setSwipeDirection(null);
      return;
    }

    const diffX = touchCurrentX - touchStartX;
    const threshold = window.innerWidth * 0.25; // 25% of screen width

    if (Math.abs(diffX) > threshold) {
      setIsTransitioning(true);
      haptic('light');

      if (diffX > 0 && currentIndex > 0) {
        // Swipe right - go to previous page
        router.push(pages[currentIndex - 1]);
      } else if (diffX < 0 && currentIndex < pages.length - 1) {
        // Swipe left - go to next page
        router.push(pages[currentIndex + 1]);
      }

      // Reset after transition
      setTimeout(() => {
        setIsTransitioning(false);
        setIsDragging(false);
        setSwipeDirection(null);
      }, 300);
    } else {
      // Reset if threshold not met
      setIsDragging(false);
      setSwipeDirection(null);
    }
  }, [isDragging, touchCurrentX, touchStartX, currentIndex, router, pages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Calculate transform based on drag
  const getDragTransform = () => {
    if (!isDragging || isTransitioning) return 'translateX(0)';
    
    const diffX = touchCurrentX - touchStartX;
    const maxDrag = window.innerWidth * 0.5; // Max drag distance
    const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diffX));
    
    // Prevent dragging beyond bounds
    if ((currentIndex === 0 && diffX > 0) || 
        (currentIndex === pages.length - 1 && diffX < 0)) {
      return `translateX(${clampedDiff * 0.2}px)`; // Rubber band effect
    }
    
    return `translateX(${clampedDiff}px)`;
  };

  // Calculate opacity for preview pages
  const getPreviewOpacity = () => {
    if (!isDragging) return 0;
    const diffX = Math.abs(touchCurrentX - touchStartX);
    return Math.min(diffX / (window.innerWidth * 0.5), 0.3);
  };

  // Get page name for preview
  const getPageName = (path: string) => {
    const names: Record<string, string> = {
      '/': 'Home',
      '/history': 'History',
      '/dashboard': 'Dashboard',
      '/settings': 'Settings',
    };
    return names[path] || 'Page';
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        touchAction: isDragging ? 'pan-y' : 'auto',
      }}
    >
      {/* Previous page preview */}
      {isDragging && swipeDirection === 'right' && currentIndex > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-white"
          style={{
            opacity: getPreviewOpacity(),
            transform: `translateX(-${Math.max(0, window.innerWidth * 0.3 - Math.abs(touchCurrentX - touchStartX) * 0.3)}px)`,
            transition: 'none',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">←</div>
              <p className="text-lg font-semibold text-ws-gray-900">
                {getPageName(pages[currentIndex - 1])}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next page preview */}
      {isDragging && swipeDirection === 'left' && currentIndex < pages.length - 1 && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-white"
          style={{
            opacity: getPreviewOpacity(),
            transform: `translateX(${Math.max(0, window.innerWidth * 0.3 - Math.abs(touchCurrentX - touchStartX) * 0.3)}px)`,
            transition: 'none',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">→</div>
              <p className="text-lg font-semibold text-ws-gray-900">
                {getPageName(pages[currentIndex + 1])}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current page */}
      <div
        className="relative z-10 w-full min-h-screen"
        style={{
          transform: getDragTransform(),
          transition: isDragging && !isTransitioning ? 'none' : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </div>

      {/* Edge indicator - Shows which direction user can swipe */}
      {isDragging && Math.abs(touchCurrentX - touchStartX) > 30 && (
        <div
          className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-opacity duration-200"
          style={{
            [swipeDirection === 'right' ? 'left' : 'right']: '16px',
            opacity: Math.min(getPreviewOpacity() * 3, 1),
          }}
        >
          <div className="w-16 h-16 rounded-full bg-ws-coral flex items-center justify-center text-white text-3xl shadow-2xl animate-pulse">
            {swipeDirection === 'right' ? '←' : '→'}
          </div>
        </div>
      )}
    </div>
  );
}
