'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { haptic, hapticSuccess, hapticError } from '@/lib/haptics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleGoogleLogin = async () => {
    if (isLoading || isGoogleLoading) return;

    haptic('medium');
    setIsGoogleLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;
      hapticSuccess();
    } catch (error) {
      console.error('Google login error:', error);
      hapticError();
      setMessage(error instanceof Error ? error.message : 'Failed to sign in with Google');
      setIsGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading || isGoogleLoading) return;

    haptic('medium');
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
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
    <main className="min-h-screen bg-ws-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-h1 text-ws-gray-900 mb-2">Pocket Budget</h1>
          <p className="text-sm text-ws-gray-500">
            Fast expense tracking with EN/中文 support
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-white rounded-2xl p-8 shadow-ws-md animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <h2 className="text-2xl font-bold text-ws-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full bg-white border-2 border-ws-gray-300 text-ws-gray-900 font-semibold text-base px-6 py-4 rounded-2xl transition-all duration-200 ease-expo hover:bg-ws-gray-50 hover:border-ws-gray-400 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
          >
            {isGoogleLoading ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ws-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-ws-gray-500 font-medium">Or continue with email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ws-gray-700 mb-2">
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
                disabled={isLoading || isGoogleLoading}
                autoComplete="email"
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isLoading || isGoogleLoading || !email}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </div>
              ) : (
                '✉️ Send Magic Link'
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 p-4 rounded-xl text-sm font-medium animate-fade-in-up ${
                message.includes('Check')
                  ? 'bg-ws-green-light text-ws-green border border-ws-green/20'
                  : 'bg-ws-red-light text-ws-red border border-ws-red/20'
              }`}
            >
              {message}
            </div>
          )}

          {/* Info Text */}
          <div className="mt-6 pt-6 border-t border-ws-gray-200">
            <p className="text-xs text-ws-gray-500 text-center leading-relaxed">
              🔒 Secure passwordless authentication
              <br />
              Sign in with Google or get a magic link via email
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

