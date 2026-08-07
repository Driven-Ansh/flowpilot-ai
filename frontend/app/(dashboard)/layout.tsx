'use client';

/**
 * FlowPilot AI Main Dashboard Layout
 * Clean flex layout matching reference UI.
 */
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#070913] text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="max-w-7xl mx-auto w-full space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
