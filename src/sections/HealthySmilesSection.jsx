import React from 'react';
import { motion } from 'framer-motion';

const smileFeatures = [
  {
    title:    'General Dentistry',
    subtitle: 'Comprehensive Care',
    desc:     'Preventive checkups, digital diagnostics, scaling, and complete oral wellness.',
    svg:      '<path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C5.5 7.5 5.5 10.5 6 13C6.5 15.5 7.5 19.5 9 21.5C9.5 22.2 10.5 22 11 21C11.5 20 12 18 12 16.5C12 18 12.5 20 13 21C13.5 22 14.5 22.2 15 21.5C16.5 19.5 17.5 15.5 18 13C18.5 10.5 18.5 7.5 17.5 5.5C16.5 3.5 14.5 2 12 2Z" /><path d="M12 6V10M10 8H14" stroke-width="1.8"/>',
  },
  {
    title:    'Urgent Surgery',
    subtitle: 'Emergency Relief',
    desc:     'Immediate pain management, emergency tooth extractions, and trauma protocols.',
    svg:      '<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><path d="M12 8V16M8 12H16" stroke-width="2.2"/>',
  },
  {
    title:    'Dental Implants',
    subtitle: 'Permanent Restoration',
    desc:     'Single-tooth & full-arch titanium implants engineered for lifetime stability.',
    svg:      '<path d="M12 2C9.5 2 8 3.5 8 6C8 9 9.5 11 12 12C14.5 11 16 9 16 6C16 3.5 14.5 2 12 2Z" /><path d="M10 12V22M14 12V22M10 15H14M10 18H14M11 21H13" stroke-width="2"/>',
  },
  {
    title:    'Tooth Whitening',
    subtitle: 'Laser Brightening',
    desc:     'Advanced laser smile whitening eliminating deep stains for a luminous smile.',
    svg:      '<path d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z" /><path d="M19 17L19.9 19.1L22 20L19.9 20.9L19 23L18.1 20.9L16 20L18.1 19.1L19 17Z" /><path d="M5 2L5.6 3.4L7 4L5.6 4.6L5 6L4.4 4.6L3 4L4.4 3.4L5 2Z" />',
  },
  {
    title:    'Prosthesis',
    subtitle: 'Crowns & Bridges',
    desc:     'Precision-milled ceramic crowns, fixed bridges, and full mouth prosthetics.',
    svg:      '<path d="M3 18L5 8L9 12L12 5L15 12L19 8L21 18H3Z" /><circle cx="12" cy="18" r="1.5" fill="currentColor" /><circle cx="7" cy="18" r="1.5" fill="currentColor" /><circle cx="17" cy="18" r="1.5" fill="currentColor" />',
  },
  {
    title:    'Dental Braces',
    subtitle: 'Aligners & Braces',
    desc:     'Aesthetic clear invisible aligners, metal braces, and orthodontic realignment.',
    svg:      '<path d="M3 12C3 12 7 7 12 7C17 7 21 12 21 12C21 12 17 17 12 17C7 17 3 12 3 12Z" /><path d="M6 10.5V13.5M12 9.5V14.5M18 10.5V13.5M3 12H21" stroke-width="2"/>',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.92 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: i * 0.10,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const iconVariants = {
  hidden:  { scale: 0, rotate: -20 },
  visible: (i) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      delay: i * 0.10 + 0.25,
    },
  }),
};

export default function HealthySmilesSection({ onBookClick }) {
  return (
    <section
      id="healthy-smiles"
      className="py-24 px-6 md:px-12 bg-[#FAFBFD] text-slate-900 relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="font-sans text-xs uppercase tracking-[0.35em] text-gold-deep font-bold"
          >
            Mercy Dental Care Principles
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-5xl font-light text-slate-900 mt-2"
          >
            Healthy Smiles{' '}
            <span className="font-bold italic text-gold-gradient">Everyday!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs md:text-sm text-slate-600 font-normal mt-3 leading-relaxed"
          >
            Delivering pain-free, specialized dental treatments in Tiruppalai, Madurai under Dr. Melvin Raj.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smileFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(212,175,55,0.14)' }}
              className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-xl transition-all duration-400 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500/40 via-yellow-400/60 to-amber-500/10 rounded-t-full" />

              <div>
                {/* Elastic pop icon */}
                <motion.div
                  custom={idx}
                  variants={iconVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-2xl bg-slate-950 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shadow-lg mb-6 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                </motion.div>

                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep font-bold">
                  {item.subtitle}
                </span>

                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-3 group-hover:text-gold-deep transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-slate-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-sans text-[11px] uppercase tracking-wider font-bold text-slate-800">
                  Specialized Treatment
                </span>
                <motion.span
                  whileHover={{ x: 4 }}
                  className="text-gold-deep font-bold text-lg"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <button
            onClick={onBookClick}
            className="px-10 py-4 rounded-full bg-slate-950 hover:bg-gold-deep text-white font-sans text-xs uppercase tracking-[0.25em] font-bold shadow-xl hover:shadow-gold-deep/30 hover:scale-105 transition-all duration-300"
          >
            Learn More Services →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
