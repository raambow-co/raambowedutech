import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Brain, ClipboardList, Award, Infinity as InfinityIcon, ArrowRight, Check } from 'lucide-react';
import PlatformDashboard from './PlatformDashboard';

const PlatformSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const features = [
    {
      icon: LayoutDashboard,
      title: 'Student Dashboard',
      description: 'Track learning progress, completed lessons, and achievements in one place.',
    },
    {
      icon: Brain,
      title: 'AI Learning Experience',
      description: 'Interactive learning designed for creativity, productivity, and future digital skills.',
    },
    {
      icon: ClipboardList,
      title: 'Assignments & Quizzes',
      description: 'Engaging tasks and quizzes to improve practical understanding.',
    },
    {
      icon: Award,
      title: 'Certificates & Achievements',
      description: 'Earn certificates and showcase completed learning milestones.',
    },
    {
      icon: InfinityIcon,
      title: 'Anytime Learning',
      description: 'Access lessons and resources from anywhere on any device.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmitted(true);
      setEmail('');
    }
  };

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
      id="platform" 
      className="relative bg-navy-950 border-t border-white/5 py-24 md:py-28 overflow-hidden z-10"
    >
      {/* Background Grids and Glow Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-blue-500/10 to-transparent blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[110px] pointer-events-none" />

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
              ⚡ Coming Soon
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            The Future Learning{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
              Platform
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl"
          >
            A modern AI-powered learning experience designed to help students learn smarter, track progress, and build future-ready skills.
          </motion.p>
        </div>

        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - CONTENT & FEATURES */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-8"
          >
            {/* Features List */}
            <div className="space-y-4 w-full max-w-xl">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ x: 6 }}
                    className="bg-glass border border-glass hover:border-indigo-500/25 p-4.5 rounded-2xl flex items-start gap-4 transition-all duration-300 group"
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 text-accent-orange group-hover:text-accent-orange-glow group-hover:bg-accent-orange/10 group-hover:border-accent-orange/20 transition-all duration-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-sm md:text-base text-white group-hover:text-accent-orange-glow transition-colors duration-300">
                        {feat.title}
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Email waitlist signup block */}
            <motion.div 
              variants={itemVariants}
              className="w-full max-w-xl p-6 bg-glass border border-glass rounded-2xl space-y-4 shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            >
              <div className="space-y-1">
                <h5 className="font-display font-bold text-sm md:text-base text-white">
                  Get Early Access Updates
                </h5>
                <p className="font-sans text-xs text-neutral-400">
                  Be the first to know when the RaamBow LMS goes live and receive free learning assets.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-navy-950/70 border border-white/5 hover:border-accent-orange/20 focus:border-accent-orange/60 text-white px-5 py-3 rounded-full outline-none font-sans text-xs md:text-sm shadow-inner transition-all"
                  />
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full font-display text-xs md:text-sm font-bold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow shadow-md shadow-accent-orange/15 hover:shadow-accent-orange/30 hover:text-glow-orange cursor-pointer transition-all duration-300 shrink-0"
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-green-500/5 border border-green-500/10 text-green-400 font-sans text-xs md:text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Success! You are on the waitlist. We will notify you soon!</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - VISUAL DASHBOARD MOCKUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <PlatformDashboard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
