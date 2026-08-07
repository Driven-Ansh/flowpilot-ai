'use client';

/**
 * FlowPilot AI Sidebar Navigation
 * Exact match to reference UI design.
 */
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Box, GitBranch, Target,
  BarChart3, ShieldAlert, Map, ShoppingBag, FileText,
  Settings, HelpCircle, Zap, Rocket, ChevronRight, User
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const NAV_GROUPS = [
  {
    group: 'MAIN',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    ],
  },
  {
    group: 'DISCOVER',
    items: [
      { href: '/dashboard/interview', icon: MessageSquare, label: 'AI Interview', id: 'interview' },
      { href: '/dashboard/processes', icon: Box, label: 'Processes', id: 'processes' },
      { href: '/dashboard/workflow', icon: GitBranch, label: 'Workflow Graph', id: 'workflow' },
    ],
  },
  {
    group: 'ANALYZE',
    items: [
      { href: '/dashboard/opportunities', icon: Target, label: 'Opportunities', id: 'opportunities' },
      { href: '/dashboard/roi', icon: BarChart3, label: 'ROI Calculator', id: 'roi' },
      { href: '/dashboard/risk', icon: ShieldAlert, label: 'Risk & Compliance', id: 'risk' },
    ],
  },
  {
    group: 'ACT',
    items: [
      { href: '/dashboard/roadmap', icon: Map, label: 'Roadmap', id: 'roadmap' },
      { href: '/dashboard/marketplace', icon: ShoppingBag, label: 'AI Marketplace', id: 'marketplace' },
      { href: '/dashboard/report', icon: FileText, label: 'Export Report', id: 'report' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { company } = useAppStore();

  return (
    <aside className="w-[260px] h-screen bg-[#070914] border-r border-white/10 flex flex-col flex-shrink-0 z-40 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 space-y-1">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight block leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
              FlowPilot <span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1 tracking-tight font-medium">
              Smarter Workflows. Bigger Impact.
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="space-y-1.5">
            {group.group !== 'MAIN' && (
              <p className="text-[10px] font-bold tracking-widest text-slate-500 px-3 uppercase">
                {group.group}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/70 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'w-4 h-4 flex-shrink-0 transition-colors',
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200',
                      )}
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-white/5 space-y-3">
        {/* Settings & Help */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4 text-slate-500" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle className="w-4 h-4 text-slate-500" /> Help & Support
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Anshul Sinha</p>
              <p className="text-[10px] text-slate-400 truncate">Startup Founder</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
        </div>

        {/* Promo Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/20 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Rocket className="w-4 h-4 text-indigo-300" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold text-indigo-200 leading-tight">Build the future, faster.</p>
            <p className="text-[10px] text-slate-400 leading-tight">Let AI handle the busy work.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
