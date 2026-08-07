'use client';

/**
 * Dashboard Layout
 * 
 * Wraps all protected dashboard routes with:
 * - Sidebar navigation
 * - Top header bar
 * - Main content area
 */
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '72px' : '260px' }}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
