import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-pure text-white"
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
            className="font-sans text-xs tracking-[0.35em] uppercase text-slate-300 font-semibold mb-12 text-center"
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

          <div className="flex items-center justify-between w-64 font-sans text-[11px] text-slate-400 uppercase tracking-widest font-bold">
            <span>Initializing Experience</span>
            <span className="text-gold-glow font-mono">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
