'use client';

import { useRouter, usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';
import { useEffect, useRef, useState } from 'react';

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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
            background: 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
