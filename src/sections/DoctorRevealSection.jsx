import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const doctorImg = '/images/Dr. Melvin Raj.png';

export default function DoctorRevealSection() {
  const clipRef  = useRef(null);  // Portrait clip-path reveal
  const lineRef  = useRef(null);  // Gold accent line

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal — image sweeps up from bottom
      if (clipRef.current) {
        gsap.fromTo(clipRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: clipRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
      // Gold line draw left-to-right
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="doctor"
      className="relative py-28 px-4 md:px-12 bg-gradient-to-b from-pearl-100 via-white to-pearl-200 overflow-hidden text-slate-900"
    >
      {/* Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-light/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">

        {/* ── Section Header ──────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep font-bold"
          >
            Pioneering Dental Surgeon &amp; Implantologist
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-5xl font-light text-slate-900 mt-3"
          >
            Meet <span className="italic font-normal text-gold-gradient">Dr. Melvin Raj</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-slate-700 font-normal mt-4 leading-relaxed"
          >
            Chief Dental Surgeon &amp; Founder of Mercy Dental Clinic, Madurai. Specializing in
            single-sitting root canal therapy, painless implants, and advanced laser dentistry.
          </motion.p>
        </div>

        {/* ── Doctor Card + Info ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Doctor Portrait — clip-path reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-gold/40 shadow-2xl group bg-slate-950">
              <div ref={clipRef} className="absolute inset-0">
                <img
                  src={doctorImg}
                  alt="Dr. Melvin Raj, BDS, MDS"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Name overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-20 text-white">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-glow font-bold drop-shadow-md">
                  Chief Dental Surgeon &amp; Founder
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white mt-1 drop-shadow-lg">
                  Dr. Melvin Raj, BDS, MDS
                </h3>
                <p className="font-sans text-xs text-slate-200 mt-2 font-normal drop-shadow-md">
                  Specialist in Single-Sitting RCT &amp; Dental Implantology
                </p>
              </div>

              {/* Floating clinic badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 left-6 z-20 px-5 py-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-gold/40 shadow-xl"
              >
                <div className="font-serif text-xs text-gold-glow font-bold">Mercy Dental Clinic</div>
                <div className="font-sans text-[9px] uppercase text-white tracking-widest mt-0.5 font-bold">Tagore Nagar, Madurai</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Info Column — spring slide from right */}
          <div className="lg:col-span-6 flex flex-col gap-8">

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-gold/40 shadow-xl"
            >
              {/* Gold accent line */}
              <div ref={lineRef} className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-glow rounded-full mb-5" />
              <div className="font-serif italic text-xl md:text-2xl text-slate-900 font-normal leading-relaxed mb-6">
                "Our mission at Mercy Dental Clinic is to combine painless treatment protocols with
                digital accuracy so every patient leaves with a healthy, radiant smile."
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gold overflow-hidden bg-slate-950 flex-shrink-0 shadow-md">
                  <img src={doctorImg} alt="Dr. Melvin Raj" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-sans text-xs uppercase tracking-widest text-slate-900 font-bold">Dr. Melvin Raj</div>
                  <div className="font-sans text-[10px] text-slate-600 font-medium">Chief Surgeon, Mercy Dental Clinic Madurai</div>
                </div>
              </div>
            </motion.div>

            {/* Credential Cards — stagger cascade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Single-Sitting RCT',
                  desc:  'Advanced rotary endodontics enabling complete root canal therapy in just one single visit.',
                },
                {
                  title: 'Painless Implants',
                  desc:  'Guided dental implants with rapid recovery and natural tooth appearance.',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(212,175,55,0.12)' }}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md transition-all duration-300"
                >
                  <h4 className="font-serif text-lg text-slate-900 font-bold">{card.title}</h4>
                  <p className="font-sans text-xs text-slate-700 mt-2 leading-relaxed font-normal">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
