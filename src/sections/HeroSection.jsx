import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stagger each word in a headline
function WordReveal({ children, delay = 0, className = '' }) {
  const words = String(children).split(' ');
  return (
    <span className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="word-reveal-wrap" style={{ marginRight: '0.28em' }}>
          <motion.span
            className="word-reveal inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroSection({ onBookClick }) {
  const containerRef    = useRef(null);
  const stickyRef       = useRef(null);
  const lineRef         = useRef(null);
  const introRef        = useRef(null);
  const heroContentRef  = useRef(null);

  useEffect(() => {
    // Force page to start at top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    // ScrollTrigger for Intro -> Hero Morph
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=180%',
      pin: stickyRef.current,
      pinSpacing: true,
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress;

        if (introRef.current && heroContentRef.current) {
          if (p <= 0.35) {
            const tProgress = p / 0.35; // 0 to 1
            
            // Intro dissolves & zooms in only when user scrolls down
            introRef.current.style.opacity = Math.max(0, 1 - tProgress * 1.25);
            introRef.current.style.transform = `scale(${1 + tProgress * 0.3}) translateY(${-tProgress * 50}px)`;
            introRef.current.style.filter = `blur(${tProgress * 14}px)`;
            introRef.current.style.pointerEvents = tProgress > 0.4 ? 'none' : 'auto';

            // Hero content fades & slides up into view
            heroContentRef.current.style.opacity = Math.min(1, tProgress * 1.2);
            heroContentRef.current.style.transform = `translateY(${(1 - tProgress) * 60}px)`;
            heroContentRef.current.style.filter = `blur(${(1 - tProgress) * 10}px)`;
            heroContentRef.current.style.pointerEvents = tProgress > 0.4 ? 'auto' : 'none';
          } else {
            introRef.current.style.opacity = 0;
            introRef.current.style.pointerEvents = 'none';

            heroContentRef.current.style.opacity = 1;
            heroContentRef.current.style.transform = 'translateY(0px)';
            heroContentRef.current.style.filter = 'blur(0px)';
            heroContentRef.current.style.pointerEvents = 'auto';
          }
        }
      },
    });

    // GSAP line reveal
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.6, delay: 1.4, ease: 'power3.out' }
      );
    }

    return () => {
      st.kill();
    };
  }, []);

  // Floating gold particles
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    size:  Math.random() * 5 + 2,
    left:  Math.random() * 100,
    delay: Math.random() * 8,
    dur:   Math.random() * 6 + 7,
  }));

  return (
    <div ref={containerRef} className="relative w-full bg-transparent">
      <section
        id="hero"
        ref={stickyRef}
        className="relative h-screen w-full flex flex-col justify-between pt-36 pb-16 px-6 md:px-16 overflow-hidden bg-transparent"
      >
        {/* ── Multi-Layer Overlays ────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-0" />
        {/* Volumetric gold bloom on left */}
        <div className="absolute -left-32 top-1/3 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[160px] pointer-events-none z-0" />
        {/* Highlight bloom behind tooth on right */}
        <div className="absolute right-10 lg:right-28 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gold/15 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* ── Floating Gold Dust ─────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="dust-particle"
              style={{
                width:  `${p.size}px`,
                height: `${p.size}px`,
                left:   `${p.left}%`,
                bottom: '-2%',
                animationDuration: `${p.dur}s`,
                animationDelay:    `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── Integrated Cinematic Intro Screen (Stays static until user scrolls) ───── */}
        <div
          ref={introRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black backdrop-blur-md text-white select-none transition-all duration-75"
        >
          {/* Molar Badge Icon */}
          <div className="relative w-20 h-20 mb-6 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-light shadow-[0_0_40px_rgba(212,175,55,0.3)]">
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
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.35em] text-gold-gradient uppercase mb-3 drop-shadow-md">
            M E R C Y
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-slate-300 font-semibold mb-8 text-center px-4">
            Mercy Dental Clinic • Madurai Center
          </p>

          {/* Gold Progress Indicator */}
          <div className="w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden relative mb-4">
            <div className="h-full bg-gradient-to-r from-gold-deep via-gold-glow to-gold w-full" />
          </div>

          <div className="flex items-center justify-between w-64 font-sans text-[11px] text-slate-400 uppercase tracking-widest font-bold mb-10">
            <span>Experience Initialized</span>
            <span className="text-gold-glow font-mono">100%</span>
          </div>

          {/* Interactive Scroll Prompt */}
          <div className="flex flex-col items-center gap-2.5 text-gold-glow/90 hover:text-gold-glow transition-colors">
            <span className="font-sans text-[10px] uppercase tracking-[0.32em] font-bold text-gold-glow animate-pulse">
              Scroll Down To Enter Experience
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-gold/60 flex items-start justify-center p-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              <div className="w-1 h-2 bg-gold-glow rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* ── Main Hero Content ─────────────────────────────────── */}
        <div
          ref={heroContentRef}
          style={{ opacity: 0, transform: 'translateY(60px)', filter: 'blur(10px)' }}
          className="max-w-7xl mx-auto w-full z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto transition-all duration-75"
        >
          <div className="lg:col-span-9 flex flex-col items-start text-white">

            {/* Animated tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-gold/45 mb-6 sm:mb-8 shadow-lg max-w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-glow animate-ping shrink-0" />
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.28em] text-gold-glow font-bold truncate">
                Madurai's Premier Dental Care Center · New Natham Road
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[5.25rem] font-light leading-[1.08] sm:leading-[1.05] text-white mb-4 tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden">
                <WordReveal delay={0.35}>Pioneering Digital</WordReveal>
              </div>
              <div className="overflow-hidden mt-1">
                <WordReveal delay={0.55}>Dentistry &amp;</WordReveal>
              </div>
              <div className="overflow-hidden mt-1">
                <motion.span
                  className="italic font-normal text-gold-gradient inline-block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  Advanced Implantology.
                </motion.span>
              </div>
            </h1>

            {/* Gold divider line — GSAP draws left to right */}
            <div
              ref={lineRef}
              className="w-20 sm:w-24 h-[2px] bg-gradient-to-r from-gold via-gold-glow to-gold mb-5 sm:mb-6 rounded-full"
              style={{ transformOrigin: 'left center' }}
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-lg leading-relaxed mb-8 sm:mb-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              Under Dr. Melvin Raj, Mercy Dental Clinic delivers single-sitting root canals,
              dental implants, laser whitening, and wisdom tooth extractions in Tiruppalai, Madurai.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onBookClick}
                className="magnetic-btn group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-full overflow-hidden font-sans text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-bold text-slate-950 shadow-[0_10px_40px_rgba(212,175,55,0.45)] text-center"
              >
                {/* Animated gradient fill */}
                <span className="absolute inset-0 bg-gradient-to-r from-gold via-gold-glow to-gold bg-[length:200%] group-hover:bg-[position:100%] transition-[background-position] duration-500 ease-out" />
                <span className="relative z-10">Book Dental Appointment</span>
              </button>

              <a
                href="#doctor"
                onClick={(e) => {
                  e.preventDefault();
                  window.__lenis?.scrollTo('#doctor', { duration: 1.8 });
                }}
                className="magnetic-btn px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/8 backdrop-blur-md border border-white/25 hover:border-gold/80 text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold text-white hover:text-gold-glow transition-all duration-400 text-center"
              >
                Dr. Melvin Raj Profile →
              </a>
            </motion.div>
          </div>

          {/* Right side — floating credential card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:flex lg:col-span-3 justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="px-7 py-6 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-gold/40 shadow-2xl"
            >
              <div className="font-sans text-[9px] uppercase tracking-widest text-gold-glow font-bold mb-3">Chief Surgeon</div>
              <div className="font-serif text-xl text-white font-light">Dr. Melvin Raj</div>
              <div className="font-sans text-[10px] text-slate-300 mt-1">BDS, MDS — Implantologist</div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold">Mercy Dental Clinic</div>
                <div className="font-sans text-[10px] text-gold/70 mt-0.5">Tagore Nagar · Madurai</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Metrics Strip ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="max-w-7xl mx-auto w-full z-10 relative pt-8 sm:pt-10 border-t border-white/10"
        >
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-4 sm:gap-10 md:gap-16">
            {[
              { val: '99.8%', label: 'Patient Satisfaction' },
              { val: '15+',   label: 'Years Practice' },
              { val: '10K+',  label: 'Procedures Done' },
            ].map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="hidden sm:block w-px h-8 bg-white/12" />}
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-bold leading-none">{m.val}</span>
                  <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1.5">{m.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 z-10"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-white/40 font-bold rotate-90 origin-center">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </section>
    </div>
  );
}
