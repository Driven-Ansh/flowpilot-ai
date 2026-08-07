'use client';

/**
 * Dashboard Header Component
 * 
 * Top bar with:
 * - Breadcrumb/page title
 * - Theme toggle
 * - User profile indicator
 */
import { usePathname } from 'next/navigation';
import { Sun, Moon, Bell } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Executive Dashboard',
  '/dashboard/interview': 'AI Founder Interview',
  '/dashboard/processes': 'Business Processes',
  '/dashboard/workflow': 'Workflow Graph',
  '/dashboard/opportunities': 'Automation Opportunities',
  '/dashboard/roi': 'ROI Calculator',
  '/dashboard/risk': 'Risk & Compliance',
  '/dashboard/roadmap': 'Implementation Roadmap',
  '/dashboard/marketplace': 'AI Marketplace',
  '/dashboard/report': 'Export Report',
};

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, company } = useAppStore();
  const title = PAGE_TITLES[pathname] || 'FlowPilot AI';

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b flex-shrink-0"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div>
        <h1 className="font-bold text-lg text-white/90" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {title}
        </h1>
        {company && (
          <p className="text-xs text-white/30">{company.company_name}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity">
          {company?.company_name?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  );
}
