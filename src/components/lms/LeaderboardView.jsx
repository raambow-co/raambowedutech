import React from 'react';
import { Trophy, Flame, Sparkles, Award, TrendingUp, ShieldAlert } from 'lucide-react';

const LeaderboardView = () => {
  const topLearners = [
    { rank: 1, name: 'Siddharth Mehta', xp: '2,450 XP', streak: '18 Days', badge: '🧙‍♂️ Prompt King', avatar: 'SM', color: 'from-yellow-400 via-amber-500 to-orange-500' },
    { rank: 2, name: 'Adityaa Sharma (You)', xp: '1,820 XP', streak: '12 Days', badge: '🤖 AI Prodigy', avatar: 'AS', active: true, color: 'from-slate-300 via-slate-400 to-slate-500' },
    { rank: 3, name: 'Elena Rostova', xp: '1,710 XP', streak: '15 Days', badge: '🐍 Python Sage', avatar: 'ER', color: 'from-amber-600 via-orange-600 to-amber-800' },
    { rank: 4, name: 'Kabir Ahmed', xp: '1,200 XP', streak: '9 Days', badge: '💻 Web Artisan', avatar: 'KA' },
    { rank: 5, name: 'Neelam K.', xp: '1,050 XP', streak: '6 Days', badge: '📊 Data Cadet', avatar: 'NK' }
  ];

  // Separate top 3 for the podium
  const rank1 = topLearners[0];
  const rank2 = topLearners[1];
  const rank3 = topLearners[2];
  const remainingLearners = topLearners.slice(3);

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">RaamBow Leaderboard</h2>
          <p className="text-xs text-slate-500 font-semibold">Compete with your peers, maintain your streaks, and earn premium ranks</p>
        </div>
        
        {/* Reset Indicator */}
        <div className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-[10px] font-black uppercase tracking-wider shrink-0">
          <TrendingUp className="w-3.5 h-3.5" />
          Resets in 2 Days
        </div>
      </div>

      {/* --- PREMIUM PODIUM STANDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8 pb-4">
        
        {/* 2nd Place (Left) */}
        <div className="order-2 md:order-1 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-600 text-lg shadow-md relative">
            {rank2.avatar}
            <span className="absolute -top-3 -right-1 bg-slate-400 border border-slate-200 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">2</span>
          </div>
          
          <div className="text-center mt-3 mb-4 space-y-0.5">
            <h4 className="font-display font-black text-sm text-slate-800">{rank2.name}</h4>
            <p className="text-[10px] text-indigo-500 font-bold uppercase">{rank2.badge}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 shadow-md rounded-2xl w-full p-5 text-center space-y-3 relative overflow-hidden h-[180px] flex flex-col justify-center">
            {/* Subtle Silver Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">XP SCORE</span>
              <span className="font-display font-black text-xl text-slate-700 block">{rank2.xp}</span>
              
              <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-orange-500 pt-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{rank2.streak}</span>
              </div>
            </div>
            <span className="relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2">SILVER PODIUM</span>
          </div>
        </div>

        {/* 1st Place (Center - Tallest) */}
        <div className="order-1 md:order-2 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-amber-50 border-4 border-amber-400 flex items-center justify-center font-bold text-amber-700 text-xl shadow-lg relative animate-pulse-glow">
            {rank1.avatar}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">👑</span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 border-2 border-white text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-black shadow-md">1</span>
          </div>
          
          <div className="text-center mt-4 mb-4 space-y-0.5">
            <h4 className="font-display font-black text-base text-slate-900 flex items-center justify-center gap-1">
              {rank1.name}
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
            </h4>
            <p className="text-[10px] text-amber-600 font-black uppercase tracking-wider">{rank1.badge}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 border-2 border-amber-300/60 shadow-xl rounded-3xl w-full p-6 text-center space-y-3 relative overflow-hidden h-[210px] flex flex-col justify-center group hover:scale-[1.02] transition-transform duration-300">
            {/* Sparkles glow */}
            <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-amber-300/10 blur-xl pointer-events-none" />
            
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest block">XP SCORE</span>
              <span className="font-display font-black text-2xl text-amber-700 block">{rank1.xp}</span>
              
              <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-orange-500 pt-1">
                <Flame className="w-4.5 h-4.5 fill-orange-500" />
                <span>{rank1.streak}</span>
              </div>
            </div>
            <span className="relative z-10 text-[9px] font-black text-amber-600 uppercase tracking-widest block mt-3">GOLD STAND</span>
          </div>
        </div>

        {/* 3rd Place (Right) */}
        <div className="order-3 md:order-3 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-600 flex items-center justify-center font-bold text-amber-800 text-lg shadow-md relative">
            {rank3.avatar}
            <span className="absolute -top-3 -right-1 bg-amber-700 border border-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">3</span>
          </div>
          
          <div className="text-center mt-3 mb-4 space-y-0.5">
            <h4 className="font-display font-black text-sm text-slate-800">{rank3.name}</h4>
            <p className="text-[10px] text-amber-700 font-bold uppercase">{rank3.badge}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 shadow-md rounded-2xl w-full p-5 text-center space-y-3 relative overflow-hidden h-[180px] flex flex-col justify-center">
            {/* Subtle Bronze Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-white pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">XP SCORE</span>
              <span className="font-display font-black text-xl text-slate-700 block">{rank3.xp}</span>
              
              <div className="flex items-center justify-center gap-1 font-mono text-xs font-bold text-orange-500 pt-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{rank3.streak}</span>
              </div>
            </div>
            <span className="relative z-10 text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2">BRONZE PODIUM</span>
          </div>
        </div>

      </div>

      {/* --- PERFORMANCE CALLOUT (Motivate Active User) --- */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shadow-inner shrink-0">
            🎯
          </div>
          <div>
            <h4 className="font-display font-black text-sm text-slate-800">You are in 2nd Place!</h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Earn **630 more XP** to catch up to Siddharth Mehta and claim the 1st place crown!
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => window.location.reload()} 
          className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-display text-xs font-black rounded-xl shadow-md cursor-pointer transition-all"
        >
          Complete More Quizzes
        </button>
      </div>

      {/* --- REMAINING RANKS LIST --- */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <span className="font-display font-black text-xs text-slate-800">Runner-Up Standings</span>
          <span className="text-[10px] text-slate-400 font-bold">Resets Weekly</span>
        </div>

        <div className="divide-y divide-slate-100">
          {remainingLearners.map((learner) => (
            <div 
              key={learner.rank}
              className="flex items-center gap-4 p-4.5 hover:bg-slate-50/50 transition-colors"
            >
              {/* Rank Position */}
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-black text-xs text-slate-600 shrink-0">
                {learner.rank}
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                {learner.avatar}
              </div>

              {/* Learner Name and Badge */}
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {learner.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{learner.badge}</span>
              </div>

              {/* Streak info */}
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-orange-500 shrink-0">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{learner.streak}</span>
              </div>

              {/* XP score */}
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black px-2.5 py-1.5 rounded-xl shrink-0">
                {learner.xp}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LeaderboardView;
