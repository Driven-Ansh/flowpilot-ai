'use client';

/**
 * FeatureInfoTooltip Component
 * Question mark (?) icon button that displays tech stack, implementation architecture,
 * and how the feature works under the hood on hover or click.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Code, Cpu, Info, X } from 'lucide-react';

export interface TechStackInfo {
  title: string;
  techStack: string[];
  implementation: string;
  howItWorks: string;
}

interface TooltipProps {
  info: TechStackInfo;
  className?: string;
}

export function FeatureInfoTooltip({ info, className = '' }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Question Mark Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 hover:border-cyan-400 flex items-center justify-center text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all shadow-sm cursor-pointer group"
        title="View Tech Stack & Implementation"
      >
        <HelpCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Hover / Click Popover Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-8 z-50 w-80 md:w-96 p-5 rounded-2xl bg-[#0c0e1f] border border-cyan-500/30 text-white shadow-2xl backdrop-blur-2xl pointer-events-auto space-y-4"
          >
            {/* Tooltip Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {info.title} Architecture
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tech Stack Tags */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300">
                <Code className="w-3.5 h-3.5 text-indigo-400" /> Tech Stack:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {info.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Implementation:
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                {info.implementation}
              </p>
            </div>

            {/* How It Works */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                <Info className="w-3.5 h-3.5 text-emerald-400" /> How It Works:
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {info.howItWorks}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
