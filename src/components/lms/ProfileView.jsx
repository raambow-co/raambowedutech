import React from 'react';
import { User, Award, ShieldCheck, Flame, BookOpen, Clock, FileCheck } from 'lucide-react';

const ProfileView = ({ user, onNavigate }) => {
  const profileUser = user || {
    name: 'ADITYAA SHARMA',
    email: 'adityaa@example.com',
    phone: '+91 98765 43210',
    school: 'IIT Madras',
    role: 'student'
  };

  const badges = [
    { id: 'b1', icon: '⚡', name: 'Prompt Wizard', desc: 'Completed Advanced Prompt Chaining Modules' },
    { id: 'b2', icon: '🐍', name: 'Python Wrangler', desc: 'Submitted all Python loops assignments' },
    { id: 'b3', icon: '🤖', name: 'AI Apprentice', desc: 'Completed Generative AI Fundamentals Course' }
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* Profile Header card */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 text-3xl font-black shadow-inner shrink-0">
          {profileUser.name.substring(0, 2).toUpperCase()}
        </div>
        
        {/* User Details */}
        <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="font-display font-black text-xl text-slate-800 tracking-tight leading-none">
              {profileUser.name}
            </h2>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase leading-none">
              Level 8 AI Prodigy
            </span>
          </div>
          
          <p className="text-xs text-slate-400 font-semibold">{profileUser.email} • {profileUser.phone}</p>
          <p className="text-xs text-slate-500 font-bold">Institution: {profileUser.school}</p>
        </div>

        <button 
          onClick={() => onNavigate('settings')}
          className="px-4 py-2 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-slate-600 hover:text-indigo-600 rounded-xl font-display text-xs font-black cursor-pointer transition-all"
        >
          Edit Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Courses Completed', value: '1 Course', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Assignments Completed', value: '8 Sheets', icon: FileCheck, color: 'text-blue-600 bg-blue-50' },
          { label: 'Certificates Earned', value: '1 Certificate', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-1.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="font-display font-black text-sm text-slate-900 mt-4 leading-none">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Badges and Achievements */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="font-display font-black text-xs text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100 flex items-center gap-1.5">
          <Award className="w-4.5 h-4.5 text-indigo-600" /> Earned Achievement Badges
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-start gap-3.5 hover:border-indigo-200/30 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/60 flex items-center justify-center text-xl shadow-inner shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-0.5 text-left">
                <h4 className="font-display font-bold text-xs text-slate-800 leading-tight">{badge.name}</h4>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfileView;
