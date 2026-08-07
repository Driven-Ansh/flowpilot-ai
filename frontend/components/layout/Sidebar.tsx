'use client';

/**
 * Sidebar Navigation Component
 * 
 * Provides the primary navigation for the dashboard.
 * Features:
 * - Collapsible with smooth animation
 * - Active route highlighting
 * - Grouped navigation sections
 * - Company context display
 */
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, GitBranch, Lightbulb,
  BarChart3, Map, ShoppingBag, ShieldAlert, FileText,
  ChevronLeft, Zap, Settings, LogOut
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  {
    group: 'Overview',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    ],
  },
  {
    group: 'Discovery',
    items: [
      { href: '/dashboard/interview', icon: MessageSquare, label: 'AI Interview', id: 'interview' },
      { href: '/dashboard/processes', icon: GitBranch, label: 'Processes', id: 'processes' },
      { href: '/dashboard/workflow', icon: GitBranch, label: 'Workflow Graph', id: 'workflow' },
    ],
  },
  {
    group: 'Analysis',
    items: [
      { href: '/dashboard/opportunities', icon: Lightbulb, label: 'Opportunities', id: 'opportunities' },
      { href: '/dashboard/roi', icon: BarChart3, label: 'ROI Calculator', id: 'roi' },
      { href: '/dashboard/risk', icon: ShieldAlert, label: 'Risk & Compliance', id: 'risk' },
    ],
  },
  {
    group: 'Action',
    items: [
      { href: '/dashboard/roadmap', icon: Map, label: 'Roadmap', id: 'roadmap' },
      { href: '/dashboard/marketplace', icon: ShoppingBag, label: 'AI Marketplace', id: 'marketplace' },
      { href: '/dashboard/report', icon: FileText, label: 'Export Report', id: 'report' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, company } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col border-r overflow-hidden"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'linear-gradient(180deg, #0d0c18 0%, #0a0914 100%)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-base whitespace-nowrap overflow-hidden text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              FlowPilot <span className="text-indigo-400">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="ml-auto p-1 rounded-md text-white/30 hover:text-white/70 hover:bg-white/5 transition-all flex-shrink-0"
        >
          <motion.div animate={{ rotate: sidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Company Badge */}
      <AnimatePresence mode="wait">
        {!sidebarCollapsed && company && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <p className="text-xs text-indigo-300 font-medium truncate">{company.company_name}</p>
              <p className="text-xs text-white/30 truncate">{company.industry} · {company.stage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-semibold uppercase tracking-widest text-white/20 px-3 mb-2"
                >
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                      isActive
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                        : 'text-white/40 hover:text-white/80 hover:bg-white/5',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'w-4 h-4 flex-shrink-0 transition-all',
                        isActive ? 'text-indigo-400' : 'text-white/30 group-hover:text-white/60',
                      )}
                    />
                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && !sidebarCollapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t space-y-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Settings</motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
