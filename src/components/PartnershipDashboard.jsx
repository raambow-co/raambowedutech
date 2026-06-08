import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Presentation, Award, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const PartnershipDashboard = () => {
  // Infinite floating animation
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
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[550px] flex items-center justify-center [perspective:1200px] overflow-visible select-none">
      
      {/* Glow Backdrops */}
      <div className="absolute w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-radial from-indigo-500/10 to-transparent blur-[80px] md:blur-[100px] z-0 animate-pulse-slow" />
      <div className="absolute w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[60px] md:blur-[80px] z-0 animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* 3D Transform Container */}
      <div className="relative w-full h-full flex items-center justify-center transform [transform-style:preserve-3d] rotate-x-[16deg] rotate-y-[-20deg] scale-[0.62] sm:scale-[0.8] md:scale-[0.9] lg:scale-100">
        
        {/* Isometric Grid Floor */}
        <div className="absolute w-[380px] md:w-[500px] h-[380px] md:h-[500px] bg-grid-pattern opacity-[0.25] [transform:rotateX(90deg)_translateZ(-80px)] border border-white/5 rounded-full mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

        {/* 1. Main Analytics Dashboard (Central Card) */}
        <motion.div
          {...floatAnim(0, 8, 6.5)}
          className="absolute w-[300px] md:w-[380px] h-[220px] md:h-[280px] bg-glass border border-glass rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] p-5 flex flex-col justify-between"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-display text-xs md:text-sm font-bold text-white leading-none">School Portal</span>
                <span className="text-[8px] md:text-[10px] text-neutral-400">Literacy Progression</span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-mono text-green-400 bg-green-500/5 px-2 py-0.5 rounded-md border border-green-500/10">
              <ArrowUpRight className="w-3 h-3" />
              <span>+85% YoY</span>
            </span>
          </div>

          {/* Bar Graph Simulation */}
          <div className="flex-1 py-4 flex items-end justify-between gap-2.5 h-[100px]">
            {[
              { label: 'Q1', value: 'h-[25%]' },
              { label: 'Q2', value: 'h-[45%]' },
              { label: 'Q3', value: 'h-[60%]' },
              { label: 'Q4', value: 'h-[95%]', active: true },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full bg-white/5 rounded-t-lg overflow-hidden h-[90px] flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: bar.value.split('-')[1].replace('[', '').replace(']', '') }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                    className={`w-full rounded-t-lg bg-gradient-to-t ${
                      bar.active 
                        ? 'from-accent-orange to-accent-orange-glow shadow-[0_0_15px_rgba(255,107,0,0.3)]' 
                        : 'from-indigo-600 to-indigo-400'
                    }`}
                  />
                </div>
                <span className="font-mono text-[9px] text-neutral-400">{bar.label}</span>
              </div>
            ))}
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between text-[9px] md:text-[10px] border-t border-white/5 pt-3 text-neutral-400 font-mono">
            <span>Class Coverage: 98%</span>
            <span className="text-accent-orange-glow font-bold">Grade Average: A+</span>
          </div>
        </motion.div>

        {/* 2. Live Lecture Widget (Top-Right / Elevated) */}
        <motion.div
          {...floatAnim(1.8, 12, 5.5)}
          className="absolute w-[160px] md:w-[210px] bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_15px_30px_rgba(255,107,0,0.06)]"
          style={{ transform: 'translate3d(130px, -110px, 60px)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Presentation className="w-3.5 h-3.5 text-accent-orange" />
              <span className="text-[10px] md:text-xs font-semibold text-white font-display">Live Lecture</span>
            </div>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
          </div>

          <div className="text-left space-y-1">
            <div className="text-[9px] md:text-[11px] font-bold text-neutral-200 line-clamp-1">AI Agent Frameworks</div>
            <div className="text-[8px] md:text-[10px] text-neutral-400">Class: Grade 9-12</div>
          </div>

          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-white/5 text-[8px] md:text-[9px] text-neutral-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>+140 Active Learners</span>
          </div>
        </motion.div>

        {/* 3. Certificate Milestone (Left-Bottom / Forward) */}
        <motion.div
          {...floatAnim(0.8, 9, 4.8)}
          className="absolute w-[150px] md:w-[190px] bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          style={{ transform: 'translate3d(-140px, 100px, 80px)' }}
        >
          <div className="flex items-center gap-2 text-white mb-2.5">
            <div className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-accent-orange-glow">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[10px] md:text-xs font-semibold font-display">Certified Students</span>
          </div>

          <div className="text-left space-y-2">
            <div className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight leading-none">
              480+
            </div>
            <div className="flex items-center gap-1 text-[8px] md:text-[9px] text-neutral-400">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span>Accreditation Achieved</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Mini Schedule Card (Top-Left / Backward) */}
        <motion.div
          {...floatAnim(2.5, 6, 7)}
          className="absolute bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-[140px] md:w-[170px]"
          style={{ transform: 'translate3d(-130px, -110px, -30px)' }}
        >
          <div className="flex items-center gap-1.5 text-indigo-400 mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[9px] md:text-[10px] font-semibold text-white">Next Agenda</span>
          </div>
          
          <div className="space-y-1.5 text-left text-[8px] md:text-[9px]">
            <div className="border-l border-accent-orange pl-1.5 py-0.5">
              <div className="text-neutral-200 font-bold font-display">Prompt Lab 2</div>
              <span className="text-neutral-400 font-mono">10:00 AM</span>
            </div>
            <div className="border-l border-indigo-400 pl-1.5 py-0.5">
              <div className="text-neutral-200 font-bold font-display">Python Core</div>
              <span className="text-neutral-400 font-mono">02:30 PM</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PartnershipDashboard;
