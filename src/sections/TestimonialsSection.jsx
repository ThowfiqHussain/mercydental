import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Dr. Mercy Vance restored not just my smile, but my confidence on screen. The precision and privacy at Mercy Dental are unmatched anywhere in Europe or North America.",
      author: "Elena Rostova",
      role: "International Film Actress",
      location: "Zurich Clinic",
      stars: 5,
    },
    {
      quote: "The Swiss porcelain veneers feel completely weightless and natural. I was back attending global summits within 48 hours without a single moment of discomfort.",
      author: "Marcus Vance-Sterling",
      role: "Managing Partner, Global Tech Fund",
      location: "Dubai Suite",
      stars: 5,
    },
    {
      quote: "Stepping into Mercy Dental feels like walking into a 7-star boutique hotel in Geneva. Every detail, from the ambient soundscapes to the treatment outcomes, is pure luxury.",
      author: "Sophia Al-Mansoor",
      role: "Luxury Brand Director",
      location: "London Clinic",
      stars: 5,
    },
    {
      quote: "As someone with dental anxiety, the team’s gentle approach and robotic laser technology made my full reconstruction an absolute pleasure.",
      author: "Dr. Henri Laurent",
      role: "Professor of Medicine",
      location: "Zurich Clinic",
      stars: 5,
    },
  ];

  return (
    <section className="relative py-28 px-4 md:px-12 bg-pearl-100 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gold-light/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            Client Accolades
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-slate-900 mt-3">
            Voices of <span className="italic font-normal text-gold-gradient">Perfection</span>
          </h2>
          <p className="font-sans text-sm text-slate-600 font-light mt-4 leading-relaxed">
            Read authentic impressions from royalty, business leaders, and artists who entrust their smiles to Mercy Dental.
          </p>
        </div>

        {/* Infinite Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 rounded-3xl glass-card-gold border border-gold/30 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-gold text-sm gap-1">
                    {'★'.repeat(item.stars)}
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep font-semibold px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                    {item.location}
                  </span>
                </div>

                <p className="font-serif italic text-lg md:text-xl text-slate-800 font-light leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-sans text-sm uppercase tracking-widest text-slate-900 font-bold">
                    {item.author}
                  </div>
                  <div className="font-sans text-xs text-slate-500 font-light mt-0.5">
                    {item.role}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center font-serif text-gold text-xs font-bold">
                  M
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
