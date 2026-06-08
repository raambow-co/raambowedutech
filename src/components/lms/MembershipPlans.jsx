import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Star, Lock, Zap, BookOpen, Award, Brain, Globe,
  Code2, ChevronRight, Sparkles, Shield, Clock
} from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';
import PaymentModal from './PaymentModal';

/* ─── PLANS DATA ─────────────────────────────────────────────── */
export const PLANS = [
  {
    id: 'starter',
    name: 'LMS Starter',
    emoji: '🚀',
    price: 499,
    badge: null,
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-700',
    duration: '6 Months Access',
    courses: [],
    courseCount: 1,
    includes: [
      '6 Months LMS Access',
      'Access to Any 1 Course',
      'Quizzes',
      'Certificates',
    ],
    cta: 'Choose Plan',
  },
  {
    id: 'pro',
    name: 'LMS Pro',
    emoji: '⭐',
    price: 899,
    badge: 'MOST POPULAR',
    color: 'from-orange-500 to-rose-600',
    lightColor: 'from-orange-50 to-rose-50',
    borderColor: 'border-orange-300',
    tagColor: 'bg-orange-100 text-orange-700',
    duration: '1 Year Access',
    courses: [],
    courseCount: 2,
    includes: [
      '1 Year LMS Access',
      'Access to Any 2 Courses',
      'Quizzes',
      'Assignments',
      'Certificates',
      'Priority Support',
    ],
    cta: 'Choose Plan',
  },
  {
    id: 'c_lang',
    name: 'C Language Course',
    emoji: '⚙️',
    price: 399,
    badge: null,
    color: 'from-slate-600 to-slate-800',
    lightColor: 'from-slate-50 to-slate-100',
    borderColor: 'border-slate-200',
    tagColor: 'bg-slate-100 text-slate-700',
    duration: 'Course Duration',
    courses: ['C Programming Masterclass'],
    courseCount: 1,
    includes: [
      'Complete C Language Course',
      'LMS Access During Course',
      'Assignments',
      'Quiz System',
      'Certificate',
    ],
    cta: 'Enroll Now',
  },
  {
    id: 'python',
    name: 'Python Programming',
    emoji: '🐍',
    price: 399,
    badge: null,
    color: 'from-yellow-500 to-green-600',
    lightColor: 'from-yellow-50 to-green-50',
    borderColor: 'border-green-200',
    tagColor: 'bg-green-100 text-green-700',
    duration: 'Course Duration',
    courses: ['Python Programming Masterclass'],
    courseCount: 1,
    includes: [
      'Complete Python Course',
      'LMS Access During Course',
      'Assignments',
      'Quizzes',
      'Certificate',
    ],
    cta: 'Enroll Now',
  },
  {
    id: 'gen_ai',
    name: 'Generative AI',
    emoji: '🤖',
    price: 399,
    badge: null,
    color: 'from-violet-500 to-purple-700',
    lightColor: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    tagColor: 'bg-violet-100 text-violet-700',
    duration: 'Course Duration',
    courses: ['Generative AI Fundamentals'],
    courseCount: 1,
    includes: [
      'Complete Gen AI Course',
      'LMS Access During Course',
      'Quizzes',
      'Certificate',
    ],
    cta: 'Enroll Now',
  },
  {
    id: 'web_dev',
    name: 'Web App Development',
    emoji: '🌐',
    price: 399,
    badge: null,
    color: 'from-cyan-500 to-blue-600',
    lightColor: 'from-cyan-50 to-blue-50',
    borderColor: 'border-cyan-200',
    tagColor: 'bg-cyan-100 text-cyan-700',
    duration: 'Course Duration',
    courses: ['Advanced Web Development'],
    courseCount: 1,
    includes: [
      'Complete Web Dev Course',
      'LMS Access During Course',
      'Projects',
      'Quizzes',
      'Certificate',
    ],
    cta: 'Enroll Now',
  },
];

/* ─── PLAN CARD ──────────────────────────────────────────────── */
const PlanCard = ({ plan, onSelect, index }) => {
  const isPopular = plan.badge === 'MOST POPULAR';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`relative flex flex-col rounded-2xl border-2 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isPopular ? 'border-orange-400 shadow-lg shadow-orange-100 ring-2 ring-orange-200' : plan.borderColor + ' shadow-sm'
      }`}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <span className="px-4 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-b-xl">
            ⭐ {plan.badge}
          </span>
        </div>
      )}

      {/* Header gradient strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`} />

      <div className="p-5 flex flex-col flex-1 gap-4 pt-6">
        {/* Icon + Name */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-2xl block mb-1">{plan.emoji}</span>
            <h3 className="font-display font-black text-base text-slate-900 leading-tight">{plan.name}</h3>
            <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${plan.tagColor}`}>
              <Clock className="w-2.5 h-2.5" />
              {plan.duration}
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 font-semibold">₹</span>
            <span className="font-display font-black text-3xl text-slate-900">{plan.price}</span>
            <p className="text-[9px] text-slate-400 font-semibold">+ GST</p>
          </div>
        </div>

        {/* Includes */}
        <ul className="space-y-2 flex-1">
          {plan.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shrink-0`}>
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </span>
              <span className="text-xs text-slate-600 font-medium leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSelect(plan)}
          className={`w-full py-2.5 rounded-xl font-display font-black text-sm text-white bg-gradient-to-r ${plan.color} shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5`}
        >
          {plan.cta}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const MembershipPlans = ({ user, onPaymentSuccess, onLogout }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-sans">

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100">
            <img src={raambowLogo} alt="RaamBow" className="h-6 w-9 object-contain" />
          </div>
          <span className="font-display font-black text-sm text-slate-900">RaamBow <span className="font-light text-slate-400">LMS</span></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-semibold hidden sm:block">
            Logged in as <span className="text-slate-800 font-black">{user?.name}</span>
          </span>
          <button onClick={onLogout} className="text-[10px] text-slate-400 hover:text-slate-700 font-bold cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Welcome hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-3"
        >
          {/* Lock banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Activate a membership plan to unlock learning access</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
            Welcome to RaamBow AI Academy 🎉
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            You're one step away from accessing your learning dashboard.
            <br className="hidden sm:block" />
            Choose a plan to activate your LMS access.
          </p>

          {/* Locked features preview */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {['Dashboard', 'Courses', 'Quizzes', 'Assignments', 'Certificates', 'Projects'].map((f) => (
              <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-500">
                <Lock className="w-2.5 h-2.5" /> {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="mb-6">
          <h2 className="font-display font-black text-lg text-slate-800 mb-1">Choose Your Plan</h2>
          <p className="text-xs text-slate-500 font-semibold">All prices include 18% GST. Instant activation after payment.</p>
        </div>

        {/* Top 2 featured plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {PLANS.slice(0, 2).map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="relative flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Or enroll in individual courses</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* 4 course plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.slice(2).map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} index={i + 2} />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400"
        >
          {[
            { icon: Shield, text: 'Secure Payments via Razorpay' },
            { icon: Zap, text: 'Instant Access After Payment' },
            { icon: Award, text: 'Industry-Recognized Certificates' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs font-semibold">
              <Icon className="w-4 h-4" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            user={user}
            onClose={() => setSelectedPlan(null)}
            onSuccess={() => {
              const now = new Date();
              let validUntil = new Date(now);
              if (selectedPlan.id === 'starter') validUntil.setMonth(validUntil.getMonth() + 6);
              else if (selectedPlan.id === 'pro') validUntil.setFullYear(validUntil.getFullYear() + 1);
              else validUntil.setMonth(validUntil.getMonth() + 3);

              onPaymentSuccess({
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                courses: selectedPlan.courses.length > 0 ? selectedPlan.courses : ['Choose Your Course'],
                validUntil: validUntil.toISOString(),
                activatedAt: now.toISOString(),
                justActivated: true,
              });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MembershipPlans;
