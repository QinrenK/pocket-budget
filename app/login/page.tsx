'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { haptic, hapticSuccess, hapticError } from '@/lib/haptics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showIOSWarning, setShowIOSWarning] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Detect if on iOS with non-Safari browser
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as { standalone?: boolean }).standalone;
    
    if (iOS && !isStandalone) {
      const ua = navigator.userAgent;
      const isNonSafari = ua.includes('CriOS') || ua.includes('FxiOS') || ua.includes('EdgiOS');
      setShowIOSWarning(isNonSafari);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    haptic('medium');
    setIsLoading(true);
    setMessage('');

    try {
      // Always use auth-redirect page which handles PWA detection
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth-redirect`,
        },
      });

      if (error) throw error;

      hapticSuccess();
      setMessage('Check your email for the login link!');
      setEmail('');
    } catch (error) {
      console.error('Login error:', error);
      hapticError();
      setMessage(error instanceof Error ? error.message : 'Failed to send login link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ws-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-h1 text-ws-gray-900 mb-2">Pocket Budget</h1>
          <p className="text-sm text-ws-gray-500">
            Fast expense tracking with EN/中文 support
          </p>
        </div>

        {/* iOS Safari Recommendation */}
        {showIOSWarning && (
          <div className="mb-6 p-4 bg-ws-yellow-light border border-ws-yellow rounded-xl animate-fade-in-up">
            <p className="text-sm text-ws-gray-900">
              <span className="text-base">🍎</span> <strong>Hey iOS user!</strong>
              <br />
              <span className="text-xs">
                For the best experience, install this app from <strong>Safari</strong>:
                <br />
                Open in Safari → Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
              </span>
            </p>
          </div>
        )}

        {/* Login Form */}
        <div
          className="bg-white rounded-2xl p-8 shadow-ws-md animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-h2 mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ws-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading || !email}>
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-xl text-sm ${
                message.includes('Check')
                  ? 'bg-ws-green-light text-ws-green'
                  : 'bg-ws-red-light text-ws-red'
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-ws-gray-300">
            <p className="text-xs text-ws-gray-500 text-center">
              We'll send you a secure login link.
              <br />
              No passwords required!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold text-ws-gray-900">Lightning Fast</p>
              <p className="text-ws-gray-500">Add expenses in under 6 seconds</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-2xl">🌐</span>
            <div>
              <p className="font-semibold text-ws-gray-900">Bilingual</p>
              <p className="text-ws-gray-500">Full English and 中文 support</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-2xl">📱</span>
            <div>
              <p className="font-semibold text-ws-gray-900">Works Offline</p>
              <p className="text-ws-gray-500">Track expenses anywhere, syncs automatically</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

