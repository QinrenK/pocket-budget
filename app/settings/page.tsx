'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { haptic, hapticSuccess } from '@/lib/haptics';
import Link from 'next/link';
import DynamicIslandNav from '../components/DynamicIslandNav';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [currency, setCurrency] = useState<'CAD' | 'USD' | 'CNY'>('CAD');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Fetch profile for currency
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('currency')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setCurrency((profile.currency as any) || 'CAD');
        }
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = async (newCurrency: 'CAD' | 'USD' | 'CNY') => {
    haptic('medium');
    setCurrency(newCurrency);

    try {
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ currency: newCurrency })
          .eq('user_id', user.id);

        if (!error) {
          hapticSuccess();
        }
      }
    } catch (error) {
      console.error('Failed to update currency:', error);
    }
  };

  const handleSignOut = async () => {
    if (!confirm('Sign out?')) return;

    haptic('medium');
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Delete account? This cannot be undone!')) return;
    if (!confirm('Are you absolutely sure? All your data will be permanently deleted.'))
      return;

    haptic('heavy');
    
    // In production, you'd call an API route to handle cascade deletion
    alert('Account deletion would be implemented in production');
  };

  const handleExportCSV = async () => {
    haptic('medium');
    
    try {
      // Fetch all transactions
      const response = await fetch('/api/transactions?range=all');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const { transactions } = await response.json();
      
      // Convert to CSV
      const headers = ['Date', 'Category', 'Amount', 'Items', 'Vendor', 'Source'];
      const rows = transactions.map((tx: any) => [
        new Date(tx.ts).toISOString().split('T')[0],
        tx.category || 'Uncategorized',
        tx.amount.toFixed(2),
        tx.items?.map((i: any) => i.name).join('; ') || '',
        tx.vendor || '',
        tx.source || 'text',
      ]);

      const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
      
      // Download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pocket-budget-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      hapticSuccess();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ws-gray-50 flex items-center justify-center">
        <div className="skeleton w-64 h-32" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ws-gray-50 pb-24 page-transition">
      {/* Header */}
      <header className="bg-white px-6 pt-safe pt-6 pb-6 border-b border-ws-gray-300">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-ws-coral hover:text-ws-coral-dark text-sm font-medium">
            ← Back
          </Link>
          <h1 className="text-h1 mt-2">Settings</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Profile */}
        <section className="card">
          <h2 className="text-h3 mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-ws-gray-700">Email</label>
              <p className="text-base text-ws-gray-900 mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-ws-gray-700">User ID</label>
              <p className="text-xs text-ws-gray-500 mt-1 font-mono">{user?.id}</p>
            </div>
          </div>
        </section>

        {/* Currency */}
        <section className="card">
          <h2 className="text-h3 mb-4">Currency</h2>
          <div className="flex gap-3">
            {(['CAD', 'USD', 'CNY'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => handleCurrencyChange(curr)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  currency === curr
                    ? 'bg-ws-coral text-white shadow-ws-coral'
                    : 'bg-ws-gray-100 text-ws-gray-700 hover:bg-ws-gray-300'
                }`}
              >
                {curr}
                <span className="block text-sm opacity-80 mt-1">
                  {curr === 'CAD' ? 'C$' : curr === 'USD' ? '$' : '¥'}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Data */}
        <section className="card">
          <h2 className="text-h3 mb-4">Data</h2>
          <div className="space-y-3">
            <button onClick={handleExportCSV} className="btn-secondary text-left">
              📤 Export to CSV
            </button>
          </div>
        </section>

        {/* Account Actions */}
        <section className="card">
          <h2 className="text-h3 mb-4 text-ws-red">Danger Zone</h2>
          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              className="w-full py-3 px-4 rounded-xl font-semibold bg-ws-gray-200 text-ws-gray-900 hover:bg-ws-gray-300 transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full py-3 px-4 rounded-xl font-semibold bg-ws-red-light text-ws-red hover:bg-ws-red hover:text-white transition-colors"
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* App Info */}
        <section className="text-center text-sm text-ws-gray-500 py-8">
          <p>Pocket Budget v0.2.0</p>
          <p className="mt-1">Made with ❤️ for fast expense tracking</p>
        </section>
      </div>

      {/* Dynamic Island Navigation */}
      <DynamicIslandNav />
    </main>
  );
}

