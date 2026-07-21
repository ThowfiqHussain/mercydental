import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ onBookClick }) {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [isLightSection, setIsLight]  = useState(false);

  useEffect(() => {
    // ── Sections with LIGHT (white/pearl) backgrounds ──────────
    // Services & Transformation are dark → removed from list
    const lightIds = ['doctor', 'about', 'stats', 'healthy-smiles', 'testimonials', 'appointment'];

    const detect = () => {
      let light = false;

      // Primary: element directly under the nav bar centre
      const el = document.elementFromPoint(window.innerWidth / 2, 64);
      if (el) {
        const sec = el.closest('section');
        if (sec && lightIds.includes(sec.id)) light = true;
      }

      // Fallback: bounding-rect scan
      if (!light) {
        for (const id of lightIds) {
          const sec = document.getElementById(id);
          if (sec) {
            const { top, bottom } = sec.getBoundingClientRect();
            if (top <= 80 && bottom >= 80) { light = true; break; }
          }
        }
      }

      setIsLight(light);
    };

    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => window.removeEventListener('scroll', detect);
  }, []);

  const navLinks = [
    { name: 'Dental Care',   href: '#hero'           },
    { name: 'Dr. Melvin Raj',href: '#doctor'         },
    { name: 'About Clinic',  href: '#about'          },
    { name: 'Treatments',    href: '#services'       },
    { name: 'Smile Results', href: '#transformation' },
    { name: 'Book Intake',   href: '#appointment'    },
  ];

  const scrollTo = (href) => {
    window.__lenis?.scrollTo(href, { duration: 1.8 });
  };

  // ── Colour tokens based on section brightness ─────────────
  const T = isLightSection
    ? {
        capsule:  'bg-white/50 border-slate-300/80 text-slate-950 shadow-sm',
        link:     'text-slate-900 hover:text-amber-700',
        logo:     'text-slate-950',
        logoSub:  'text-amber-700',
        logoBox:  'bg-slate-950 border-slate-800 text-amber-400',
        cta:      'bg-slate-950 text-white hover:bg-amber-800 shadow-black/20',
        mobile:   'bg-white/90 text-slate-950 border-slate-300',
        drawer:   'bg-white/95 text-slate-950 border-slate-300',
      }
    : {
        capsule:  'bg-black/40 border-white/15 text-white shadow-sm',
        link:     'text-white/90 hover:text-amber-300',
        logo:     'text-white',
        logoSub:  'text-amber-400',
        logoBox:  'bg-black/40 border-amber-500/60 text-amber-400',
        cta:      'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-amber-400/30',
        mobile:   'bg-black/60 text-white border-amber-500/40',
        drawer:   'bg-slate-950/95 text-white border-amber-500/30',
      };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none bg-transparent"
    >
      {/* ── 3-column layout: Logo | Nav Capsule | CTA ──────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-3.5 pb-3 grid grid-cols-[auto_1fr_auto] items-center gap-4 pointer-events-auto relative z-10">

        {/* Col 1 — Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className={`w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-500 ${T.logoBox}`}>
            <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current opacity-85" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M26 28C16 12 44 14 50 22C56 14 84 12 74 28C68 45 78 68 68 90C60 90 55 58 50 48C45 58 40 90 32 90C22 68 32 45 26 28Z" />
            </svg>
          </div>
          {/* Single-line logo — no double row */}
          <div className="flex items-baseline gap-2 leading-none">
            <span className={`font-serif text-lg tracking-[0.15em] font-bold whitespace-nowrap transition-colors duration-500 ${T.logo}`}>
              MERCY
            </span>
            <span className={`font-sans text-[8.5px] tracking-[0.18em] uppercase font-bold whitespace-nowrap transition-colors duration-500 hidden sm:inline ${T.logoSub}`}>
              Dental · Madurai
            </span>
          </div>
        </a>

        {/* Col 2 — Nav Capsule (centred) */}
        <nav className={`hidden lg:flex items-center justify-center gap-5 xl:gap-7 px-6 py-2.5 rounded-full border transition-all duration-500 ${T.capsule}`}>
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`font-sans text-[11px] uppercase tracking-[0.14em] font-bold whitespace-nowrap transition-colors duration-300 py-1 ${T.link}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Col 3 — CTA + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop CTA */}
          <button
            onClick={onBookClick}
            className={`hidden sm:block px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap ${T.cta}`}
          >
            Book Appointment
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2.5 rounded-full border transition-all duration-500 ${T.mobile}`}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:hidden mt-3 mx-2 p-6 rounded-2xl pointer-events-auto border flex flex-col gap-4 shadow-2xl backdrop-blur-2xl ${T.drawer}`}
        >
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => { setMenuOpen(false); scrollTo(link.href); }}
              className={`font-serif text-lg tracking-widest font-semibold transition-colors ${
                isLightSection ? 'text-slate-900 hover:text-amber-700' : 'text-white hover:text-amber-300'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onBookClick(); }}
            className={`mt-2 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-bold ${
              isLightSection ? 'bg-slate-950 text-white' : 'bg-amber-400 text-slate-950'
            }`}
          >
            Book Appointment
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
