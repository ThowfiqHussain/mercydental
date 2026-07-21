import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fieldVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AppointmentSection({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (onClose) onClose();
    }, 4000);
  };

  return (
    <section id="appointment" className="relative py-28 px-4 md:px-12 bg-pearl-100 overflow-hidden text-slate-900">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-light/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-14 rounded-3xl bg-white border border-gold/40 shadow-2xl relative overflow-hidden"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep font-bold"
            >
              Mercy Dental Clinic • Madurai Center
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl font-light text-slate-900 mt-2"
            >
              Book Your <span className="italic font-normal text-gold-gradient">Dental Intake</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-xs md:text-sm text-slate-700 font-normal mt-3"
            >
              Schedule your clinical consultation with Dr. Melvin Raj at Tagore Nagar, New Natham Road, Tiruppalai, Madurai.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Patient Full Name',      type: 'text', placeholder: 'e.g. Ramesh Kumar',   required: true,  readOnly: false, value: undefined },
              { label: 'Contact Phone / WhatsApp', type: 'tel',  placeholder: '+91 98421 23456',   required: true,  readOnly: false, value: undefined },
              { label: 'Clinic Location',         type: 'text', placeholder: '',                   required: false, readOnly: true,  value: 'Tiruppalai, New Natham Road, Madurai' },
            ].map((field, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label className="block font-sans text-xs uppercase tracking-widest text-slate-900 font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  readOnly={field.readOnly}
                  placeholder={field.placeholder}
                  defaultValue={field.value}
                  className={`w-full px-5 py-3.5 rounded-xl border focus:border-gold focus:outline-none text-slate-900 text-sm font-sans font-medium transition-colors duration-200 ${
                    field.readOnly
                      ? 'bg-slate-100 border-slate-300 font-bold'
                      : 'bg-slate-50 border-slate-300 hover:border-slate-400'
                  }`}
                />
              </motion.div>
            ))}

            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <label className="block font-sans text-xs uppercase tracking-widest text-slate-900 font-bold mb-2">
                Required Treatment
              </label>
              <select className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-gold focus:outline-none text-slate-900 text-sm font-sans font-medium hover:border-slate-400 transition-colors duration-200">
                <option value="rct">Single-Sitting Root Canal (RCT)</option>
                <option value="implants">Dental Implants &amp; Fixed Teeth</option>
                <option value="whitening">Laser Teeth Whitening</option>
                <option value="veneers">Digital Smile Design &amp; Veneers</option>
                <option value="braces">Orthodontics &amp; Aligners</option>
                <option value="general">General Dental Checkup</option>
              </select>
            </motion.div>

            <motion.div
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-2 mt-4"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full bg-slate-950 text-white font-sans text-xs uppercase tracking-[0.25em] font-bold shadow-2xl hover:bg-slate-900 transition-all duration-300"
              >
                Confirm Appointment Request
              </motion.button>
            </motion.div>
          </form>

          {/* Toast Notification */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-xl bg-gold/15 border border-gold text-gold-deep text-center font-sans text-xs tracking-wider uppercase font-bold"
              >
                ✨ Thank you! Dr. Melvin Raj's team at Mercy Dental Clinic Madurai will contact you shortly.
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
