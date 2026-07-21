import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SmileTransformationSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const steps = [
    {
      stage: 'STAGE 01',
      title: 'Digital Diagnostic Scan',
      desc: 'Low-radiation RVG scanning identifying decay, tooth discoloration, and bite alignment.',
      icon: '🔍',
    },
    {
      stage: 'STAGE 02',
      title: 'Single-Sitting RCT & Whitening',
      desc: 'Motorized rotary endodontic treatment and laser whitening executed in a single painless visit.',
      icon: '💎',
    },
    {
      stage: 'STAGE 03',
      title: 'Luminous Smile Result',
      desc: 'Permanent clinical restoration achieving natural enamel shade, symmetry, and tooth longevity.',
      icon: '✨',
    },
  ];

  const leftImg = "/images/LEFT SIDE.png";
  const rightImg = "/images/RIGHT SIDE.png";

  return (
    <section id="transformation" className="relative py-28 px-4 md:px-12 bg-slate-950 text-white overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-gold-glow font-bold"
          >
            Mercy Dental Clinic • Madurai Center
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-5xl font-light mt-3 text-white"
          >
            Digital <span className="italic font-normal text-gold-gradient">Smile Restoration Assessment</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm text-slate-200 font-normal mt-4 leading-relaxed"
          >
            Drag the golden slider left or right to compare the initial pre-treatment diagnostic state with the final restored smile result.
          </motion.p>
        </div>

        {/* Stage Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveStep(idx)}
              whileHover={{ scale: activeStep === idx ? 1.05 : 1.03 }}
              className={`p-6 rounded-2xl text-left transition-all duration-400 border ${
                activeStep === idx
                  ? 'bg-slate-900 border-gold shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-105'
                  : 'bg-slate-900/60 border-white/10 hover:border-gold/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-glow font-bold">{step.stage}</span>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="font-serif text-lg text-white font-bold mb-2">{step.title}</h3>
              <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed">{step.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Interactive Before / After Image Split Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-gold/40 shadow-2xl p-6 md:p-10"
        >
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="font-sans text-xs uppercase tracking-widest text-slate-300 font-bold">
                BEFORE: Initial State (LEFT SIDE)
              </span>
            </div>

            <div className="font-serif text-lg text-gold-gradient font-bold">
              {steps[activeStep].title}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans text-xs uppercase tracking-widest text-gold-glow font-bold">
                AFTER: Restored Result (RIGHT SIDE)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-gold-glow animate-pulse" />
            </div>
          </div>

          {/* Interactive Image Split Canvas */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gold/30 shadow-2xl bg-slate-950"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              setSliderPos((x / rect.width) * 100);
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
              setSliderPos((x / rect.width) * 100);
            }}
          >
            {/* RIGHT IMAGE LAYER (AFTER TREATMENT) */}
            <img
              src={rightImg}
              alt="Restored Result Right Side"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* LEFT IMAGE LAYER (BEFORE TREATMENT - CLIPPED) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-gold shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={leftImg}
                alt="Initial State Left Side"
                className="absolute top-0 left-0 h-full max-w-none object-cover pointer-events-none"
                style={{ width: `${containerWidth}px` }}
              />
            </div>

            {/* Vertical Golden Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gold shadow-[0_0_15px_#D4AF37] pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-gold text-slate-950 flex items-center justify-center text-xs font-bold shadow-2xl border-2 border-white">
                ↔
              </div>
            </div>

          </div>

          {/* Footer Caption */}
          <div className="mt-4 text-center font-sans text-[11px] text-slate-400 uppercase tracking-widest font-bold">
            ◄ Drag Golden Slider Left or Right to Compare Patient Smile Results ►
          </div>

        </motion.div>
      </div>
    </section>
  );
}
