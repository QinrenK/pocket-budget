'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPWA, setIsPWA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [showManualOptions, setShowManualOptions] = useState(false);

  useEffect(() => {
    // Check if running in PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as { standalone?: boolean }).standalone 
      || document.referrer.includes('android-app://');

    setIsPWA(isStandalone);

    if (isStandalone) {
      // Already in PWA, redirect to callback
      const code = searchParams.get('code');
      if (code) {
        window.location.href = `/api/auth/callback?code=${code}`;
      } else {
        router.push('/');
      }
    } else {
      // In browser, automatically redirect after a short delay
      const code = searchParams.get('code');
      if (code) {
        const pwaUrl = `/api/auth/callback?code=${code}`;
        
        // Show manual options after 2 seconds if auto-redirect doesn't work
        const manualTimer = setTimeout(() => {
          setIsProcessing(false);
          setShowManualOptions(true);
        }, 2000);

        // Try automatic redirect
        setTimeout(() => {
          window.location.href = pwaUrl;
        }, 500);

        return () => clearTimeout(manualTimer);
      } else {
        // No code, show options immediately
        setIsProcessing(false);
        setShowManualOptions(true);
      }
    }
  }, [searchParams, router]);

  if (isPWA || (isProcessing && !showManualOptions)) {
    return (
      <main className="min-h-screen bg-ws-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-ws-purple border-t-transparent mx-auto mb-4"></div>
          <p className="text-ws-gray-600">Signing you in...</p>
          <p className="text-xs text-ws-gray-500 mt-2">This should only take a moment</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ws-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-h1 text-ws-gray-900 mb-2">Almost There!</h1>
          <p className="text-sm text-ws-gray-500">
            Click the button below to complete sign in
          </p>
        </div>

        <div 
          className="bg-white rounded-2xl p-8 shadow-ws-md space-y-4 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <button
            onClick={() => {
              const code = searchParams.get('code');
              if (code) {
                window.location.href = `/api/auth/callback?code=${code}`;
              } else {
                router.push('/');
              }
            }}
            className="btn-primary"
          >
            {searchParams.get('code') ? 'Complete Sign In' : 'Go to App'}
          </button>

          <div className="pt-4 border-t border-ws-gray-300">
            <p className="text-xs text-ws-gray-500 text-center">
              Having trouble?
              <br />
              <button
                onClick={() => {
                  const code = searchParams.get('code');
                  if (code) {
                    // Force reload the callback
                    window.location.href = `/api/auth/callback?code=${code}`;
                  } else {
                    router.push('/login');
                  }
                }}
                className="text-ws-purple underline mt-2"
              >
                Try Again
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-ws-gray-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p>🔒 Secure passwordless authentication</p>
        </div>
      </div>
    </main>
  );
}
