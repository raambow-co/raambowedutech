import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';

const WelcomeScreen = ({ user, membership, onStartLearning }) => {
  const validUntil = new Date(membership.validUntil);
  const fmt = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 font-sans">
      {/* Dot grid bg */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top gradient strip */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-orange-400" />

        <div className="p-8 space-y-5 text-center">
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mx-auto"
          >
            <CheckCircle2 className="w-11 h-11 text-emerald-600" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-1.5">
            <h2 className="font-display font-black text-2xl text-slate-900">
              Welcome to RaamBow AI Academy 🚀
            </h2>
            <p className="text-sm text-slate-500">Membership Activated Successfully!</p>
          </motion.div>

          {/* Plan card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200/60 rounded-2xl p-4 text-left space-y-3"
          >
            <div className="flex items-center gap-2">
              <img src={raambowLogo} alt="" className="h-5 w-7 object-contain" />
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Active Plan</span>
            </div>
            <p className="font-display font-black text-lg text-slate-900 leading-tight">{membership.planName}</p>

            {membership.courses && membership.courses.length > 0 && membership.courses[0] !== 'Choose Your Course' && (
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Courses Unlocked
                </p>
                {membership.courses.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{c}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold pt-1 border-t border-indigo-200/50">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Membership valid until <span className="font-black text-slate-700">{fmt(validUntil)}</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            onClick={onStartLearning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-display font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-200 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Start Learning
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
