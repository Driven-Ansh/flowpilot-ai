'use client';

/**
 * Animated Fullscreen Splash Screen
 * When the page loads, the large logo appears centered on a dark canvas,
 * then smoothly animates to scale down into position as the application reveals.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowPilotLogo } from '@/components/ui/FlowPilotLogo';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after intro animation completes
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060813] text-white select-none overflow-hidden"
          >
            {/* Ambient Glowing Meshes */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* Centered Hero Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 text-center z-10"
            >
              <FlowPilotLogo size="xl" showText={true} showTagline={true} />

              {/* Animated Progress Bar */}
              <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative mt-2">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full shadow-glow"
                />
              </div>

              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase font-mono mt-1">
                Initializing AI Engine...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="min-h-screen bg-[#070913]"
      >
        {children}
      </motion.div>
    </>
  );
}
