import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Binary, Code2, Laptop } from 'lucide-react';

const ProgramsSection = () => {
  const programs = [
    {
      icon: Terminal,
      title: 'Prompt Engineering',
      description: 'Understand how to write effective prompts to get better AI results.',
    },
    {
      icon: Binary,
      title: 'C Programming Basics',
      description: 'Build logical thinking and programming fundamentals from scratch.',
    },
    {
      icon: Code2,
      title: 'Python Basics',
      description: 'Start coding with one of the world’s most beginner-friendly programming languages.',
    },
    {
      icon: Laptop,
      title: 'Web Development',
      description: 'Build responsive websites, learn HTML, CSS, and modern frontend frameworks.',
    },
  ];

  // Stagger configurations
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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

  // Infinite float animation for decorative labels
  const labelFloat = (delay = 0, yOffset = 8, duration = 6) => ({
    animate: {
      y: [0, -yOffset, 0],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      },
    },
  });

  const floatingLabels = [
    { text: 'AI Skills', style: 'top-[15%] left-[8%] rotate-[-6deg]', delay: 0 },
    { text: 'Future Ready', style: 'top-[22%] right-[6%] rotate-[12deg]', delay: 1.5 },
    { text: 'Creativity', style: 'bottom-[35%] left-[4%] rotate-[8deg]', delay: 0.8 },
    { text: 'Coding', style: 'bottom-[22%] right-[8%] rotate-[-10deg]', delay: 2.2 },
    { text: 'Innovation', style: 'bottom-[6%] left-[45%] rotate-[-3deg]', delay: 1.2 },
  ];

  return (
    <section 
      id="programs" 
      className="relative bg-navy-950 border-t border-white/5 py-24 md:py-28 overflow-hidden z-10"
    >
      {/* Background Grids and Soft Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] rounded-full bg-radial from-blue-500/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[130px] pointer-events-none" />

      {/* Floating Futuristic Labels */}
      {floatingLabels.map((lbl, idx) => (
        <motion.div
          key={idx}
          {...labelFloat(lbl.delay)}
          className={`absolute hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 shadow-inner pointer-events-none select-none text-[10px] font-mono tracking-widest text-neutral-500/70 uppercase ${lbl.style}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange/40" />
          {lbl.text}
        </motion.div>
      ))}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
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
              ⚡ Learning Programs
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            What Students{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
              Learn
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl"
          >
            Practical AI and coding skills designed to help students become future-ready creators, thinkers, and innovators.
          </motion.p>
        </div>

        {/* Responsive Grid of Cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full"
        >
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
                className="bg-glass border border-glass hover:bg-glass-hover hover:border-accent-orange/30 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col items-start text-left gap-4 group"
              >
                {/* Glowing Icon Wrapper */}
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-orange group-hover:text-accent-orange-glow group-hover:bg-accent-orange/10 group-hover:border-accent-orange/20 transition-all duration-350 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-display text-base md:text-lg font-bold text-white transition-colors duration-300 group-hover:text-accent-orange-glow tracking-tight">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-neutral-400 font-normal leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ProgramsSection;
