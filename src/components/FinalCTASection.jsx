import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

const FinalCTASection = () => {
  const trustPills = [
    'AI Workshops',
    'School Partnerships',
    'Future Skills',
    'Student Innovation'
  ];

  return (
    <section 
      id="contact" 
      className="relative bg-navy-950 border-t border-white/5 py-28 md:py-36 overflow-hidden z-10 w-full"
    >
      {/* Background Grids and Cinematic Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[60%] h-[60%] rounded-full bg-radial from-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[350px] h-[350px] rounded-full bg-radial from-accent-orange/5 to-transparent blur-[90px] pointer-events-none" />

      {/* Rotating Concentric Holographic Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-indigo-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[700px] h-[700px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[950px] h-[950px] rounded-full border border-dashed border-accent-orange/5"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10 text-center flex flex-col items-center space-y-8">
        
        {/* Pulsing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-glass border border-glass shadow-md shadow-black/20"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
          </span>
          <span className="font-display text-xs font-semibold tracking-wider text-neutral-300 uppercase">
            ⚡ Partner With The Future
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let’s Build Future-Ready<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
              {' '}Schools Together
            </span>
          </h2>
          
          {/* Subheading */}
          <p className="font-sans text-base md:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Empower students with practical AI literacy, creativity, and future digital skills through modern AI education programs.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Button */}
          <motion.a
            href="#request-partnership"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display text-sm font-bold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow shadow-lg shadow-accent-orange/20 hover:shadow-accent-orange/40 hover:text-glow-orange transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Request Partnership
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href="#book-workshop"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-1.5 px-8 py-4 rounded-full font-display text-sm font-semibold text-neutral-300 hover:text-white bg-glass border border-glass hover:bg-glass-hover shadow-md hover:shadow-white/5 transition-all duration-300 group"
          >
            Book Free AI Workshop
          </motion.a>
        </motion.div>

        {/* Trust Badges Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/5 w-full max-w-xl"
        >
          {trustPills.map((pill, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-glass border border-glass text-xs font-semibold text-neutral-400 hover:text-white hover:border-accent-orange/30 hover:shadow-[0_0_8px_rgba(255,107,0,0.15)] transition-all duration-300 cursor-default"
            >
              <div className="w-4 h-4 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-accent-orange-glow" />
              </div>
              <span className="font-sans">{pill}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTASection;
