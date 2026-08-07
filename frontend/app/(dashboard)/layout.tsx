'use client';

/**
 * Dashboard Layout
 * 
 * Provides a clean, un-congested, fully responsive layout.
 * Nimblize-style spacious layout structure with flex-based sidebar.
 */
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto w-full pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
