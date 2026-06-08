import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Upload, X } from 'lucide-react';

const AssignmentsView = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [assignments, setAssignments] = useState([
    { id: 'a1', name: 'Few-Shot Prompt Engineering Schemes', course: 'Generative AI', dueDate: 'Jun 12, 2026', status: 'pending', description: 'Design a prompt template that classifies sentiments of technical feedback logs.' },
    { id: 'a2', name: 'Python Loops & Recursion Algorithms', course: 'Python Masterclass', dueDate: 'Jun 15, 2026', status: 'pending', description: 'Create recursive functions to parse nested dictionary configurations.' },
    { id: 'a3', name: 'Responsive Flexbox Cards Grid', course: 'Advanced Web Dev', dueDate: 'Jun 05, 2026', status: 'reviewed', score: '95/100', description: 'Build an Apple-inspired responsive grid showing coding challenges.' },
    { id: 'a4', name: 'Binary Tree Inorder Traversal', course: 'C Programming', dueDate: 'Jun 02, 2026', status: 'completed', description: 'Implement non-recursive binary tree inorder traversal using stack.' }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (id) => {
    if (!selectedFile) return;
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: 'submitted' } : a));
    setUploadingId(null);
    setSelectedFile(null);
  };

  const filtered = assignments.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.status === activeFilter;
  });

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Assignments</h2>
        <p className="text-xs text-slate-500">Track and submit your course projects and task sheets</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/40 self-start max-w-sm">
        {['all', 'pending', 'submitted', 'reviewed', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`flex-1 text-center py-1.5 rounded-xl font-display text-xs font-bold capitalize transition-all cursor-pointer ${
              activeFilter === tab 
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/20' 
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-slate-300 transition-all duration-200"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  {item.course}
                </span>
                
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border flex items-center gap-1 ${
                  item.status === 'pending' 
                    ? 'bg-amber-50 border-amber-200 text-amber-600' 
                    : item.status === 'submitted'
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : item.status === 'reviewed'
                        ? 'bg-purple-50 border-purple-200 text-purple-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                }`}>
                  {item.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                  {item.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  {item.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-sm text-slate-800 leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-2xl">{item.description}</p>
              
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold font-mono">
                <Clock className="w-3.5 h-3.5" /> Due Date: {item.dueDate}
                {item.score && <span className="ml-3 text-indigo-600 font-black">Score: {item.score}</span>}
              </div>
            </div>

            {/* Submission buttons */}
            <div className="shrink-0 flex items-center">
              {item.status === 'pending' && (
                <div className="space-y-2 w-full sm:w-auto">
                  {uploadingId === item.id ? (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs">
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="text-[10px] font-semibold"
                      />
                      <button 
                        onClick={() => handleUploadSubmit(item.id)}
                        disabled={!selectedFile}
                        className="px-3 py-1 bg-indigo-600 disabled:bg-slate-200 text-white disabled:text-slate-400 text-[10px] font-black rounded-lg cursor-pointer"
                      >
                        Submit
                      </button>
                      <button 
                        onClick={() => { setUploadingId(null); setSelectedFile(null); }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setUploadingId(item.id)}
                      className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-display text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 w-full justify-center"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Assignment
                    </button>
                  )}
                </div>
              )}

              {item.status === 'submitted' && (
                <span className="text-[10px] text-slate-400 font-semibold italic flex items-center gap-1 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                  Waiting for instructor review
                </span>
              )}

              {item.status === 'reviewed' && (
                <button 
                  className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-display text-xs font-black cursor-pointer flex items-center gap-1 w-full justify-center"
                >
                  View Review Feedback <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}

              {item.status === 'completed' && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AssignmentsView;
