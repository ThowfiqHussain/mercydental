import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: 'Restorative & Esthetic Dentistry', subtitle: 'COMPOSITE RESTORATIONS',   description: 'Tooth-colored composite restorations, ceramic veneers, and aesthetic tooth re-shaping to restore natural appearance.', badge: 'Esthetics',   img: '/images/Restorative%20and%20Esthetic%20Dentistry.png' },
  { id: '02', title: 'Endodontic Treatment (RCT)',       subtitle: 'SINGLE-SITTING ROOT CANAL', description: 'Advanced motorized rotary endodontic treatment eliminating tooth pain while preserving natural root structure in just one visit.', badge: 'Endodontics', img: '/images/Endodontic%20Treatment%20(RCT).png' },
  { id: '03', title: 'Paediatric Dentistry',             subtitle: 'SPECIALIZED CHILD CARE',    description: 'Gentle preventive checkups, fluoridation, pit and fissure sealants, and child-friendly dental care.', badge: 'Child Care',  img: '/images/Paediatric%20Dentistry.png' },
  { id: '04', title: 'Orthodontic Treatment',            subtitle: 'BRACES & CLEAR ALIGNERS',   description: 'Correction of crowded teeth, malocclusions, gap closure, and aesthetic clear aligners.',  badge: 'Orthodontics',img: '/images/Orthodontic%20Treatment.png' },
  { id: '05', title: 'Periodontal Treatment',            subtitle: 'ULTRASONIC GUM THERAPY',    description: 'Treatment of bleeding gums, periodontitis, deep ultrasonic scaling, and laser flap therapy.', badge: 'Periodontics',img: '/images/Periodontal%20Treatment.png' },
  { id: '06', title: 'Prosthetic & Implant Dentistry',  subtitle: 'TITANIUM DENTAL IMPLANTS',   description: 'Permanent titanium dental implants, fixed bridges, and full mouth prosthetics engineered to replace missing teeth.', badge: 'Implants',    img: '/images/Prosthetic%20and%20Implant%20Dentistry.png' },
  { id: '07', title: 'Minor Oral Surgical Procedures',  subtitle: 'OUTPATIENT SURGERY',         description: 'Outpatient clinical surgical procedures including frenectomy, apicoectomy, and cyst excision.', badge: 'Surgery',     img: '/images/Minor%20oral%20surgical%20Procedures.png' },
  { id: '08', title: 'Wisdom Tooth Removal',            subtitle: 'IMPACTED MOLAR EXTRACTION',  description: 'Painless, gentle surgical extraction of impacted or painful wisdom teeth with rapid recovery.', badge: 'Extractions', img: '/images/Wisdom%20Tooth%20Removal.png' },
];

export default function ServicesSection({ onBookClick }) {
  const sectionRef  = useRef(null);
  const pinRef      = useRef(null);
  const trackRef    = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track  = trackRef.current;
      const pin    = pinRef.current;
      if (!track || !pin) return;

      const totalWidth = track.scrollWidth - pin.clientWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
          pin: pinRef.current,
          anticipatePin: 1,
          scrub: 1.2,
          snap: {
            snapTo: 1 / (services.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (services.length - 1));
            setActive(idx);
          },
        },
      });

      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      });

      // Individual card scale+opacity as they enter/leave
      const cards = track.querySelectorAll('.service-card');
      cards.forEach((card, i) => {
        const progress = i / (services.length - 1);
        gsap.fromTo(card,
          { opacity: i === 0 ? 1 : 0.55, scale: i === 0 ? 1 : 0.93 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
              scrub: true,
              onUpdate: (self) => {
                const dist = Math.abs(self.progress - progress);
                const s    = dist < 0.12 ? 1 : 1 - dist * 0.08;
                const o    = dist < 0.12 ? 1 : Math.max(0.5, 1 - dist * 1.2);
                gsap.set(card, { scale: s, opacity: o });
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0A0B0F] overflow-visible"
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="relative w-full h-screen flex flex-col justify-start pt-24 md:pt-28 pb-6 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gold/8 rounded-full blur-[160px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-8 md:px-14 w-full mb-6 md:mb-8 flex items-end justify-between flex-shrink-0">
          <div>
            <div className="section-tag text-gold-deep mb-2">
              Mercy Dental Clinic · 8 Clinical Services
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
              Our Comprehensive{' '}
              <span className="italic font-normal text-gold-gradient">Dental Services</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {services.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width:  active === i ? '24px' : '6px',
                    height: '6px',
                    background: active === i
                      ? 'linear-gradient(90deg, #D4AF37, #FCE762)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-widest font-bold">
              {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="overflow-visible px-8 md:px-14 flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-5 h-scroll-track"
            style={{ width: 'max-content' }}
          >
            {services.map((service, i) => (
              <div
                key={service.id}
                className="service-card shimmer-card relative flex-shrink-0 rounded-[28px] overflow-hidden border border-white/8 shadow-2xl flex flex-col justify-between p-6 md:p-7 transition-all duration-300"
                style={{ width: '340px', height: 'min(480px, calc(100vh - 240px))' }}
                onClick={() => onBookClick()}
              >
                {/* Full-bleed image */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/25 z-10" />

                {/* Top */}
                <div className="relative z-20 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold bg-black/65 text-gold-glow border border-gold/40 backdrop-blur-md">
                    {service.badge}
                  </span>
                  <span className="font-serif text-xl text-gold/70 font-bold">{service.id}</span>
                </div>

                {/* Bottom */}
                <div className="relative z-20 text-white">
                  <span className="font-sans text-[9px] text-gold-glow uppercase tracking-[0.22em] font-bold">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1 mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[11px] text-slate-300 leading-relaxed mb-5 line-clamp-2 opacity-85">
                    {service.description}
                  </p>

                  <button
                    onClick={(e) => { e.stopPropagation(); onBookClick(); }}
                    className="w-full py-3 rounded-full bg-white/10 hover:bg-gold/90 text-white hover:text-slate-950 font-sans text-[10px] uppercase tracking-widest font-bold border border-white/15 hover:border-gold backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Book Consultation <span>→</span>
                  </button>
                </div>
              </div>
            ))}

            {/* End CTA card */}
            <div
              className="flex-shrink-0 rounded-[28px] border border-gold/30 flex flex-col items-center justify-center gap-6 bg-slate-950/90 backdrop-blur-xl"
              style={{ width: '280px', height: 'min(480px, calc(100vh - 240px))' }}
            >
              <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center">
                <svg className="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5.5 10.5 6 13C6.5 15.5 7.5 19.5 9 21.5C9.5 22.2 10.5 22 11 21C11.5 20 12 18 12 16.5C12 18 12.5 20 13 21C13.5 22 14.5 22.2 15 21.5C16.5 19.5 17.5 15.5 18 13C18.5 10.5 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center px-8">
                <div className="font-serif text-xl text-white font-light mb-2">All Services</div>
                <div className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-bold">in one clinic</div>
              </div>
              <button
                onClick={onBookClick}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-gold to-gold-glow text-slate-950 font-sans text-[10px] uppercase tracking-widest font-bold shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 right-12 flex items-center gap-3 text-white/30 font-sans text-[10px] uppercase tracking-widest font-bold"
        >
          <span>Scroll to explore</span>
          <span>→</span>
        </motion.div>
      </div>
    </section>
  );
}
