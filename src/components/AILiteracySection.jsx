import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Palette, Briefcase, ShieldCheck } from 'lucide-react';
import LiteracyVisual from './LiteracyVisual';

const AILiteracySection = () => {
  const cards = [
    {
      icon: GraduationCap,
      title: 'Smart Learning',
      description: 'Students can learn faster and understand concepts better using modern AI tools.',
      color: 'from-blue-500/10 to-indigo-500/10 text-indigo-400',
    },
    {
      icon: Palette,
      title: 'Creative Thinking',
      description: 'AI helps students improve creativity through presentations, design, writing, and innovation.',
      color: 'from-orange-500/10 to-amber-500/10 text-accent-orange-glow',
    },
    {
      icon: Briefcase,
      title: 'Future Careers',
      description: 'AI awareness prepares students for the future digital world and upcoming technologies.',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-400',
    },
    {
      icon: ShieldCheck,
      title: 'Responsible AI Usage',
      description: 'Teach students ethical and productive AI usage from an early stage.',
      color: 'from-purple-500/10 to-pink-500/10 text-purple-400',
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
    hidden: { opacity: 0, y: 30 },
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
      id="why-it-matters" 
      className="relative bg-navy-950 border-t border-white/5 py-24 md:py-28 overflow-hidden z-10"
    >
      {/* Background Grids and Soft Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-indigo-500/10 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-accent-orange/10 to-transparent blur-[110px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - VISUAL ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center"
          >
            <LiteracyVisual />
          </motion.div>

          {/* RIGHT SIDE - CONTENT COPY */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left space-y-6"
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
                ⚡ Why AI Education Matters
              </span>
            </motion.div>

            {/* Title & Subtitle */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                AI Literacy Is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
                  The Future
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl">
                Students should learn how to use AI responsibly, creatively, and productively before becoming future builders of technology.
              </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4"
            >
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                    className="bg-glass border border-glass hover:bg-glass-hover hover:border-indigo-500/20 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col gap-3 group"
                  >
                    {/* Icon Circle */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color.split(' ')[0]} border border-white/5 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.color.split(' ')[1]}`} />
                    </div>
                    {/* Text content */}
                    <div className="space-y-1">
                      <h3 className="font-display text-sm md:text-base font-bold text-white transition-colors duration-300 group-hover:text-accent-orange-glow">
                        {card.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-neutral-400 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AILiteracySection;
