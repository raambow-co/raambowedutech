import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, BookOpen, CreditCard, Sparkles, Shield, BarChart3, 
  ArrowUpRight, Plus, HelpCircle, ChevronRight, ArrowDownRight
} from 'lucide-react';

const AdminView = () => {
  const [activeSubTab, setActiveSubTab] = useState('analytics');

  const adminStats = [
    { label: 'Active Students', value: '1,240', change: '+12%', isUp: true, icon: Users, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Verified Instructors', value: '14', change: '+2', isUp: true, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Total Revenue', value: '$14,240', change: '+18%', isUp: true, icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
    { label: 'AI Requests', value: '45,820', change: '+24%', isUp: true, icon: Sparkles, color: 'text-purple-600 bg-purple-50' }
  ];

  const studentList = [
    { name: 'Adityaa Sharma', email: 'adityaa@example.com', school: 'IIT Madras', course: 'Generative AI', progress: '72%' },
    { name: 'Siddharth Mehta', email: 'sid@example.com', school: 'Bits Pilani', course: 'Generative AI', progress: '90%' },
    { name: 'Elena Rostova', email: 'elena@gmail.com', school: 'Stanford Univ', course: 'Python Masterclass', progress: '54%' }
  ];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Admin Console</h2>
          <p className="text-xs text-slate-500">Manage students, payments, courses, and verify platform health metrics</p>
        </div>
        
        <span className="bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
          System Admin Access
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-1.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2 leading-none">
                <span className="font-display font-black text-lg text-slate-900">{stat.value}</span>
                <span className={`text-[9px] font-extrabold flex items-center ${
                  stat.isUp ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtab selection */}
      <div className="flex border-b border-slate-200 divide-x divide-slate-100 max-w-md">
        {[
          { id: 'analytics', name: 'Platform Analytics' },
          { id: 'students', name: 'Manage Students' },
          { id: 'payments', name: 'Payment Logs' }
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

      {/* Subtab content */}
      <AnimatePresence mode="wait">
        
        {activeSubTab === 'analytics' && (
          <motion.div 
            key="analytics-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Revenue Analytics Chart */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <span className="font-display font-black text-xs text-slate-800">Weekly Active Users</span>
                <span className="text-[10px] text-indigo-600 font-extrabold">+14% Growth</span>
              </div>

              {/* SVG Line Graph */}
              <div className="h-[140px] w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <path 
                    d="M 5,38 Q 20,25 35,30 T 65,12 T 95,5" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  <circle cx="95" cy="5" r="2.5" fill="#f97316" />
                </svg>
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-mono font-bold">
                <span>MON</span>
                <span>WED</span>
                <span>FRI</span>
                <span>SUN</span>
              </div>
            </div>

            {/* AI Requests Analytics Chart */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <span className="font-display font-black text-xs text-slate-800">AI Usage Analysis (API Calls)</span>
                <span className="text-[10px] text-purple-600 font-extrabold">Peak: 4.2k/hr</span>
              </div>

              {/* SVG Line Graph */}
              <div className="h-[140px] w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <path 
                    d="M 5,35 Q 20,10 35,28 T 65,8 T 95,12" 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  <circle cx="95" cy="12" r="2.5" fill="#a855f7" />
                </svg>
              </div>

              <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-mono font-bold">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeSubTab === 'students' && (
          <motion.div 
            key="students-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]"
          >
            <div className="divide-y divide-slate-100">
              {studentList.map((stud, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 font-black text-[10px]">
                      {stud.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-slate-800 block">{stud.name}</span>
                      <span className="text-[10px] text-slate-400 block">{stud.email}</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Institution</span>
                    <span className="text-slate-600 block">{stud.school}</span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Course Active</span>
                    <span className="text-slate-600 block">{stud.course}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Progress</span>
                    <span className="text-indigo-600 block font-bold">{stud.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'payments' && (
          <motion.div 
            key="payments-panel"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]"
          >
            <div className="divide-y divide-slate-100">
              {[
                { id: 'tx-102', user: 'Adityaa S.', amount: '$199', date: 'Jun 05, 2026', method: 'Razorpay UPI', status: 'completed' },
                { id: 'tx-101', user: 'Siddharth M.', amount: '$199', date: 'Jun 04, 2026', method: 'Razorpay Card', status: 'completed' }
              ].map((tx, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-slate-800 block">Course Enrollment Sub</span>
                    <span className="text-[10px] text-slate-400 block font-mono">TX-ID: {tx.id} • User: {tx.user}</span>
                  </div>
                  
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Method</span>
                    <span className="text-slate-600 block">{tx.method}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Date</span>
                    <span className="text-slate-600 block">{tx.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-800 font-bold block">{tx.amount}</span>
                    <span className="text-emerald-600 text-[10px] font-bold block uppercase">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default AdminView;
