import React from 'react';

export default function FooterSection() {
  return (
    <footer className="relative bg-obsidian-pure text-white pt-24 pb-12 px-4 md:px-12 overflow-hidden border-t border-gold/20">
      {/* Volumetric Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-obsidian-light text-gold font-serif font-bold text-lg">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.25em] text-white font-medium">M E R C Y</span>
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold font-bold">Dental Clinic • Madurai</span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-300 font-normal leading-relaxed max-w-sm mb-6">
              Madurai's trusted center for single-sitting root canal therapy, painless dental implants, digital smile design, and laser whitening under Dr. Melvin Raj.
            </p>

            <div className="font-sans text-[10px] uppercase tracking-widest text-gold font-bold">
              Tagore Nagar, New Natham Road, Tiruppalai, Madurai
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-base text-gold-light font-bold mb-4">Madurai Clinic Center</h4>
            <ul className="space-y-3 font-sans text-xs text-slate-200 font-normal">
              <li className="hover:text-gold transition-colors">
                <strong className="block text-white font-bold">Clinic Address</strong>
                No. 582, 1st Floor, Tagore Nagar, New Natham Road, Tiruppalai, Madurai - 625014
              </li>
              <li className="hover:text-gold transition-colors">
                <strong className="block text-white font-bold">Appointments & Emergency</strong>
                +91 98421 23456 / +91 452 253 4567
              </li>
              <li className="hover:text-gold transition-colors">
                <strong className="block text-white font-bold">Clinical Hours</strong>
                Mon - Sat: 9:00 AM - 9:00 PM | Sun: 10:00 AM - 2:00 PM
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base text-gold-light font-bold mb-4">Treatments</h4>
            <ul className="space-y-2.5 font-sans text-xs text-slate-300 font-medium uppercase tracking-wider">
              <li><a href="#hero" className="hover:text-gold transition-colors">Digital Dental Care</a></li>
              <li><a href="#doctor" className="hover:text-gold transition-colors">Dr. Melvin Raj Profile</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Single-Sitting RCT</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Dental Implants</a></li>
              <li><a href="#appointment" className="hover:text-gold transition-colors">Book Intake</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold gap-4">
          <div>© {new Date().getFullYear()} Mercy Dental Clinic, Madurai. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <span>Tiruppalai</span>
            <span>•</span>
            <span>Tagore Nagar</span>
            <span>•</span>
            <span>Madurai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
