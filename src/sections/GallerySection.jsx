import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      title: 'Digital RVG Diagnostic Suite',
      category: 'Low-Radiation Imaging',
      description: 'Ultra-clear digital radiovisiography sensors for immediate 2D/3D tooth structure scans.',
      img: '/images/Digital RVG Diagnostic Suite.png',
    },
    {
      title: 'Single-Sitting Rotary Endodontic Bay',
      category: 'RCT Treatment Suite',
      description: 'Motorized rotary file systems and electronic apex locators for single-visit root canal therapy.',
      img: '/images/Single-Sitting Rotary Endodontic Bay.png',
    },
    {
      title: 'Intraoral 3D Camera Scanner',
      category: 'Digital Optical Scanning',
      description: 'Handheld intraoral scanner replacing traditional dental putty for impression-free crown fittings.',
      img: '/images/Intraoral 3D Camera Scanner.png',
    },
    {
      title: 'Class-B Autoclave Sterilization Room',
      category: 'Infection Control',
      description: 'Multi-vacuum steam autoclaves guaranteeing 100% sterile, pouch-sealed dental instruments.',
      img: '/images/Class-B Autoclave Sterilization Room.png',
    },
  ];

  return (
    <section id="gallery" className="relative py-28 px-4 md:px-12 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep font-bold">
            Mercy Dental Clinic • Clinical Facilities
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-slate-900 mt-3">
            Madurai <span className="italic font-normal text-gold-gradient">Clinical Equipment & Setup</span>
          </h2>
          <p className="font-sans text-sm text-slate-700 font-normal mt-4 leading-relaxed">
            Explore our state-of-the-art dental clinical suites equipped with digital X-rays, intraoral scanners, and sterile operating bays.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={() => setSelectedImage(item)}
              className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-gold/30 shadow-xl group cursor-pointer bg-slate-950"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-glow font-bold drop-shadow-md">
                  {item.category}
                </span>
                <h3 className="font-serif text-2xl font-light text-white mt-1 group-hover:text-gold-light transition-colors drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-200 mt-2 font-normal line-clamp-2 drop-shadow-md">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full rounded-3xl bg-slate-950 border border-gold/40 text-white relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-slate-950 transition-colors font-bold bg-slate-950/80 backdrop-blur-md"
              >
                ✕
              </button>

              <div className="relative aspect-[16/9] w-full">
                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>

              <div className="p-8 md:p-10">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold-glow font-bold">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-3xl font-light text-white mt-2">
                  {selectedImage.title}
                </h3>
                <p className="font-sans text-sm text-slate-300 mt-4 font-normal leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-sans uppercase tracking-widest font-bold">
                  <span>Mercy Dental Clinic • Madurai</span>
                  <span className="text-gold-glow">Dr. Melvin Raj, BDS, MDS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
