import React from 'react';
import { motion } from 'framer-motion';

const StatsBanner = () => {
  const stats = [
    { value: '50+', label: 'Schools Reached' },
    { value: '10k+', label: 'Students Inspired' },
    { value: '30+', label: 'Rural Workshops' },
    { value: '15+', label: 'Communities Impacted' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
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
    <div className="relative bg-navy-950/40 border-t border-b border-white/5 py-12 md:py-16 z-10 w-full overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, border: '1px solid rgba(255, 107, 0, 0.15)' }}
              className="bg-glass border border-glass p-5 rounded-2xl text-center shadow-md hover:shadow-accent-orange/5 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight leading-none mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-indigo-400 text-glow-orange">
                  {stat.value}
                </span>
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-neutral-400 font-mono tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsBanner;
