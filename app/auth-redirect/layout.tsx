import { Suspense } from 'react';

export default function AuthRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={
    <main className="min-h-screen bg-ws-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-ws-purple border-t-transparent mx-auto mb-4"></div>
        <p className="text-ws-gray-600">Loading...</p>
      </div>
    </main>
  }>{children}</Suspense>;
}
