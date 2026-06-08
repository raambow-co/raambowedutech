import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, FileText, Sparkles, Plus, AlertCircle, HelpCircle, Check, Users } from 'lucide-react';

const TeacherView = () => {
  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [courseCreated, setCourseCreated] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  // Mock quiz generator
  const [quizPrompt, setQuizPrompt] = useState('');
  const [generatedQuizText, setGeneratedQuizText] = useState('');
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    setCourseCreated(true);
    setTimeout(() => {
      setCourseCreated(false);
      setNewCourseName('');
    }, 2000);
  };

  const handleGenerateQuiz = (e) => {
    e.preventDefault();
    if (!quizPrompt.trim()) return;

    setIsGeneratingQuiz(true);
    setGeneratedQuizText('');

    setTimeout(() => {
      setIsGeneratingQuiz(false);
      setGeneratedQuizText(
        `Generated Quiz Questions:\n\n` +
        `**Q1: True or False - Attention mechanisms evaluate tokens in sequence.**\n` +
        `- Correct Answer: False (They process all tokens in parallel)\n\n` +
        `**Q2: Which vector queries the database relative to attention matrix?**\n` +
        `- A: Value Vector\n- B: Key Vector\n- C: Query Vector\n` +
        `- Correct Answer: C (Query Vector)`
      );
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Teacher Console</h2>
          <p className="text-xs text-slate-500 font-semibold">Author courses, upload lectures, and generate automatic AI quizzes</p>
        </div>
        
        <span className="bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
          Instructor Access
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'My Courses', value: '3 Active', desc: 'Generative AI, Python, Web Dev', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Active Students', value: '452 Active', desc: '+12% active this week', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Avg Course Rating', value: '4.85 / 5.0', desc: 'Based on 124 reviews', icon: Sparkles, color: 'text-amber-600 bg-amber-50' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-3.5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-1.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="font-display font-black text-base text-slate-800 block leading-none">{stat.value}</span>
              <span className="text-[10px] text-slate-400 block font-semibold mt-1">{stat.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 divide-x divide-slate-100 max-w-sm">
        {[
          { id: 'courses', name: 'Course Authoring' },
          { id: 'quiz', name: 'AI Quiz Generator' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex-1 py-2 text-center font-display text-xs font-bold transition-all cursor-pointer border-b-2 ${
              activeSubTab === tab.id 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab body */}
      <AnimatePresence mode="wait">
        
        {/* Course Authoring form */}
        {activeSubTab === 'courses' && (
          <motion.div 
            key="courses-form"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200/60 rounded-3xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] max-w-xl"
          >
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Plus className="w-4.5 h-4.5 text-indigo-600" /> Create a New Course
              </h3>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Course Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Prompt Chaining Architectures" 
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Target Difficulty</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold cursor-pointer text-xs">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Target Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 12 Hours" 
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-semibold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Upload fields */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <button 
                  type="button"
                  className="py-3.5 rounded-2xl border border-dashed border-slate-300 hover:border-indigo-500 text-slate-500 hover:text-indigo-600 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-5 h-5 text-slate-400" />
                  <span className="text-[10px] font-bold">Upload Lecture Video</span>
                </button>
                <button 
                  type="button"
                  className="py-3.5 rounded-2xl border border-dashed border-slate-300 hover:border-indigo-500 text-slate-500 hover:text-indigo-600 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span className="text-[10px] font-bold">Upload Lecture PDF</span>
                </button>
              </div>

              {/* Form Footer */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center bg-white">
                {courseCreated ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Course Created successfully!
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 leading-normal flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Courses go through automated platform sanity checks
                  </span>
                )}
                
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* AI Quiz Generator */}
        {activeSubTab === 'quiz' && (
          <motion.div 
            key="quiz-generator"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Input Form */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] h-fit">
              <form onSubmit={handleGenerateQuiz} className="space-y-4">
                <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-600" /> AI Auto Quiz Composer
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase block">Topic Prompt</label>
                    <textarea 
                      required
                      placeholder="e.g. Scaled dot-product attention formula in transformers vs query key correlations."
                      value={quizPrompt}
                      onChange={(e) => setQuizPrompt(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white outline-none focus:border-indigo-500 font-semibold resize-none h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase block">Number of MCQs</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-600 outline-none cursor-pointer">
                        <option>3 Questions</option>
                        <option>5 Questions</option>
                        <option>10 Questions</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase block">Difficulty Level</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-600 outline-none cursor-pointer">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isGeneratingQuiz}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  {isGeneratingQuiz ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 fill-indigo-400" />
                      Compose Quiz with AI
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Generated Quiz Output */}
            <div className="bg-slate-900 border border-slate-950 text-white rounded-3xl p-5 shadow-2xl flex flex-col justify-between min-h-[200px]">
              <div className="space-y-3.5 font-mono text-left text-xs">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block pb-2 border-b border-white/5">
                  Generated Output (Markdown Console)
                </span>
                
                {generatedQuizText ? (
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {generatedQuizText}
                  </pre>
                ) : (
                  <div className="text-slate-500 py-12 text-center flex flex-col items-center gap-2">
                    <HelpCircle className="w-8 h-8" />
                    <span>AI-generated quiz markdown content will output here...</span>
                  </div>
                )}
              </div>
              
              {generatedQuizText && (
                <button className="mt-4 px-4 py-2 bg-white text-slate-900 rounded-xl font-display text-xs font-black cursor-pointer shadow-sm self-end">
                  Add to Curriculum
                </button>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default TeacherView;
