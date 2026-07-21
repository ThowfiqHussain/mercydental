import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Function to finish loading immediately on user scroll/gesture
  const triggerFinish = () => {
    setIsDone((alreadyDone) => {
      if (!alreadyDone) {
        if (onLoadingComplete) onLoadingComplete();
        return true;
      }
      return true;
    });
  };

  useEffect(() => {
    // Auto-progress timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            triggerFinish();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 14) + 8;
      });
    }, 100);

    // Scroll & Wheel listeners to transition directly into hero section on scroll
    let startY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 5) {
        triggerFinish();
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const currentY = e.touches[0].clientY;
        if (startY - currentY > 10) {
          triggerFinish();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        triggerFinish();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          onClick={triggerFinish}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-pure text-white cursor-pointer select-none"
        >
          {/* Exact 2-Root Molar Logo Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-20 h-20 mb-8 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-light shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 text-gold-glow fill-gold/15"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 26 28 C 16 12, 44 14, 50 22 C 56 14, 84 12, 74 28 C 68 45, 78 68, 68 90 C 60 90, 55 58, 50 48 C 45 58, 40 90, 32 90 C 22 68, 32 45, 26 28 Z" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl md:text-5xl font-light tracking-[0.35em] text-gold-gradient uppercase mb-3"
          >
            M E R C Y
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-xs tracking-[0.35em] uppercase text-slate-300 font-semibold mb-12 text-center px-4"
          >
            Mercy Dental Clinic • Madurai Center
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-deep via-gold-glow to-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between w-64 font-sans text-[11px] text-slate-400 uppercase tracking-widest font-bold mb-8">
            <span>Initializing Experience</span>
            <span className="text-gold-glow font-mono">{progress}%</span>
          </div>

          {/* Interactive Scroll Hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center gap-2 text-gold-glow/80 hover:text-gold-glow transition-colors"
          >
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold">
              Scroll Down to Enter
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-6 rounded-full border border-gold/40 flex items-start justify-center p-1"
            >
              <div className="w-1 h-1.5 bg-gold-glow rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
