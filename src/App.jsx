import React from 'react';
import MagneticCursor from './components/MagneticCursor';
import ToothBackgroundCanvas from './components/ToothBackgroundCanvas';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import DoctorRevealSection from './sections/DoctorRevealSection';
import AboutSection from './sections/AboutSection';
import HealthySmilesSection from './sections/HealthySmilesSection';
import ServicesSection from './sections/ServicesSection';
import SmileTransformationSection from './sections/SmileTransformationSection';
import StatsSection from './sections/StatsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import AppointmentSection from './sections/AppointmentSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  const handleBookClick = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#appointment', { duration: 2.0, offset: -80 });
    } else {
      document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-pearl-DEFAULT text-slate-900 overflow-x-hidden">
      {/* Persistent 3D Tooth Canvas Background */}
      <ToothBackgroundCanvas />

      {/* Premium magnetic cursor — hidden on touch devices */}
      <MagneticCursor />

      {/* Global Navbar */}
      <Navbar onBookClick={handleBookClick} />

      {/* Sections */}
      <HeroSection onBookClick={handleBookClick} />
      <DoctorRevealSection />
      <AboutSection />
      <HealthySmilesSection onBookClick={handleBookClick} />
      <ServicesSection onBookClick={handleBookClick} />
      <SmileTransformationSection />
      <StatsSection />
      <TestimonialsSection />
      <AppointmentSection />
      <FooterSection />
    </div>
  );
}
