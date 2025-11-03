'use client';

import { useState, useEffect } from 'react';
import { haptic } from '@/lib/haptics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Don't show prompt if already installed
    if (isStandaloneMode) {
      return;
    }

    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    
    if (Date.now() - dismissedTime < threeDaysInMs) {
      return; // Don't show again for 3 days
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show manual instructions after delay
    if (iOS && !isStandaloneMode) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    haptic('medium');
    
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    haptic('light');
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  // Don't render if already installed or shouldn't show
  if (isStandalone || !showPrompt) {
    return null;
  }

  // iOS Install Instructions
  if (isIOS) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-in-right">
        <div className="bg-white rounded-2xl shadow-ws-lg border-2 border-ws-coral p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <h3 className="font-bold text-ws-gray-900 mb-1">Install Pocket Budget</h3>
              <p className="text-sm text-ws-gray-600 mb-2">
                Add to your home screen for the best experience!
              </p>
              <ol className="text-xs text-ws-gray-600 space-y-1 mb-3">
                <li>1. Tap the Share button (⬆️) in Safari</li>
                <li>2. Scroll and tap "Add to Home Screen"</li>
                <li>3. Tap "Add" to confirm</li>
              </ol>
              <button
                onClick={handleDismiss}
                className="text-xs text-ws-coral font-semibold hover:text-ws-coral-dark"
              >
                Got it, thanks!
              </button>
            </div>
            <button
              onClick={handleDismiss}
              className="text-ws-gray-400 hover:text-ws-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Android/Desktop Install Prompt
  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-white rounded-2xl shadow-ws-lg border-2 border-ws-coral p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📱</span>
          <div className="flex-1">
            <h3 className="font-bold text-ws-gray-900 mb-1">Install Pocket Budget</h3>
            <p className="text-sm text-ws-gray-600 mb-3">
              Get quick access and work offline. Install our app on your device!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-ws-coral text-white font-semibold rounded-xl text-sm hover:bg-ws-coral-dark transition-colors"
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-ws-gray-100 text-ws-gray-900 font-semibold rounded-xl text-sm hover:bg-ws-gray-300 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-ws-gray-400 hover:text-ws-gray-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

