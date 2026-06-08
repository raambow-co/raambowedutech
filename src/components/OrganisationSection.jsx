import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, School, Compass, Heart, GraduationCap } from 'lucide-react';
import OrganisationVisual from './OrganisationVisual';

const OrganisationSection = () => {
  const impactCards = [
    {
      icon: Sparkles,
      title: 'Free AI Awareness',
      description: 'Interactive AI sessions designed to introduce students to the future of technology.',
      color: 'from-orange-500/15 to-orange-650/5 text-accent-orange-glow border-accent-orange/10',
    },
    {
      icon: School,
      title: 'Government School Outreach',
      description: 'Collaborating with rural and government schools to expand digital awareness.',
      color: 'from-blue-500/15 to-indigo-500/5 text-indigo-400 border-indigo-500/10',
    },
    {
      icon: Compass,
      title: 'Future Opportunities',
      description: 'Helping students discover creativity, technology, and future career possibilities.',
      color: 'from-emerald-500/15 to-emerald-650/5 text-emerald-400 border-emerald-500/10',
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Building confidence and digital literacy in underserved communities.',
      color: 'from-pink-500/15 to-pink-650/5 text-pink-400 border-pink-500/10',
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
      id="about" 
      className="relative bg-navy-950 border-t border-white/5 py-24 md:py-28 overflow-hidden z-10"
    >
      {/* Background Grids and Cinematic Warm Sunrise Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[20%] right-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-orange-500/8 via-indigo-500/2 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-radial from-blue-500/10 to-transparent blur-[120px] pointer-events-none" />

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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="font-display text-xs font-semibold tracking-wider text-neutral-300 uppercase">
              ⚡ Social Impact Initiative
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Technology Education For{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-indigo-400 text-glow-orange font-bold">
              Every Student
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-3xl"
          >
            RaamBow Organisation aims to bring AI awareness and future-ready digital education to rural and government school students completely free of cost.
          </motion.p>
        </div>

        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - VISUAL ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <OrganisationVisual />
          </motion.div>

          {/* RIGHT SIDE - CONTENT COPY */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                Bridging The Digital Divide
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
                Many rural students still do not have exposure to AI and future technologies. Our mission is to ensure every student, regardless of background, gets equal access to future-ready learning opportunities, unlocking their creative potential.
              </p>
            </motion.div>

            {/* Impact Cards Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2"
            >
              {impactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                    className="bg-glass border border-glass hover:bg-glass-hover hover:border-white/10 p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col gap-3 group"
                  >
                    {/* Icon Circle */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color.split(' ')[0]} border border-white/5 flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.color.split(' ')[1]}`} />
                    </div>
                    {/* Text content */}
                    <div className="space-y-1">
                      <h4 className="font-display text-sm md:text-base font-bold text-white transition-colors duration-300 group-hover:text-accent-orange-glow">
                        {card.title}
                      </h4>
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

export default OrganisationSection;
