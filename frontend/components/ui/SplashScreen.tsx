'use client';

/**
 * Animated Fullscreen Splash Screen
 * Large, crystal clear emblem logo rendered for 3.4 seconds loading time before smooth fade reveal.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowPilotLogo } from '@/components/ui/FlowPilotLogo';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 3.4s loading duration (adding 2 seconds as requested by user)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060813] text-white select-none overflow-hidden"
          >
            {/* Ambient Glowing Background Meshes */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

            {/* Centered Large Hero Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8 text-center z-10 p-6"
            >
              <FlowPilotLogo size="hero" layout="stacked" showText={true} showTagline={true} />

              {/* Smooth Progress Bar */}
              <div className="w-64 md:w-80 h-1.5 rounded-full bg-white/10 overflow-hidden relative mt-4 shadow-inner">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 3.2, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full shadow-glow"
                />
              </div>

              <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase font-mono">
                INITIALIZING AI ENGINE...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-[#070913]"
      >
        {children}
      </motion.div>
    </>
  );
}
