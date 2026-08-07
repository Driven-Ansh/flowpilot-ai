'use client';

/**
 * Animated FlowPilot AI Logo Component
 * Exact match to user-provided reference logo:
 * - Electric lightning bolt icon
 * - Circuit nodes on left circle arc
 * - AI sparkle stars on top right arc
 * - Cyan to Purple neon gradient
 * - Optional tagline "AUTOMATE SMARTER. GROW FASTER."
 */
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function FlowPilotLogo({
  size = 'md',
  showText = true,
  showTagline = false,
  className = '',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Animated Logo Mark */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Lightning Gradient */}
            <linearGradient id="boltGrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Circle Arc Gradient */}
            <linearGradient id="arcGrad" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Circuit Traces & Orbit Arc */}
          <motion.path
            d="M 45 15 A 35 35 0 1 0 50 85"
            stroke="url(#arcGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0.8, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Circuit Trace Nodes */}
          <g stroke="#06b6d4" strokeWidth="2.5" opacity="0.9">
            <line x1="8" y1="36" x2="28" y2="36" />
            <circle cx="28" cy="36" r="3" fill="#06b6d4" />

            <line x1="4" y1="48" x2="22" y2="48" />
            <circle cx="22" cy="48" r="3" fill="#38bdf8" />

            <line x1="12" y1="60" x2="30" y2="60" />
            <circle cx="30" cy="60" r="3" fill="#06b6d4" />
          </g>

          {/* AI Sparkle Stars (Top Right) */}
          <motion.g
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            fill="#c084fc"
          >
            {/* Sparkle 1 */}
            <path d="M 76 22 Q 76 27 81 27 Q 76 27 76 32 Q 76 27 71 27 Q 76 27 76 22 Z" />
            {/* Sparkle 2 */}
            <path d="M 88 34 Q 88 38 92 38 Q 88 38 88 42 Q 88 38 84 38 Q 88 38 88 34 Z" />
            {/* Sparkle 3 */}
            <path d="M 68 40 Q 68 42 70 42 Q 68 42 68 44 Q 68 42 66 42 Q 68 42 68 40 Z" />
          </motion.g>

          {/* Main Lightning Bolt */}
          <motion.path
            d="M 58 12 L 34 50 L 52 50 L 42 88 L 72 44 L 54 44 Z"
            fill="url(#boltGrad)"
            filter="url(#neonGlow)"
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Text Branding */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-black tracking-tight text-white flex items-center gap-1 ${textSizes[size]}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span>FlowPilot</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
          </div>
          {showTagline && (
            <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase mt-0.5">
              AUTOMATE SMARTER. GROW FASTER.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
