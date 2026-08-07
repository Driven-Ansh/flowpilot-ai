'use client';

/**
 * FlowPilot AI Sidebar Navigation
 * Exact match to reference UI design with animated logo and auth modal integration.
 */
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Box, GitBranch, Target,
  BarChart3, ShieldAlert, Map, ShoppingBag, FileText,
  Settings, HelpCircle, Rocket, ChevronRight, RotateCcw, UserCheck
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { FlowPilotLogo } from '@/components/ui/FlowPilotLogo';
import { AuthModal } from '@/components/auth/AuthModal';
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
  const router = useRouter();
  const { user, restartDemo } = useAppStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleRestartDemo = () => {
    restartDemo();
    router.push('/dashboard/interview');
  };

  const displayName = user?.name || 'Anshul Sinha';
  const displayRole = user?.role || 'Startup Founder';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <aside className="w-[260px] h-screen bg-[#070914] border-r border-white/10 flex flex-col flex-shrink-0 z-40 select-none">
        {/* Brand Header with Animated Logo */}
        <div className="p-5 border-b border-white/5 space-y-1">
          <Link href="/dashboard" className="block group">
            <FlowPilotLogo size="md" showText={true} showTagline={true} />
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
          {/* Settings & Restart Demo Buttons */}
          <div className="space-y-1">
            <button
              onClick={handleRestartDemo}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" /> Restart Analysis Demo
            </button>
            <button className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Settings className="w-4 h-4 text-slate-500" /> Settings
            </button>
          </div>

          {/* Personalized User Card */}
          <div
            onClick={() => setIsAuthOpen(true)}
            className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group cursor-pointer hover:border-cyan-400/40 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{displayName}</p>
                <p className="text-[10px] text-slate-400 truncate">{displayRole}</p>
              </div>
            </div>
            <UserCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0" />
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

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
