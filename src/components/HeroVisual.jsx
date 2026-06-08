import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Code, Users, Sparkles, Database, Check, Laptop } from 'lucide-react';


const HeroVisual = ({ type = 'ai' }) => {
  // Infinite floating animation configurations
  const floatAnimation = (delay = 0, yOffset = 10, duration = 5) => ({
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
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[500px] lg:h-[600px] flex items-center justify-center [perspective:1200px] overflow-visible select-none">
      
      {/* Central Holographic Base Glow */}
      <div className="absolute w-[280px] md:w-[400px] h-[280px] md:h-[400px] rounded-full bg-radial from-accent-orange/15 to-transparent blur-[60px] md:blur-[80px] z-0 animate-pulse-glow" />

      {/* Main 3D Container with Rotation */}
      <div className="relative w-full h-full flex items-center justify-center transform [transform-style:preserve-3d] rotate-x-[20deg] rotate-y-[-24deg] scale-[0.62] sm:scale-[0.8] md:scale-[0.9] lg:scale-100">
        
        {/* Holographic Floor Grid */}
        <div className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-grid-pattern opacity-[0.25] [transform:rotateX(90deg)_translateZ(-80px)] border border-white/5 rounded-full mask-[radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

        {/* 1. Main Laptop / Console Interface Card */}
        <motion.div
          {...floatAnimation(0, 8, 6)}
          className="absolute w-[280px] md:w-[380px] h-[200px] md:h-[260px] bg-glass border border-glass rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 md:p-5 flex flex-col justify-between overflow-hidden"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-linear-to-b from-white/0 via-accent-orange/[0.02] to-white/0 pointer-events-none animate-scanline" />
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 opacity-75 animate-pulse" />
            </div>
            {type === 'c' ? (
              <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono">
                <span className="px-2 py-0.5 rounded-t bg-white/10 text-white border-t border-x border-white/10 flex items-center gap-1">
                  <Code className="w-3 h-3 text-accent-orange" /> main.c
                </span>
                <span className="px-2 py-0.5 rounded-t text-neutral-500 flex items-center gap-1">
                  <Code className="w-3 h-3" /> script.py
                </span>
              </div>
            ) : type === 'python' ? (
              <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono">
                <span className="px-2 py-0.5 rounded-t text-neutral-500 flex items-center gap-1">
                  <Code className="w-3 h-3" /> main.c
                </span>
                <span className="px-2 py-0.5 rounded-t bg-white/10 text-white border-t border-x border-white/10 flex items-center gap-1">
                  <Code className="w-3 h-3 text-indigo-400" /> script.py
                </span>
              </div>
            ) : type === 'web' ? (
              <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono">
                <span className="px-2 py-0.5 rounded-t bg-white/10 text-white border-t border-x border-white/10 flex items-center gap-1">
                  <Code className="w-3 h-3 text-indigo-400" /> index.html
                </span>
                <span className="px-2 py-0.5 rounded-t text-neutral-500 flex items-center gap-1">
                  <Code className="w-3 h-3" /> styles.css
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-400 font-mono">
                <Cpu className="w-3.5 h-3.5 text-accent-orange animate-spin-slow" />
                <span>model_server_v2.py</span>
              </div>
            )}
          </div>

          {/* Simulated Code Execution */}
          {type === 'c' ? (
            <div className="flex-1 font-mono text-[9px] md:text-xs text-left text-neutral-300 py-3 space-y-0.5">
              <div className="text-indigo-400">#include &lt;stdio.h&gt;</div>
              <div className="text-neutral-400">// Learning C programming</div>
              <div>
                <span className="text-blue-400">int</span> <span className="text-white">main() &#123;</span>
              </div>
              <div className="pl-3 text-accent-orange-glow">printf("Hello College!\n");</div>
              <div className="pl-3 text-neutral-300">for(int i=0; i&lt;5; i++) &#123;</div>
              <div className="pl-6 text-indigo-300">// building logic...</div>
              <div className="pl-3">&#125;</div>
              <div>&#125;</div>
              <div className="text-green-400 flex items-center gap-1 text-[9px] md:text-[10px] mt-1 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                <span>$ gcc main.c && ./a.out → Hello College! [Success]</span>
              </div>
            </div>
          ) : type === 'python' ? (
            <div className="flex-1 font-mono text-[9px] md:text-xs text-left text-neutral-300 py-3 space-y-0.5">
              <div className="text-neutral-400"># Python OOP Basics</div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400">class</span> <span className="text-white">Student:</span>
              </div>
              <div className="pl-3 text-indigo-400">def __init__(self, name):</div>
              <div className="pl-6 text-accent-orange-glow">self.name = name</div>
              <div className="pl-6 text-neutral-300">self.ready = True</div>
              <div className="pt-1">s1 = Student("Aarav")</div>
              <div>print(f"&#123;s1.name&#125; ready!")</div>
              <div className="text-green-400 flex items-center gap-1 text-[9px] md:text-[10px] mt-1 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                <span>$ python script.py → Aarav ready! [Success]</span>
              </div>
            </div>
          ) : type === 'web' ? (
            <div className="flex-1 font-mono text-[9px] md:text-xs text-left text-neutral-300 py-3 space-y-0.5">
              <div className="text-neutral-450">&lt;!-- Web Development --&gt;</div>
              <div className="text-indigo-400">&lt;div id="app" class="premium"&gt;</div>
              <div className="pl-3 text-neutral-300">&lt;header&gt;</div>
              <div className="pl-6 text-accent-orange-glow">&lt;h1&gt;RaamBow EdTech&lt;/h1&gt;</div>
              <div className="pl-3">&lt;/header&gt;</div>
              <div className="pl-3 text-indigo-400">&lt;main&gt;React App Active&lt;/main&gt;</div>
              <div>&lt;/div&gt;</div>
              <div className="text-green-400 flex items-center gap-1 text-[9px] md:text-[10px] mt-1 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                <span>$ npm run dev → Local: http://localhost:5173</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 font-mono text-[10px] md:text-xs text-left text-neutral-300 py-3 space-y-1">
              <div className="text-indigo-400">import raambow_ai as rb</div>
              <div className="text-neutral-400"># Initializing local model pipeline...</div>
              <div className="flex items-center gap-1">
                <span className="text-neutral-500">&gt;&gt;</span>
                <span className="text-accent-orange-glow">model = rb.StudentCore()</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-500">&gt;&gt;</span>
                <span className="text-white">model.train(skills=['AI_Usage', 'Prompting'])</span>
              </div>
              <div className="text-green-400 flex items-center gap-1 text-[9px] md:text-[11px] mt-1 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                <span>Output: Creativity unlocked (+40%)</span>
              </div>
            </div>
          )}

          {/* Footer UI status */}
          <div className="flex items-center justify-between text-[9px] md:text-[11px] text-neutral-400 border-t border-white/5 pt-2.5">
            {type === 'c' ? (
              <>
                <span>COMPILER: GCC 11.2</span>
                <span className="text-accent-orange">STATUS: CLEAN BUILD</span>
              </>
            ) : type === 'python' ? (
              <>
                <span>INTERPRETER: PYTHON 3.10</span>
                <span className="text-accent-orange">STATUS: ACTIVE</span>
              </>
            ) : type === 'web' ? (
              <>
                <span>BUNDLER: VITE 6.0</span>
                <span className="text-accent-orange">SERVER: ACTIVE</span>
              </>
            ) : (
              <>
                <span>EPOCH 10/10</span>
                <span className="text-accent-orange">ACCURACY: 99.8%</span>
              </>
            )}
          </div>
        </motion.div>

        {/* 2. Floating AI Assistant Widget (Top-Right / Elevated) */}
        <motion.div
          {...floatAnimation(1.5, 12, 5.5)}
          className="absolute w-[160px] md:w-[220px] bg-glass border border-glass rounded-xl p-3 md:p-4 shadow-[0_15px_35px_rgba(255,107,0,0.08)] flex items-center gap-3"
          style={{ transform: 'translate3d(120px, -110px, 60px)' }}
        >
          {type === 'c' ? (
            <>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                <Code className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] md:text-xs text-neutral-400 font-medium">C Language</div>
                <div className="text-xs md:text-sm font-semibold font-display text-white font-bold">Pointers & Memory</div>
                <div className="flex items-center gap-1 mt-1 text-[8px] md:text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  <span>Syntax Mastered</span>
                </div>
              </div>
            </>
          ) : type === 'python' ? (
            <>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-accent-orange shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                <Cpu className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] md:text-xs text-neutral-400 font-medium">Python Basics</div>
                <div className="text-xs md:text-sm font-semibold font-display text-white font-bold">OOPs & Logic</div>
                <div className="flex items-center gap-1 mt-1 text-[8px] md:text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
                  <span>Scripts Running</span>
                </div>
              </div>
            </>
          ) : type === 'web' ? (
            <>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                <Laptop className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] md:text-xs text-neutral-400 font-medium">Web Dev</div>
                <div className="text-xs md:text-sm font-semibold font-display text-white font-bold">HTML, CSS & React</div>
                <div className="flex items-center gap-1 mt-1 text-[8px] md:text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  <span>Dev Server Online</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center text-accent-orange-glow shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                <Brain className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] md:text-xs text-neutral-400 font-medium">Core Intelligence</div>
                <div className="text-xs md:text-sm font-semibold font-display text-white">Active Prompting</div>
                {/* Pulsing Orange Dot */}
                <div className="flex items-center gap-1 mt-1 text-[8px] md:text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
                  <span>AI Agent Active</span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* 3. Students / Teams Activity widget (Left-Bottom / Forward) */}
        <motion.div
          {...floatAnimation(0.8, 10, 4.8)}
          className="absolute w-[150px] md:w-[190px] bg-glass border border-glass rounded-xl p-3 md:p-4 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
          style={{ transform: 'translate3d(-140px, 90px, 90px)' }}
        >
          {type === 'c' ? (
            <>
              <div className="flex items-center gap-2 text-white mb-2">
                <Code className="w-4 h-4 text-accent-orange" />
                <span className="text-[10px] md:text-xs font-semibold font-display">C Memory</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">Memory Safe</span>
                  <span className="text-accent-orange font-mono">Yes</span>
                </div>
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">Pointers</span>
                  <span className="text-green-400 font-mono">Verified</span>
                </div>
              </div>
            </>
          ) : type === 'python' ? (
            <>
              <div className="flex items-center gap-2 text-white mb-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] md:text-xs font-semibold font-display">Python Modules</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">OOPs Basics</span>
                  <span className="text-accent-orange font-mono">Passed</span>
                </div>
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">Structures</span>
                  <span className="text-green-400 font-mono">100% OK</span>
                </div>
              </div>
            </>
          ) : type === 'web' ? (
            <>
              <div className="flex items-center gap-2 text-white mb-2">
                <Laptop className="w-4 h-4 text-accent-orange" />
                <span className="text-[10px] md:text-xs font-semibold font-display">Web Sandbox</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">HTML Grid</span>
                  <span className="text-accent-orange font-mono">Responsive</span>
                </div>
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <span className="text-neutral-300">HMR Reload</span>
                  <span className="text-green-400 font-mono">0.1s Fast</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-white mb-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] md:text-xs font-semibold font-display">Active Learners</span>
              </div>

              <div className="space-y-2">
                {/* Student 1 */}
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-accent-orange to-red-500 flex items-center justify-center font-display font-bold text-[8px] text-white">S1</div>
                    <span className="text-neutral-300">Aarav K.</span>
                  </div>
                  <span className="text-accent-orange font-mono">102 XP</span>
                </div>
                {/* Student 2 */}
                <div className="flex items-center justify-between text-[9px] md:text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-display font-bold text-[8px] text-white">S2</div>
                    <span className="text-neutral-300">Priya N.</span>
                  </div>
                  <span className="text-green-400 font-mono">Completed</span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* 4. Skills Stats Glass Pill (Top-Left / Backward) */}
        <motion.div
          {...floatAnimation(2.2, 7, 7)}
          className="absolute bg-glass border border-glass rounded-full px-3 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex items-center gap-2"
          style={{ transform: 'translate3d(-130px, -120px, -20px)' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-orange-glow animate-pulse" />
          <span className="text-[9px] md:text-[10px] font-mono font-medium text-neutral-300">
            {type === 'c' ? (
              <>
                C Accuracy: <span className="text-white font-bold">99.1%</span>
              </>
            ) : type === 'python' ? (
              <>
                Python Logic: <span className="text-white font-bold">98.5%</span>
              </>
            ) : type === 'web' ? (
              <>
                UI Accuracy: <span className="text-white font-bold">100%</span>
              </>
            ) : (
              <>
                Skills Score: <span className="text-white font-bold">1,820</span>
              </>
            )}
          </span>
        </motion.div>

        {/* 5. Minimalist Holographic Projection Card (Behind Core Screen) */}
        <motion.div
          {...floatAnimation(1, 5, 8)}
          className="absolute w-[220px] md:w-[300px] h-[120px] md:h-[160px] bg-indigo-500/[0.02] border border-indigo-500/10 rounded-2xl p-4 flex flex-col justify-end"
          style={{ transform: 'translate3d(30px, 40px, -120px)' }}
        >
          <div className="text-left space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-400/80">
              <Database className="w-3.5 h-3.5" />
              <span className="text-[9px] md:text-[11px] font-mono">
                {type === 'c' ? "Stack Memory Allocation" : type === 'python' ? "Heap Memory Allocation" : type === 'web' ? "DOM Render Pipeline" : "Neural Weight Mapping"}
              </span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-accent-orange to-indigo-500 h-full rounded-full"
                animate={{ width: type !== 'ai' ? ['15%', '90%', '40%', '95%', '15%'] : ['20%', '85%', '50%', '95%', '20%'] }}
                transition={{ duration: type !== 'ai' ? 12 : 15, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between text-[8px] md:text-[9px] text-neutral-500">
              {type === 'c' ? (
                <>
                  <span>Stack Frame: 0x7ffd</span>
                  <span>Compiler: GCC</span>
                </>
              ) : type === 'python' ? (
                <>
                  <span>Heap Range: 0x8ffb</span>
                  <span>Env: Python 3</span>
                </>
              ) : type === 'web' ? (
                <>
                  <span>Frame Nodes: 120</span>
                  <span>Engine: V8</span>
                </>
              ) : (
                <>
                  <span>L1 Nodes: 4,096</span>
                  <span>Optimizer: AdamW</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Glowing holographic decorative connection lines */}
        <svg className="absolute w-full h-full pointer-events-none z-[-1]" style={{ transform: 'translateZ(-50px)' }}>
          {/* Animated path representing energy flows in classroom */}
          <motion.path
            d="M 50,150 Q 150,100 250,180 T 450,120"
            fill="none"
            stroke="url(#gradient-line)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,107,0,0.1)" />
              <stop offset="50%" stopColor="rgba(255,107,0,0.8)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0.2)" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
};

export default HeroVisual;
