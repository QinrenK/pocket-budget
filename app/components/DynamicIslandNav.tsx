'use client';

import { useRouter, usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';
import { useEffect, useRef, useState } from 'react';

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const swipeDirection = useRef<'horizontal' | 'vertical' | null>(null);

  const pages = ['/', '/history', '/dashboard', '/settings'];
  const currentIndex = pages.indexOf(pathname);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
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
        target.closest('[role="button"]')
      ) {
        isSwiping.current = false;
        return;
      }

      // Ignore if touch started on a horizontally scrollable element
      const scrollableParent = target.closest('.overflow-x-auto, .overflow-x-scroll, .touch-pan-x');
      if (scrollableParent) {
        isSwiping.current = false;
        return;
      }

      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = true;
      swipeDirection.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;

      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;

      // Determine swipe direction if not yet determined
      if (swipeDirection.current === null) {
        const diffX = Math.abs(touchEndX.current - touchStartX.current);
        const diffY = Math.abs(touchEndY.current - touchStartY.current);

        // Only consider it a swipe if movement is significant
        if (diffX > 10 || diffY > 10) {
          // Determine if swipe is more horizontal or vertical
          swipeDirection.current = diffX > diffY ? 'horizontal' : 'vertical';
          
          // If vertical swipe, cancel the swipe gesture
          if (swipeDirection.current === 'vertical') {
            isSwiping.current = false;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isSwiping.current || swipeDirection.current !== 'horizontal') {
        isSwiping.current = false;
        swipeDirection.current = null;
        return;
      }

      const differenceX = touchStartX.current - touchEndX.current;
      const differenceY = Math.abs(touchEndY.current - touchStartY.current);
      const threshold = 80; // Increased threshold for better accuracy

      // Only trigger if horizontal movement is significant and vertical is minimal
      if (Math.abs(differenceX) > threshold && differenceY < 50) {
        if (differenceX > 0 && currentIndex < pages.length - 1) {
          // Swipe left - go to next page
          haptic('light');
          router.push(pages[currentIndex + 1]);
        } else if (differenceX < 0 && currentIndex > 0) {
          // Swipe right - go to previous page
          haptic('light');
          router.push(pages[currentIndex - 1]);
        }
      }

      isSwiping.current = false;
      swipeDirection.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

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
    <nav 
      style={{ 
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 9999,
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '16px',
        backgroundColor: 'transparent',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '540px',
            height: '56px',
            borderRadius: '9999px',
            overflow: 'hidden',
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
        >

        {/* Active indicator background - slides smoothly */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            left: `calc(${currentIndex * 25}% + 8px)`,
            width: 'calc(25% - 16px)',
            transition: 'all 300ms ease-out',
          }}
        >
          <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '9999px' 
          }} />
        </div>

        {/* Content */}
        <div style={{ 
          position: 'relative', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* Horizontal Navigation Items */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            paddingLeft: '8px',
            paddingRight: '8px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '4px' 
          }}>
            <button
              onClick={() => handleNavClick('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0',
                borderRadius: '9999px',
                flex: 1,
                transition: 'all 300ms',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: pathname === '/' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'color 300ms',
                }}
              >
                Home
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0',
                borderRadius: '9999px',
                flex: 1,
                transition: 'all 300ms',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: pathname === '/history' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'color 300ms',
                }}
              >
                History
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0',
                borderRadius: '9999px',
                flex: 1,
                transition: 'all 300ms',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: pathname === '/dashboard' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'color 300ms',
                }}
              >
                Dashboard
              </span>
            </button>

            <button
              onClick={() => handleNavClick('/settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 0',
                borderRadius: '9999px',
                flex: 1,
                transition: 'all 300ms',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  color: pathname === '/settings' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  transition: 'color 300ms',
                }}
              >
                Settings
              </span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
}
