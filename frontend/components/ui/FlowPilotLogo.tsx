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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  layout?: 'horizontal' | 'stacked';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function FlowPilotLogo({
  size = 'md',
  layout = 'horizontal',
  showText = true,
  showTagline = false,
  className = '',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
    hero: 'w-36 h-36 md:w-44 md:h-44',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
    hero: 'text-4xl md:text-5xl',
  };

  const isStacked = layout === 'stacked';

  return (
    <div className={`flex ${isStacked ? 'flex-col items-center text-center gap-4' : 'items-center gap-3'} select-none ${className}`}>
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
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Circuit Traces & Orbit Arc */}
          <motion.path
            d="M 45 15 A 35 35 0 1 0 50 85"
            stroke="url(#arcGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0.8, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Circuit Trace Nodes */}
          <g stroke="#06b6d4" strokeWidth="2.8" opacity="0.95">
            <line x1="6" y1="36" x2="28" y2="36" />
            <circle cx="28" cy="36" r="3.5" fill="#06b6d4" />

            <line x1="2" y1="48" x2="22" y2="48" />
            <circle cx="22" cy="48" r="3.5" fill="#38bdf8" />

            <line x1="10" y1="60" x2="30" y2="60" />
            <circle cx="30" cy="60" r="3.5" fill="#06b6d4" />
          </g>

          {/* AI Sparkle Stars (Top Right) */}
          <motion.g
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            fill="#c084fc"
          >
            {/* Sparkle 1 */}
            <path d="M 76 20 Q 76 26 82 26 Q 76 26 76 32 Q 76 26 70 26 Q 76 26 76 20 Z" />
            {/* Sparkle 2 */}
            <path d="M 88 33 Q 88 37 92 37 Q 88 37 88 41 Q 88 37 84 37 Q 88 37 88 33 Z" />
            {/* Sparkle 3 */}
            <path d="M 68 39 Q 68 41 70 41 Q 68 41 68 43 Q 68 41 66 41 Q 68 41 68 39 Z" />
          </motion.g>

          {/* Main Lightning Bolt */}
          <motion.path
            d="M 58 10 L 32 50 L 52 50 L 40 90 L 74 44 L 54 44 Z"
            fill="url(#boltGrad)"
            filter="url(#neonGlow)"
            initial={{ scale: 0.98 }}
            animate={{ scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Text Branding */}
      {showText && (
        <div className={`flex flex-col ${isStacked ? 'items-center text-center' : ''}`}>
          <div className={`font-black tracking-tight text-white flex items-center justify-center gap-1.5 ${textSizes[size]}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span>FlowPilot</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
          </div>
          {showTagline && (
            <span className={`font-bold tracking-[0.25em] text-cyan-400 uppercase mt-1 ${size === 'hero' ? 'text-xs md:text-sm' : 'text-[9px]'}`}>
              AUTOMATE SMARTER. GROW FASTER.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
