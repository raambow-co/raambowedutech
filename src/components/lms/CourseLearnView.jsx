import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Circle, Play, Pause, ChevronRight, ChevronDown, 
  Download, ClipboardList, BookOpen, X, Terminal
} from 'lucide-react';

const CourseLearnView = ({ course, onBack }) => {
  const courseData = course || {
    id: 'gen-ai',
    name: 'Generative AI Fundamentals',
    progress: 72,
    courseProgress: 90
  };

  // Mock Modules and Lessons
  const [curriculum, setCurriculum] = useState([
    {
      id: 'mod1',
      title: 'Module 1: Introduction to GenAI',
      lessons: [
        { id: 'l1', title: '1.1 What is Generative AI?', duration: '8:45', completed: true },
        { id: 'l2', title: '1.2 History of Neural Networks', duration: '14:20', completed: true },
        { id: 'l3', title: '1.3 Transformers & Self-Attention', duration: '22:15', completed: false }
      ]
    },
    {
      id: 'mod2',
      title: 'Module 2: Prompt Engineering',
      lessons: [
        { id: 'l4', title: '2.1 Anatomy of a Prompt', duration: '11:30', completed: false },
        { id: 'l5', title: '2.2 Zero-Shot vs Few-Shot Learning', duration: '15:40', completed: false },
        { id: 'l6', title: '2.3 System Prompts & Safety Guidelines', duration: '18:10', completed: false }
      ]
    }
  ]);

  const [activeLesson, setActiveLesson] = useState(curriculum[0].lessons[2]); // 1.3 is active
  const [expandedModules, setExpandedModules] = useState({ mod1: true, mod2: true });

  // Custom Video Player Mock State
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35); // 35% viewed

  // Tabs under Video
  const [activeTab, setActiveTab] = useState('notes');
  const [notesText, setNotesText] = useState('Type your personal study notes here during the lesson...');

  // Lesson Completion Dialog Popup
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleLessonSelect = (lesson) => {
    setActiveLesson(lesson);
    setIsPlaying(false);
    setVideoProgress(0);
  };

  const handleLessonComplete = () => {
    // Mark completed
    setCurriculum(curriculum.map(mod => ({
      ...mod,
      lessons: mod.lessons.map(l => l.id === activeLesson.id ? { ...l, completed: true } : l)
    })));
    setShowCompletionPopup(true);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] -m-4 sm:-m-6 md:-m-8 bg-slate-50 relative overflow-hidden text-left font-sans">
      
      {/* 1. LEFT COLUMN: Curriculum Outline Sidebar */}
      <aside className="w-full lg:w-[280px] bg-white border-r border-slate-200/60 flex flex-col h-1/3 lg:h-full shrink-0">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 space-y-3 shrink-0">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Courses
          </button>
          
          <div className="space-y-2.5">
            <h3 className="font-display font-black text-sm text-slate-800 leading-tight truncate">
              {courseData.name}
            </h3>
            
            {/* Your Progress */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Your Progress</span>
                <span className="font-black font-mono text-slate-700">
                  {courseData.progress || 72}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full" 
                  style={{ width: `${courseData.progress || 72}%` }} 
                />
              </div>
            </div>

            {/* Course Syllabus Progress */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Course Syllabus</span>
                <span className="font-black font-mono text-slate-500 font-bold">
                  {courseData.courseProgress || 90}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-400 rounded-full" 
                  style={{ width: `${courseData.courseProgress || 90}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Lessons List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
          {curriculum.map((mod) => (
            <div key={mod.id} className="space-y-1">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 font-display text-xs font-black text-slate-700 text-left cursor-pointer"
              >
                <span className="truncate">{mod.title}</span>
                {expandedModules[mod.id] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              <AnimatePresence>
                {expandedModules[mod.id] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2 space-y-0.5"
                  >
                    {mod.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                            isActive 
                              ? 'bg-indigo-50/80 text-indigo-600 border border-indigo-200/30' 
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                          }`}
                        >
                          <span className="shrink-0">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300" />
                            )}
                          </span>
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span className="text-[9px] text-slate-400 font-mono font-normal">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. CENTER PANEL: Video Player & Tabs */}
      <div className="flex-1 flex flex-col h-2/3 lg:h-full overflow-y-auto border-r border-slate-200/60 bg-white">
        
        {/* Lesson Title header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Active Lesson</span>
            <h2 className="font-display font-black text-base text-slate-800 leading-tight mt-0.5">{activeLesson.title}</h2>
          </div>
          
          <button 
            onClick={handleLessonComplete}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-display text-xs font-black shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer flex items-center gap-1 shrink-0"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Complete Lesson
          </button>
        </div>

        {/* Video Player & Tabs Area */}
        <div className="p-6 space-y-6">
          
          {/* Custom Video Player Container */}
          <div className="relative w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-md group border border-slate-950 flex items-center justify-center select-none">
            
            {/* Pulsing indicator if not playing */}
            {!isPlaying && (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute z-20 w-16 h-16 rounded-full bg-white/95 text-indigo-600 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-6 h-6 fill-indigo-600 ml-1" />
              </button>
            )}

            {/* Simulated Video Frame Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950/20 to-slate-950 opacity-40 z-0 pointer-events-none" />
            
            {/* Visual simulation content */}
            <div className="absolute text-center z-10 flex flex-col items-center gap-1.5 p-6 pointer-events-none">
              <span className="text-4xl">⚡</span>
              <h4 className="font-display font-black text-sm text-white/90 uppercase tracking-widest">{activeLesson.title}</h4>
              <p className="text-[10px] text-white/60 font-mono">Lecture stream sandbox simulation active</p>
            </div>

            {/* Video Player Overlay Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4.5 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 z-10 opacity-90 transition-opacity">
              {/* Progress Slider */}
              <div 
                className="w-full h-1 bg-white/20 hover:h-1.5 rounded-full overflow-hidden cursor-pointer transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(newProgress);
                }}
              >
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${videoProgress}%` }} />
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-indigo-400 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <span className="text-[10px] font-mono text-slate-300">
                    {Math.floor((videoProgress / 100) * 15)}:00 / 15:00
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                  <button className="hover:text-white cursor-pointer">1.0x Speed</button>
                  <button className="hover:text-white cursor-pointer">HD</button>
                </div>
              </div>
            </div>

          </div>

          {/* Tab Menu under Player */}
          <div className="space-y-4">
            
            {/* Tab switch buttons */}
            <div className="flex border-b border-slate-200 divide-x divide-slate-100">
              {[
                { id: 'notes', name: 'Personal Notes', icon: ClipboardList },
                { id: 'resources', name: 'Downloads & Resources', icon: Download },
                { id: 'sandbox', name: 'Sandbox Terminal', icon: Terminal },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-display text-xs font-bold transition-all cursor-pointer border-b-2 ${
                      isActive 
                        ? 'border-indigo-600 text-indigo-600 bg-slate-50/20' 
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl min-h-[140px]">
              {activeTab === 'notes' && (
                <textarea 
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full bg-transparent outline-none border-none text-xs text-slate-600 font-semibold leading-relaxed resize-none h-24"
                />
              )}

              {activeTab === 'resources' && (
                <div className="space-y-2.5 text-left">
                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200/40 rounded-xl">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Lecture PDF Handouts</span>
                        <span className="text-[9px] text-slate-400 font-mono">Size: 4.8 MB</span>
                      </div>
                    </div>
                    <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 border border-slate-200/60 rounded-xl cursor-pointer">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-200/40 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4.5 h-4.5 text-indigo-500" />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Prompt Chains Cheatsheet</span>
                        <span className="text-[9px] text-slate-400 font-mono">Size: 1.2 MB</span>
                      </div>
                    </div>
                    <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 border border-slate-200/60 rounded-xl cursor-pointer">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'sandbox' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-slate-900 text-emerald-400 rounded-xl p-3.5 border border-slate-950">
                    <span className="text-slate-500 block"># Python Transformers Attention Sandbox</span>
                    <span className="text-indigo-400">import</span> numpy <span className="text-indigo-400">as</span> np<br />
                    <span className="text-indigo-400">def</span> <span className="text-blue-400">softmax</span>(x):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-400">return</span> np.exp(x) / np.sum(np.exp(x), axis=-1)<br />
                    <span className="text-slate-400">&gt;&gt;&gt; softmax([1.2, 0.9, 0.1])</span><br />
                    <span className="text-yellow-400">[0.47, 0.35, 0.18]</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black cursor-pointer shadow-sm">
                    Execute Script
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* --- LESSON COMPLETION AI POPUP MODAL --- */}
      <AnimatePresence>
        {showCompletionPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setShowCompletionPopup(false)} />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative z-10 w-full max-w-sm text-center space-y-4"
            >
              <button 
                onClick={() => setShowCompletionPopup(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto shadow-inner">
                ✅
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-black text-base text-slate-800">Lesson Completed!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Congratulations on finishing this lecture.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={() => setShowCompletionPopup(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  Continue to Next Lesson
                </button>
                <button 
                  onClick={() => { setShowCompletionPopup(false); onBack(); }}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-display text-xs font-black cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  Return to Course Modules
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CourseLearnView;
