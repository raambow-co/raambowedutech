import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Handshake, Laptop, Award, ArrowUpRight, Check } from 'lucide-react';
import PartnershipDashboard from './PartnershipDashboard';

const SchoolPartnershipSection = () => {
  const steps = [
    {
      number: '01',
      icon: Presentation,
      title: 'Free AI Demo Workshop',
      description: 'Interactive AI awareness session for students and school management.',
    },
    {
      number: '02',
      icon: Handshake,
      title: 'School Collaboration',
      description: 'Customized partnership model designed for your school and student needs.',
    },
    {
      number: '03',
      icon: Laptop,
      title: 'AI Training Sessions',
      description: 'Hands-on practical learning with AI tools, creativity, and future skills.',
    },
    {
      number: '04',
      icon: Award,
      title: 'Certificates & Innovation Projects',
      description: 'Students receive certificates and participate in creative AI-based activities.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="schools" 
      className="relative bg-navy-950 border-t border-white/5 py-24 md:py-28 overflow-hidden z-10"
    >
      {/* Background Grids and Soft Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-blue-500/10 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[110px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - CONTENT & TIMELINE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8"
          >
            {/* Small Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-glass border border-glass shadow-md shadow-black/20"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
              </span>
              <span className="font-display text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                ⚡ School Partnerships
              </span>
            </motion.div>

            {/* Title & Subheading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Become An{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
                  AI-Ready School
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
                Partner with us to introduce practical AI literacy and future-ready digital education for students.
              </p>
            </motion.div>

            {/* Vertical step timeline */}
            <motion.div 
              variants={containerVariants}
              className="w-full max-w-xl relative pl-2 pt-2"
            >
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative pl-12 pb-8 last:pb-0 group"
                  >
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] top-[30px] bottom-0 w-[1.5px] bg-gradient-to-b from-indigo-500/20 via-indigo-500/10 to-transparent group-last:hidden" />
                    
                    {/* Step Glowing Marker */}
                    <div className="absolute left-0 top-[2px] w-10 h-10 rounded-xl bg-navy-950 border border-white/10 group-hover:border-accent-orange/40 flex items-center justify-center text-xs font-bold font-mono text-neutral-400 group-hover:text-accent-orange-glow shadow-[0_4px_15px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_12px_rgba(255,107,0,0.15)] transition-all duration-300">
                      {step.number}
                    </div>

                    {/* Step Card Content */}
                    <div className="bg-glass border border-glass hover:bg-glass-hover hover:border-indigo-500/20 p-4.5 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.03)] transition-all duration-300 flex items-start gap-4">
                      {/* Icon */}
                      <div className="p-2.5 rounded-xl bg-white/5 text-accent-orange group-hover:text-accent-orange-glow group-hover:bg-accent-orange/5 transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4 md:w-5 h-5" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-sm md:text-base text-white group-hover:text-accent-orange-glow transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4"
            >
              {/* Primary Button */}
              <motion.a
                href="#request-partnership"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display text-sm font-bold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow shadow-lg shadow-accent-orange/20 hover:shadow-accent-orange/40 hover:text-glow-orange transition-all duration-300 overflow-hidden group"
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
                className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-full font-display text-sm font-semibold text-neutral-300 hover:text-white bg-glass border border-glass hover:bg-glass-hover shadow-md hover:shadow-white/5 transition-all duration-300 group"
              >
                Book Free Workshop
              </motion.a>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE - ISOMETRIC DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <PartnershipDashboard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SchoolPartnershipSection;
