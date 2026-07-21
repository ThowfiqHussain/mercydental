import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const storyPoints = [
    {
      number: '01',
      title: 'Digital RVG Diagnostic Imaging',
      description: 'Using high-resolution intraoral sensors and digital X-rays to diagnose cavities and root canal paths with 90% reduced radiation.',
    },
    {
      number: '02',
      title: 'Single-Sitting Rotary Endodontics',
      description: 'Engineered for painless, fast root canal therapy completed in a single comfortable visit using electronic apex locators.',
    },
    {
      number: '03',
      title: 'Class-B Autoclave Sterilization',
      description: 'Strict 5-step infection control protocol ensuring every dental instrument is 100% sterile and sealed in individual pouches.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-12 bg-white text-slate-900 overflow-hidden">
      {/* Soft Pearl Glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-pearl-200/60 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep font-bold">
              Mercy Dental Practice Principles
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-slate-900 mt-4 leading-tight">
              Clinical Excellence & <br />
              <span className="italic font-normal text-gold-gradient">Digital Accuracy.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-700 font-normal mt-6 leading-relaxed">
              At Mercy Dental Clinic in Tiruppalai, Madurai, Dr. Melvin Raj integrates rotary endodontic systems, intraoral cameras, and laser whitening to deliver gentle, high-precision dental care.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center font-serif text-xs font-bold">
                MDC
              </div>
              <span className="font-sans text-xs text-slate-900 font-bold">Tagore Nagar, New Natham Road, Madurai</span>
            </div>
          </div>

          {/* Right Storytelling Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {storyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="p-8 md:p-10 rounded-3xl bg-white border border-gold/30 shadow-lg relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-bold text-gold-gradient">{point.number}</span>
                  <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold-deep group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 font-bold">
                    →
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="font-sans text-sm md:text-base text-slate-700 font-normal leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
