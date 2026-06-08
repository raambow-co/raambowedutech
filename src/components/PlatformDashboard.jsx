import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Trophy, Settings, BarChart2, Award, Sparkles, Cpu, Play } from 'lucide-react';

const PlatformDashboard = () => {
  // Infinite floating animation
  const floatAnim = (delay = 0, yOffset = 8, duration = 6.5) => ({
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
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[580px] flex items-center justify-center [perspective:1200px] overflow-visible select-none">
      
      {/* Background Glows */}
      <div className="absolute w-[320px] md:w-[480px] h-[320px] md:h-[480px] rounded-full bg-radial from-blue-500/10 to-transparent blur-[90px] md:blur-[110px] z-0 animate-pulse-slow" />
      <div className="absolute w-[220px] md:w-[320px] h-[220px] md:h-[320px] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[60px] md:blur-[80px] z-0 animate-pulse-slow" style={{ animationDelay: '3.5s' }} />

      {/* 3D Transform Container */}
      <div className="relative w-full h-full flex items-center justify-center transform [transform-style:preserve-3d] rotate-x-[15deg] rotate-y-[-18deg] scale-[0.62] sm:scale-[0.8] md:scale-[0.9] lg:scale-100">
        
        {/* Isometric Grid Floor */}
        <div className="absolute w-[400px] md:w-[520px] h-[400px] md:h-[520px] bg-grid-pattern opacity-[0.25] [transform:rotateX(90deg)_translateZ(-80px)] border border-white/5 rounded-full mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

        {/* 1. Main LMS Dashboard (Central Screen) */}
        <motion.div
          {...floatAnim(0, 8, 6.8)}
          className="absolute w-[320px] md:w-[400px] h-[230px] md:h-[290px] bg-glass border border-glass rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] flex overflow-hidden"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Navigation Sidebar */}
          <div className="w-[50px] md:w-[60px] border-r border-white/5 bg-black/10 flex flex-col items-center py-4 gap-4">
            <div className="w-8 h-8 rounded-lg bg-accent-orange/15 border border-accent-orange/30 flex items-center justify-center text-accent-orange-glow">
              <span className="font-display font-extrabold text-xs">R</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-3.5 pt-4 text-neutral-500">
              <LayoutDashboard className="w-4.5 h-4.5 text-accent-orange" />
              <BookOpen className="w-4.5 h-4.5 hover:text-white transition-colors" />
              <Trophy className="w-4.5 h-4.5 hover:text-white transition-colors" />
              <BarChart2 className="w-4.5 h-4.5 hover:text-white transition-colors" />
            </div>

            <Settings className="w-4.5 h-4.5 text-neutral-500 hover:text-white transition-colors" />
          </div>

          {/* Main Dashboard Panel */}
          <div className="flex-1 p-4 md:p-5 flex flex-col justify-between text-left">
            {/* Header / Student Welcome */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div>
                <h4 className="font-display font-bold text-xs md:text-sm text-white">Hi, Kabir! 👋</h4>
                <p className="text-[8px] md:text-[9px] text-neutral-400">Master Level: 12</p>
              </div>
              <span className="font-mono text-[8px] md:text-[9px] text-accent-orange bg-accent-orange/5 px-2 py-0.5 rounded-full border border-accent-orange/10">
                1,200 XP
              </span>
            </div>

            {/* Course Progress Section */}
            <div className="space-y-2 py-3">
              <div className="flex justify-between items-center text-[9px] md:text-[10px] text-neutral-300">
                <span>AI Prompt Engineering v2</span>
                <span className="font-bold text-accent-orange-glow">78%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-accent-orange to-indigo-500 h-full rounded-full w-[78%]" />
              </div>
            </div>

            {/* Modules Check List */}
            <div className="space-y-1.5 flex-1 pt-1">
              <div className="flex items-center justify-between text-[8px] md:text-[9px] text-neutral-400 bg-white/[0.01] border border-white/5 px-2 py-1.5 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>Module 1: Prompt Basics</span>
                </span>
                <span className="text-green-400 font-bold">Passed</span>
              </div>
              <div className="flex items-center justify-between text-[8px] md:text-[9px] text-neutral-300 bg-white/[0.03] border border-white/10 px-2 py-1.5 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                  <span>Module 2: Advanced Variables</span>
                </span>
                <span className="text-accent-orange-glow font-bold flex items-center gap-0.5">
                  <Play className="w-2 h-2 fill-accent-orange-glow" /> Resume
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Floating Analytics line graph widget (Top-Right / Elevated) */}
        <motion.div
          {...floatAnim(1.8, 10, 5.8)}
          className="absolute w-[160px] md:w-[210px] bg-glass border border-glass rounded-2xl p-4 shadow-[0_15px_30px_rgba(99,102,241,0.08)]"
          style={{ transform: 'translate3d(140px, -110px, 60px)' }}
        >
          <div className="flex items-center justify-between mb-3 text-white">
            <span className="text-[10px] md:text-xs font-semibold font-display">Study Analytics</span>
            <span className="text-[8px] md:text-[9px] text-indigo-400 font-mono">Weekly</span>
          </div>

          {/* SVG Line Graph */}
          <div className="h-[45px] w-full flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="glow-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ff6b00" />
                </linearGradient>
              </defs>
              <path
                d="M 5,35 Q 25,10 45,28 T 85,5"
                fill="none"
                stroke="url(#glow-line-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Dot on target */}
              <circle cx="85" cy="5" r="2.5" fill="#ff9e00" />
            </svg>
          </div>

          <div className="flex justify-between text-[8px] md:text-[9px] text-neutral-400 mt-2 font-mono">
            <span>MON</span>
            <span>WED</span>
            <span>SUN</span>
          </div>
        </motion.div>

        {/* 3. Achievements Badge Case (Left-Bottom / Forward) */}
        <motion.div
          {...floatAnim(0.8, 12, 5)}
          className="absolute w-[150px] md:w-[190px] bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          style={{ transform: 'translate3d(-140px, 100px, 90px)' }}
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 text-white">
            <span className="text-[10px] md:text-xs font-semibold font-display">Recent Badges</span>
            <span className="text-[8px] md:text-[9px] text-accent-orange font-bold font-mono">+3</span>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-accent-orange-glow">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* 4. Interactive Learning Sandbox (Top-Left / Backward) */}
        <motion.div
          {...floatAnim(2.8, 6, 7.5)}
          className="absolute bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.3)] w-[140px] md:w-[170px]"
          style={{ transform: 'translate3d(-140px, -110px, -30px)' }}
        >
          <span className="text-[8px] font-mono font-bold text-indigo-400 uppercase block mb-1">Interactive</span>
          <div className="text-[9px] md:text-[10px] font-bold text-white mb-2 leading-tight">AI Sandbox Enabled</div>
          <button className="w-full py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-[8px] font-mono text-neutral-300 transition-colors">
            Initialize Sandbox
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default PlatformDashboard;
