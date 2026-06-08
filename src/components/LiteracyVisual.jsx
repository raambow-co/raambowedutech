import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, CheckCircle2, Eye, Compass, Palette } from 'lucide-react';

const LiteracyVisual = () => {
  // Float helper for interactive animations
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
      
      {/* Ambient Glow Points */}
      <div className="absolute w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full bg-radial from-blue-500/10 to-transparent blur-[60px] md:blur-[90px] z-0 animate-pulse-slow" />
      <div className="absolute w-[250px] md:w-[350px] h-[250px] md:h-[350px] rounded-full bg-radial from-accent-orange/8 to-transparent blur-[50px] md:blur-[70px] z-0 animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {/* 3D Isometric View Container */}
      <div className="relative w-full h-full flex items-center justify-center transform [transform-style:preserve-3d] rotate-x-[18deg] rotate-y-[-18deg] scale-[0.62] sm:scale-[0.8] md:scale-[0.95] lg:scale-100">
        
        {/* Dark Grid Plate */}
        <div className="absolute w-[380px] md:w-[480px] h-[380px] md:h-[480px] bg-grid-pattern opacity-[0.25] [transform:rotateX(90deg)_translateZ(-90px)] border border-white/5 rounded-full mask-[radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

        {/* 1. Base Tablet Console (Main Board) */}
        <motion.div
          {...floatAnim(0, 8, 6)}
          className="absolute w-[300px] md:w-[380px] h-[220px] md:h-[270px] bg-glass border border-glass rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-5 flex flex-col justify-between"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display text-xs md:text-sm font-semibold text-white">Prompt Lab</span>
            </div>
            <span className="font-mono text-[9px] md:text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
              Active Session
            </span>
          </div>

          {/* User Prompt Simulation */}
          <div className="flex-grow py-3 flex flex-col justify-center text-left space-y-2">
            <div className="text-[10px] md:text-xs font-semibold text-neutral-400 font-mono">STUDENT PROMPT:</div>
            <div className="bg-navy-950/70 border border-white/5 p-2.5 rounded-xl text-[10px] md:text-xs text-neutral-200 italic font-sans leading-relaxed">
              "Create a model of water cycle and explain evaporation using metaphors..."
            </div>
            
            {/* AI response box */}
            <div className="flex items-start gap-2 pt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange-glow mt-1.5 animate-ping" />
              <div className="text-[9px] md:text-[11px] text-neutral-400">
                AI: Generating visual mapping for student learning...
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[9px] md:text-[10px] text-neutral-400 font-mono">
            <span>Progress: 92%</span>
            <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-accent-orange h-full rounded-full w-[92%]" />
            </div>
          </div>
        </motion.div>

        {/* 2. Floating AI Concept Box - Image Recognition (Top-Left / Elevated) */}
        <motion.div
          {...floatAnim(2, 10, 5)}
          className="absolute w-[150px] md:w-[190px] bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
          style={{ transform: 'translate3d(-130px, -110px, 50px)' }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <Eye className="w-4 h-4 text-accent-orange-glow" />
            <span className="text-[10px] md:text-xs font-semibold text-white font-display">Computer Vision</span>
          </div>
          
          {/* Simulation Box (Bounding box targetting item) */}
          <div className="relative aspect-video bg-gradient-to-tr from-blue-950/30 to-indigo-950/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center p-2">
            {/* Minimal mockup illustration */}
            <div className="w-8 h-8 rounded-md bg-navy-950 border border-indigo-500/10 flex items-center justify-center text-[10px] text-indigo-400 shadow-sm font-semibold">
              H₂O
            </div>
            
            {/* Animated target box overlay */}
            <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-accent-orange/60 rounded flex flex-col justify-between p-1">
              <div className="text-[7px] text-accent-orange-glow font-mono font-bold bg-navy-900/90 border border-white/5 px-1 py-0.5 rounded w-max">
                Water Molecule: 99.4%
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Floating Card - AI Ethics Validation Checklist (Bottom-Right / Forward) */}
        <motion.div
          {...floatAnim(1.2, 12, 5.5)}
          className="absolute w-[160px] md:w-[200px] bg-glass border border-glass rounded-2xl p-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
          style={{ transform: 'translate3d(140px, 100px, 80px)' }}
        >
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2 text-white">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] md:text-xs font-semibold font-display">Ethics Checker</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Plagiarism Checked</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Bias Check Passed</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
              <span>Source Cited Properly</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Creative AI Color Palette (Top-Right / Backward) */}
        <motion.div
          {...floatAnim(2.8, 6, 7)}
          className="absolute bg-glass border border-glass rounded-full px-4 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.2)] flex items-center gap-2.5"
          style={{ transform: 'translate3d(120px, -120px, -30px)' }}
        >
          <Palette className="w-4 h-4 text-pink-400" />
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-orange" />
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          </div>
          <span className="text-[9px] md:text-[10px] font-semibold text-neutral-300 font-mono">Creative Tool</span>
        </motion.div>

        {/* 5. Small floating Sparkle Badge (Left-Middle / Forward) */}
        <motion.div
          {...floatAnim(0.6, 9, 4.5)}
          className="absolute bg-gradient-to-r from-accent-orange to-accent-orange-glow text-white rounded-full p-2.5 shadow-lg shadow-accent-orange/25 flex items-center justify-center"
          style={{ transform: 'translate3d(-150px, 15px, 70px)' }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

      </div>
    </div>
  );
};

export default LiteracyVisual;
