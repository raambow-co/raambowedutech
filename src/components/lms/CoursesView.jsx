import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, Lock, Sparkles, X, ChevronRight } from 'lucide-react';

const CoursesView = ({ onStartLearning }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');

  const mockCourses = [
    {
      id: 'gen-ai',
      name: 'Generative AI Fundamentals',
      duration: '12 Hours',
      progress: 72,
      courseProgress: 90,
      difficulty: 'Beginner',
      thumbnail: '⚡',
      paid: true
    },
    {
      id: 'python',
      name: 'Python Programming Masterclass',
      duration: '18 Hours',
      progress: 54,
      courseProgress: 80,
      difficulty: 'Intermediate',
      thumbnail: '🐍',
      paid: true
    },
    {
      id: 'web-dev',
      name: 'Advanced Web Development',
      duration: '24 Hours',
      progress: 0,
      courseProgress: 100,
      difficulty: 'Advanced',
      thumbnail: '💻',
      paid: false
    },
    {
      id: 'c-prog',
      name: 'C Programming',
      duration: '30 Hours',
      progress: 0,
      courseProgress: 75,
      difficulty: 'Advanced',
      thumbnail: '📊',
      paid: false
    }
  ];

  // Search Filter
  const filteredCourses = mockCourses.filter((course) => {
    if (searchQuery && !course.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAction = (course) => {
    if (course.paid) {
      onStartLearning(course);
    } else {
      setSelectedCourseName(course.name);
      setShowUpgradeModal(true);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Active Courses</h2>
          <p className="text-xs text-slate-500 font-semibold">Resume your learning or unlock new technical tracks</p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search active courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[240px] pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white focus:bg-white text-xs outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all font-semibold"
          />
          <Search className="absolute left-3.5 top-[11px] w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <motion.div 
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white border rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col justify-between group transition-all duration-300 relative ${
                course.paid 
                  ? 'border-slate-200/60 hover:border-indigo-500/20 hover:shadow-indigo-500/5' 
                  : 'border-slate-200/40 bg-slate-50/20'
              }`}
            >
              
              {/* Lock watermark overlay for unpaid courses */}
              {!course.paid && (
                <div className="absolute top-4 right-4 bg-slate-100 border border-slate-200 p-2 rounded-xl text-slate-400 z-10">
                  <Lock className="w-4 h-4" />
                </div>
              )}

              {/* Course Header Banner */}
              <div className="p-6 flex items-start justify-between border-b border-slate-100">
                <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                      course.difficulty === 'Beginner' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                        : course.difficulty === 'Intermediate' 
                          ? 'bg-amber-50 border-amber-200 text-amber-600' 
                          : 'bg-rose-50 border-rose-200 text-rose-600'
                    }`}>
                      {course.difficulty}
                    </span>
                    
                    {!course.paid && (
                      <span className="bg-amber-50 border border-amber-200 text-amber-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase leading-none">
                        LOCKED
                      </span>
                    )}
                  </div>

                  <h3 className={`font-display font-black text-base tracking-tight pt-1 ${
                    course.paid 
                      ? 'text-slate-800 group-hover:text-indigo-600 transition-colors' 
                      : 'text-slate-500'
                  }`}>
                    {course.name}
                  </h3>
                </div>
                
                {/* Visual Thumbnail */}
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shadow-inner shrink-0 ${
                  course.paid ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}>
                  {course.thumbnail}
                </div>
              </div>

              {/* Course Meta Info */}
              <div className="p-6 space-y-4 flex-grow">
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    10 Modules
                  </span>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {/* Your Progress */}
                  {course.paid && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Your Progress</span>
                        <span className="font-black font-mono text-slate-700">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            course.progress === 100 
                              ? 'bg-emerald-500' 
                              : 'bg-indigo-500'
                          }`} 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </div>
                  )}

                  {/* Course Syllabus Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Course Syllabus</span>
                      <span className="font-black font-mono text-slate-500">
                        {course.courseProgress}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          !course.paid 
                            ? 'bg-slate-200' 
                            : 'bg-orange-400'
                        }`} 
                        style={{ width: `${course.courseProgress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end">
                <button
                  onClick={() => handleAction(course)}
                  className={`px-5 py-2.5 rounded-xl font-display text-xs font-black transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                    !course.paid
                      ? 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/10'
                  }`}
                >
                  {!course.paid ? 'Unlock Course' : 'Resume Learning'}
                  {!course.paid ? <Lock className="w-3.5 h-3.5 ml-1" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <h3 className="font-display font-black text-base text-slate-800">No courses matching search query</h3>
        </div>
      )}

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

              <div className="space-y-1">
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

export default CoursesView;
