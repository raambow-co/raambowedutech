import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Video, GraduationCap, MapPin, Sparkles, Sun } from 'lucide-react';

const OrganisationVisual = () => {
  const floatAnim = (delay = 0, yOffset = 10, duration = 6) => ({
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

  return (
    <div className="relative w-full max-w-lg aspect-[16/10] md:aspect-[16/9] bg-glass border border-glass rounded-3xl p-4 md:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-visible select-none flex items-center justify-center">
      
      {/* Cinematic Viewfinder borders */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />

      {/* Grid overlay within cinematic screen */}
      <div className="absolute inset-4 bg-grid-pattern opacity-10 rounded-2xl pointer-events-none" />

      {/* Cinematic Warm Sunrise Glow (Symbolizes hope/opportunity) */}
      <div className="absolute bottom-0 right-0 w-[80%] h-[80%] rounded-full bg-radial from-orange-500/15 via-indigo-500/5 to-transparent blur-[80px] z-0 animate-pulse-slow" />
      <div className="absolute top-0 left-0 w-[50%] h-[50%] rounded-full bg-radial from-blue-500/10 to-transparent blur-[60px] z-0 animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* Widescreen Scene Content */}
      <div className="relative w-full h-full flex items-center justify-center [perspective:1000px] scale-[0.72] sm:scale-[0.85] md:scale-100">
        
        {/* 1. Main Projector Display Card (Rural connection map) */}
        <motion.div
          {...floatAnim(0, 6, 7)}
          className="absolute w-[85%] h-[80%] bg-navy-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-2xl"
          style={{ transform: 'rotateX(8deg) rotateY(-8deg)' }}
        >
          {/* Scanline */}
          <div className="absolute inset-0 bg-linear-to-b from-white/0 via-indigo-500/[0.03] to-white/0 pointer-events-none animate-scanline" />

          {/* Top Panel */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              <span className="font-mono text-[9px] md:text-[10px] text-neutral-300">RURAL_HUB_ONLINE</span>
            </div>
            <span className="flex items-center gap-1 text-[8px] md:text-[9px] font-mono text-accent-orange bg-accent-orange/5 px-2 py-0.5 rounded-md border border-accent-orange/10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
              <span>Free AI Broadcast</span>
            </span>
          </div>

          {/* Center Graphic: Mock Map Coordinates */}
          <div className="flex-1 flex items-center justify-center relative opacity-80 py-2">
            {/* Compass Grid lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/5 border-dashed" />
              <div className="w-12 h-12 rounded-full border border-white/5" />
            </div>
            {/* Glowing Hub Connection Lines */}
            <svg className="absolute w-full h-full" viewBox="0 0 200 100">
              <path d="M 30,70 Q 100,20 170,40" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 30,70 Q 100,80 170,40" fill="none" stroke="rgba(255, 107, 0, 0.4)" strokeWidth="1" />
              <circle cx="30" cy="70" r="3" fill="#ff6b00" className="animate-pulse" />
              <circle cx="170" cy="40" r="3" fill="#6366f1" className="animate-pulse" />
            </svg>
            <div className="absolute bottom-2 text-[8px] md:text-[9px] font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded">
              Broadcasting to Hub: 12.8712° N, 74.8423° E
            </div>
          </div>

          {/* Footer details */}
          <div className="flex justify-between items-center text-[8px] md:text-[9px] text-neutral-500 border-t border-white/5 pt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>Mangalore Sector</span>
            </span>
            <span>Signal: Stable</span>
          </div>
        </motion.div>

        {/* 2. Floating Student Tablet Widget (Left-Bottom / Forward) */}
        <motion.div
          {...floatAnim(1.2, 8, 5.5)}
          className="absolute w-[150px] md:w-[190px] bg-glass border border-glass rounded-xl p-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
          style={{ transform: 'translate3d(-100px, 60px, 60px)' }}
        >
          <div className="flex items-center gap-2 mb-2 text-white border-b border-white/5 pb-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="text-[9px] md:text-[10px] font-semibold font-display">Student Desk</span>
          </div>

          <div className="text-left space-y-1.5">
            <div className="text-[9px] md:text-[10px] text-neutral-200 font-bold line-clamp-1">Govt High School</div>
            <div className="flex justify-between text-[8px] text-neutral-400 font-mono">
              <span>Grade: 8th Std</span>
              <span className="text-green-400">Class: Active</span>
            </div>
            
            {/* Progress bar */}
            <div className="space-y-0.5 pt-1">
              <div className="flex justify-between text-[7px] text-neutral-500 font-mono">
                <span>Concept Mastery</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full w-[85%]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Equal Opportunity index card (Right-Top / Forward) */}
        <motion.div
          {...floatAnim(2, 7, 5.8)}
          className="absolute w-[120px] md:w-[150px] bg-glass border border-glass rounded-xl p-3 shadow-[0_12px_25px_rgba(255,107,0,0.06)]"
          style={{ transform: 'translate3d(120px, -60px, 80px)' }}
        >
          <div className="flex items-center gap-1.5 text-accent-orange mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] md:text-[10px] font-semibold text-white font-display">Digital Divide</span>
          </div>

          <div className="text-left space-y-1">
            <span className="text-[8px] text-neutral-400 font-mono uppercase block">Access Index</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-extrabold font-display text-white leading-none">100%</span>
              <span className="text-[8px] text-green-400 font-mono font-bold">Goal</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Small decorative sunrise icon tag (Top-Left / Backward) */}
        <motion.div
          {...floatAnim(2.8, 5, 6.5)}
          className="absolute bg-glass border border-glass rounded-full px-2.5 py-1 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-1.5"
          style={{ transform: 'translate3d(-110px, -80px, -20px)' }}
        >
          <Sun className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span className="text-[8px] font-mono font-bold text-neutral-300">Hope Initiative</span>
        </motion.div>

      </div>
    </div>
  );
};

export default OrganisationVisual;
