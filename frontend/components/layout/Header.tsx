'use client';

/**
 * FlowPilot AI Header Component
 * Matching reference design with AuthModal and User Profile avatar integration.
 */
import { useState } from 'react';
import Link from 'next/link';
import { Search, Sun, Moon, Bell, ArrowRight, UserCheck, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { AuthModal } from '@/components/auth/AuthModal';

export function Header() {
  const { theme, toggleTheme, user, restartDemo } = useAppStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  return (
    <>
      <header className="h-16 px-8 border-b border-white/10 flex items-center justify-between bg-[#070914]/80 backdrop-blur-md flex-shrink-0 z-30 select-none">
        {/* Search Bar */}
        <div className="relative w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workflows, processes, agents..."
            className="w-full pl-10 pr-16 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-cyan-400/50 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
            Ctrl + K
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Restart Demo */}
          <button
            onClick={restartDemo}
            title="Restart Fresh Analysis"
            className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Analysis
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {/* User Sign In / Profile Button */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white text-xs font-semibold hover:border-cyan-400/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
              {initial}
            </div>
            <span>{user?.name || 'Sign In'}</span>
          </button>

          {/* Get Started Button */}
          <Link
            href="/dashboard/interview"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
          >
            New Analysis <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
