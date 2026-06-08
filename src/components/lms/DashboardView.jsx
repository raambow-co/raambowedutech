import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Trophy, Clock, FileCheck, ShieldCheck, Flame, 
  ChevronRight, Sparkles, CheckSquare, Square, RefreshCw, AlertCircle, Trash2,
  Lock, X
} from 'lucide-react';

const DashboardView = ({ onStartLearning, onNavigate }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');

  // Mock continue learning courses (registered/paid courses)
  const registeredCourses = [
    {
      id: 'gen-ai',
      name: 'Generative AI Fundamentals',
      instructor: 'Dr. Sarah Jenkins',
      duration: '12 Hours',
      progress: 72,
      courseProgress: 90,
      difficulty: 'Beginner',
      thumbnail: '⚡'
    },
    {
      id: 'python',
      name: 'Python Programming Masterclass',
      instructor: 'Prof. David Stone',
      duration: '18 Hours',
      progress: 54,
      courseProgress: 80,
      difficulty: 'Intermediate',
      thumbnail: '🐍'
    }
  ];

  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCourseIndex((prev) => (prev + 1) % registeredCourses.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Academic Course-based Tasks
  const [courseTasks, setCourseTasks] = useState([
    { id: 1, text: 'Complete Lesson 5: Large Language Models (Generative AI)', done: false },
    { id: 2, text: 'Take Quiz 2: Python Variable Scope (Python Programming)', done: true },
    { id: 3, text: 'Submit Assignment: Prompt Design Patterns (Generative AI)', done: false }
  ]);

  // Personal Custom Tasks
  const [personalTasks, setPersonalTasks] = useState([
    { id: 1, text: 'Revise pointers and memory structures for C classes', done: false },
    { id: 2, text: 'Schedule mock coding practice sessions', done: false }
  ]);

  const [newPersonalTask, setNewPersonalTask] = useState('');

  const toggleCourseTask = (id) => {
    setCourseTasks(courseTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const togglePersonalTask = (id) => {
    setPersonalTasks(personalTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addPersonalTask = (e) => {
    e.preventDefault();
    if (!newPersonalTask.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newPersonalTask,
      done: false
    };
    setPersonalTasks([...personalTasks, newTask]);
    setNewPersonalTask('');
  };

  const deletePersonalTask = (id) => {
    setPersonalTasks(personalTasks.filter(t => t.id !== id));
  };

  const statCards = [
    { label: 'Courses Enrolled', value: '4', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Certificates Earned', value: '1', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Assignments Submitted', value: '8', icon: FileCheck, color: 'text-purple-600 bg-purple-50' },
    { label: 'Quiz Accuracy', value: '88%', icon: Trophy, color: 'text-amber-600 bg-amber-50' },
    { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-600 bg-orange-50' }
  ];

  const coursesProgress = [
    { id: 'gen-ai', name: 'Generative AI Fundamentals', progress: 72, courseProgress: 90, color: 'bg-indigo-500', courseColor: 'bg-orange-400', paid: true },
    { id: 'python', name: 'Python Programming Masterclass', progress: 54, courseProgress: 80, color: 'bg-orange-500', courseColor: 'bg-indigo-400', paid: true },
    { id: 'web-dev', name: 'Advanced Web Development', progress: 0, courseProgress: 100, color: 'bg-blue-500', courseColor: 'bg-emerald-400', paid: false },
    { id: 'c-prog', name: 'C Programming', progress: 0, courseProgress: 75, color: 'bg-purple-500', courseColor: 'bg-amber-400', paid: false }
  ];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Top Welcome / Continue Course */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Welcome & Continued Learning (Left Col - spans 2) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-lg shadow-indigo-500/10 min-h-[200px]">
          {/* Abstract glows */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-32 h-32 rounded-full bg-orange-400/20 blur-xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="text-indigo-100 font-display text-xs font-black uppercase tracking-wider">RaamBow Academy</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-tight">
              Good Morning, Adityaa 👋
            </h2>
            <p className="text-xs text-indigo-100/80 max-w-md">
              Ready to learn? Here is your study checklist for today.
            </p>
          </div>

          <div className="mt-6 relative z-10 w-full overflow-hidden min-h-[125px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCourseIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/15 p-4.5 rounded-2xl w-full"
              >
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">CONTINUE LEARNING</span>
                    <span className="text-[9px] bg-orange-500 text-white font-black px-1.5 py-0.5 rounded leading-none">
                      {registeredCourses[currentCourseIndex].thumbnail} {registeredCourses[currentCourseIndex].difficulty}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white leading-tight">
                    {registeredCourses[currentCourseIndex].name}
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                    {/* Your Progress */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-indigo-200 font-bold uppercase">Your Progress:</span>
                      <div className="w-[80px] bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${registeredCourses[currentCourseIndex].progress}%` }} 
                        />
                      </div>
                      <span className="text-[9px] font-black text-white font-mono leading-none">
                        {registeredCourses[currentCourseIndex].progress}%
                      </span>
                    </div>

                    {/* Course Progress */}
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-indigo-200 font-bold uppercase">Syllabus:</span>
                      <div className="w-[80px] bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-300 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${registeredCourses[currentCourseIndex].courseProgress}%` }} 
                        />
                      </div>
                      <span className="text-[9px] font-black text-white font-mono leading-none">
                        {registeredCourses[currentCourseIndex].courseProgress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-center w-full sm:w-auto justify-between sm:justify-end">
                  {/* Slider manual arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentCourseIndex((prev) => (prev - 1 + registeredCourses.length) % registeredCourses.length);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10 text-base font-bold select-none"
                      title="Previous"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentCourseIndex((prev) => (prev + 1) % registeredCourses.length);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10 text-base font-bold select-none"
                      title="Next"
                    >
                      ›
                    </button>
                  </div>

                  <button 
                    onClick={() => onStartLearning(registeredCourses[currentCourseIndex])}
                    className="px-4.5 py-2.5 bg-white text-indigo-700 hover:bg-slate-50 font-display text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Continue Course
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-1.5 mt-2.5">
              {registeredCourses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCourseIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentCourseIndex === idx ? 'bg-orange-400 w-3' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Streak / Motivation Card (Right Col) */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-50 rounded-xl text-orange-500">
                <Flame className="w-5 h-5 fill-orange-500 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-slate-800">Learning Streak</h4>
                <p className="text-[10px] text-slate-400">Keep the flame burning!</p>
              </div>
            </div>
            <span className="text-xs font-black text-slate-900 font-mono">12 DAYS</span>
          </div>

          <div className="py-4 flex items-center justify-around">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
              const isFlame = idx < 5; // Monday to Friday active for demo
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${
                    isFlame 
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20' 
                      : 'bg-slate-50 text-slate-400 border border-slate-200/50'
                  }`}>
                    {isFlame ? '🔥' : day}
                  </div>
                  <span className="text-[8px] font-black text-slate-400 uppercase">{day}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
            <span className="text-[10px] text-slate-500 leading-normal font-semibold">
              You are in the **Top 5%** of learners this week! Complete today's tasks to earn +50 XP.
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/60 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="font-display font-black text-lg text-slate-900 mt-3.5 leading-none">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Core Dashboard Layout */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Course Progress & Today's Tasks */}
        <div className="space-y-6 flex flex-col">
          
          {/* Today's Tasks List */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-display font-black text-sm text-slate-800">Study Checklists</h3>
                <p className="text-[10px] text-slate-400">Complete tasks to increase streak & earn bonus XP</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-50 border border-indigo-200 text-indigo-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase leading-none font-mono">
                  Academic: {courseTasks.filter(t => t.done).length}/{courseTasks.length}
                </span>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase leading-none font-mono">
                  Personal: {personalTasks.filter(t => t.done).length}/{personalTasks.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Academic Tasks */}
              <div className="space-y-4">
                <h4 className="font-display font-black text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-indigo-500 rounded-sm"></span>
                  Academic (Registered Courses)
                </h4>
                
                <div className="space-y-2">
                  {courseTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleCourseTask(task.id)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-100 text-left cursor-pointer group"
                    >
                      <span className="mt-0.5 shrink-0">
                        {task.done ? (
                          <CheckSquare className="w-4.5 h-4.5 text-indigo-600 fill-indigo-50" />
                        ) : (
                          <Square className="w-4.5 h-4.5 text-slate-300 group-hover:text-slate-400" />
                        )}
                      </span>
                      <span className={`text-xs font-semibold leading-normal ${
                        task.done ? 'text-slate-400 line-through font-normal' : 'text-slate-700 group-hover:text-slate-900'
                      }`}>
                        {task.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Personal Tasks */}
              <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                <h4 className="font-display font-black text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-emerald-500 rounded-sm"></span>
                  Personal Tasks (Editable)
                </h4>

                {/* Input form */}
                <form onSubmit={addPersonalTask} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom task..."
                    value={newPersonalTask}
                    onChange={(e) => setNewPersonalTask(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-xs shrink-0 cursor-pointer"
                  >
                    + Add
                  </button>
                </form>

                {/* Tasks List */}
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {personalTasks.length > 0 ? (
                    personalTasks.map((task) => (
                      <div
                        key={task.id}
                        className="w-full flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-100 group"
                      >
                        <button
                          onClick={() => togglePersonalTask(task.id)}
                          className="flex items-start gap-3 text-left cursor-pointer flex-1 min-w-0"
                        >
                          <span className="mt-0.5 shrink-0">
                            {task.done ? (
                              <CheckSquare className="w-4.5 h-4.5 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Square className="w-4.5 h-4.5 text-slate-300 group-hover:text-slate-400" />
                            )}
                          </span>
                          <span className={`text-xs font-semibold leading-normal truncate ${
                            task.done ? 'text-slate-400 line-through font-normal' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
                            {task.text}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => deletePersonalTask(task.id)}
                          className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer p-1 rounded-lg hover:bg-rose-50"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-slate-400 text-xs italic">
                      No personal tasks yet. Add one above!
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Courses Progress Bars */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex-grow">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4.5">
              <div>
                <h3 className="font-display font-black text-sm text-slate-800">Course Progress Outline</h3>
                <p className="text-[10px] text-slate-400">Track progress across all your active curricula</p>
              </div>
              <button 
                onClick={() => onNavigate('courses')}
                className="text-indigo-600 hover:text-indigo-700 text-xs font-bold flex items-center gap-0.5 cursor-pointer"
              >
                View Courses <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesProgress.map((course, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/40 p-4 rounded-2xl space-y-3 text-left relative overflow-hidden group">
                  
                  {/* Blurry / dark content if not paid */}
                  <div className={!course.paid ? 'opacity-45 select-none pointer-events-none' : ''}>
                    <span className="font-display font-black text-xs text-slate-700 block">{course.name}</span>
                    
                    {/* Your Progress */}
                    {course.paid && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px] text-slate-400">
                          <span className="font-bold uppercase tracking-wider">Your Progress</span>
                          <span className="font-black text-slate-700 font-mono">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                            className={`h-full rounded-full ${course.color}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Course Progress */}
                    <div className="space-y-1 mt-3">
                      <div className="flex justify-between items-center text-[9px] text-slate-400">
                        <span className="font-bold uppercase tracking-wider">Course Syllabus</span>
                        <span className="font-black text-slate-700 font-mono">{course.courseProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200/60 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${course.courseProgress}%` }}
                          transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                          className={`h-full rounded-full ${course.courseColor}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lock / Unlock Overlay */}
                  {!course.paid && (
                    <div className="absolute inset-0 bg-slate-950/[0.04] hover:bg-slate-950/[0.08] transition-colors flex items-center justify-center p-3 z-10">
                      <button
                        onClick={() => {
                          setSelectedCourseName(course.name);
                          setShowUpgradeModal(true);
                        }}
                        className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl font-display text-[9px] font-black shadow-lg cursor-pointer transition-all flex items-center gap-1.5 active:scale-95 border border-white/10 hover:shadow-indigo-500/10"
                      >
                        <Lock className="w-3 h-3 text-orange-400 fill-orange-400" /> Unlock Course
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
        </div>
      </div>
    </div>

    {/* LOCK / SUBSCRIPTION UPGRADE MODAL */}
    <AnimatePresence>
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setShowUpgradeModal(false)} />
          
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative z-10 w-full max-w-sm text-center space-y-4"
          >
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-xl mx-auto shadow-inner">
              🔒
            </div>

            <div className="space-y-1 font-sans">
              <h3 className="font-display font-black text-base text-slate-800">Course Locked</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                The course **"{selectedCourseName}"** is part of the premium curriculum. 
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1.5">
                Unlock all 4 course tracks, daily coding sandbox tools, and AI study planners by upgrading your subscription.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 fill-indigo-400" />
                Upgrade Subscription
              </button>
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-display text-xs font-black cursor-pointer transition-all"
              >
                Contact Administration
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  </div>
);
};

export default DashboardView;
