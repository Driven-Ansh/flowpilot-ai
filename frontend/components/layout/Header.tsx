'use client';

/**
 * FlowPilot AI Header Component
 * Matching reference design.
 */
import Link from 'next/link';
import { Search, Sun, Moon, Bell, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <header className="h-16 px-8 border-b border-white/10 flex items-center justify-between bg-[#070914]/80 backdrop-blur-md flex-shrink-0 z-30">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-16 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-indigo-500/50 transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
          Ctrl + K
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
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

        {/* Get Started Button */}
        <Link
          href="/onboarding"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
        >
          Get Started <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
