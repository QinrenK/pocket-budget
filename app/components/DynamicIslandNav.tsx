'use client';

import { useRouter, usePathname } from 'next/navigation';
import { haptic } from '@/lib/haptics';

export default function DynamicIslandNav() {
  const pathname = usePathname();
  const router = useRouter();

  const pages = ['/', '/history', '/dashboard', '/settings'];
  const currentIndex = pages.indexOf(pathname);

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
