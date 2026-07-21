import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function LaserScanner() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* 1. Top High-Tech Laser Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-glow to-gold z-50 origin-left shadow-[0_0_15px_#D4AF37]"
        style={{ scaleX }}
      />

      {/* 2. High-Tech Ambient Laser Scanning Line Effect */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{ y: ['0vh', '100vh', '0vh'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent shadow-[0_0_20px_#D4AF37] opacity-60"
        />
      </div>
    </>
  );
}
