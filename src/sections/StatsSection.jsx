import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CountUp({ endVal, suffix = '', duration = 2.2, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const tick  = (now) => {
            const t = Math.min((now - start) / (duration * 1000), 1);
            const ease = 1 - Math.pow(2, -10 * t);          // expo ease-out
            const val  = ease * endVal;
            setCount(decimals > 0 ? +val.toFixed(decimals) : Math.floor(val));
            if (t < 1) requestAnimationFrame(tick);
            else setCount(endVal);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endVal, duration, decimals]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Number(count).toLocaleString();

  return <span ref={ref}>{formatted}{suffix}</span>;
}

const stats = [
  { end: 10000, suffix: '+', label: 'Happy Patients',       detail: 'Families trust our care',       icon: '♥' },
  { end: 15,    suffix: '+', label: 'Years of Excellence',  detail: 'Serving Madurai since 2009',    icon: '★' },
  { end: 99.8,  suffix: '%', label: 'Satisfaction Rate',    detail: 'Independently surveyed',         icon: '✦', decimals: 1 },
  { end: 25000, suffix: '+', label: 'Procedures Completed', detail: 'Implants, RCT & veneers',        icon: '◆' },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gold divider line sweep
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: lineRef.current, start: 'top 90%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative py-24 px-6 md:px-12 bg-white border-y border-slate-100 overflow-hidden">

      {/* Ambient gold blob */}
      <div className="ambient-orb absolute top-1/2 left-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="section-tag text-gold-deep mb-3">
              Mercy Dental · Clinical Track Record
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-900">
              Trusted by{' '}
              <span className="italic font-normal text-gold-gradient">Thousands</span>
            </h2>
          </div>
          {/* Animated gold line */}
          <div ref={lineRef} className="hidden md:block flex-1 h-[1.5px] ml-12 bg-gradient-to-r from-gold/70 via-gold-glow/50 to-transparent rounded-full" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.90 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.85,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card-gold relative group flex flex-col items-center text-center p-7 rounded-3xl cursor-default overflow-hidden"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-gold/30 flex items-center justify-center text-gold text-lg font-bold mb-4 shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <span className="font-serif text-4xl sm:text-5xl font-light text-gold-gradient mb-2 leading-none">
                <CountUp endVal={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </span>

              <span className="font-sans text-[11px] uppercase tracking-widest text-slate-900 font-bold mb-1.5">
                {stat.label}
              </span>
              <span className="font-sans text-[10px] text-slate-500 font-light">
                {stat.detail}
              </span>

              {/* Animated bottom gold bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: idx * 0.12 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-glow to-transparent origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
