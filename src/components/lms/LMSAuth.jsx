import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User, Phone, Eye, EyeOff, Sparkles,
  Trophy, ChevronRight, CheckCircle2, AlertCircle, ArrowLeft, MapPin, ArrowRight
} from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';
import sasiLogo from '../../assets/sasi_logo.png';
import dpsLogo from '../../assets/dps_logo.png';
import kendriyaLogo from '../../assets/kendriya_logo.png';
import navodayaLogo from '../../assets/navodaya_logo.png';
import amritaLogo from '../../assets/amrita_logo.png';
import vitLogo from '../../assets/vit_logo.png';
import iitLogo from '../../assets/iit_logo.png';

/* ─── DATA ─────────────────────────────────────────────────── */
const SCHOOLS = [
  { id: 'dps', name: 'Delhi Public School', short: 'DPS', location: 'R.K. Puram, New Delhi', state: 'Delhi', logo: dpsLogo },
  { id: 'kv', name: 'Kendriya Vidyalaya', short: 'KV', location: 'Sector 8, R.K. Puram, New Delhi', state: 'Delhi', logo: kendriyaLogo },
  { id: 'jnv', name: 'Jawahar Navodaya Vidyalaya', short: 'JNV', location: 'Navodaya Campus, Lucknow', state: 'Uttar Pradesh', logo: navodayaLogo },
  { id: 'rb_school', name: 'RaamBow School of AI', short: 'RBSAI', location: 'Gachibowli, Hyderabad', state: 'Telangana', logo: raambowLogo },
  { id: 'xavier', name: "St. Xavier's High School", short: 'SXHS', location: 'Dhobi Talao, Mumbai', state: 'Maharashtra', logo: null },
  { id: 'sai_bal', name: 'Saraswati Bal Mandir Senior Secondary', short: 'SBM', location: 'Karol Bagh, New Delhi', state: 'Delhi', logo: null },
];

const COLLEGES = [
  { id: 'sasi', name: 'Sasi Institute of Technology & Engineering', short: 'SITE', location: 'Tadepalligudem, West Godavari', state: 'Andhra Pradesh', logo: sasiLogo },
  { id: 'vit', name: 'VIT – Vellore Institute of Technology', short: 'VIT', location: 'Katpadi, Vellore', state: 'Tamil Nadu', logo: vitLogo },
  { id: 'amrita', name: 'Amrita Vishwa Vidyapeetham', short: 'AVV', location: 'Ettimadai, Coimbatore', state: 'Tamil Nadu', logo: amritaLogo },
  { id: 'iit', name: 'Indian Institute of Technology Madras', short: 'IIT-M', location: 'Adyar, Chennai', state: 'Tamil Nadu', logo: iitLogo },
  { id: 'bits', name: 'Birla Institute of Technology & Science', short: 'BITS', location: 'Pilani, Jhunjhunu', state: 'Rajasthan', logo: null },
  { id: 'nit_w', name: 'NIT Warangal', short: 'NITW', location: 'Warangal', state: 'Telangana', logo: null },
];

/* ─── PLACEHOLDER AVATAR (when no logo) ─────────────────────── */
const InitialAvatar = ({ text, colorClass }) => (
  <div className={`w-full h-full rounded-xl flex items-center justify-center font-black text-sm ${colorClass}`}>
    {text}
  </div>
);

const AVATAR_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
];

/* ─── INSTITUTION CARD ───────────────────────────────────────── */
const InstitutionCard = ({ item, selected, onSelect, colorIdx }) => {
  const isSelected = selected?.id === item.id;
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`relative w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-200'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/60 hover:shadow-sm'
      }`}
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-slate-100 bg-white p-0.5 shadow-sm">
        {item.logo
          ? <img src={item.logo} alt={item.name} className="w-full h-full object-contain rounded-lg" />
          : <InitialAvatar text={item.short} colorClass={AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]} />
        }
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-black text-xs text-slate-800 leading-tight truncate">{item.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="text-[9px] text-slate-400 font-semibold truncate">{item.location}</span>
        </div>
        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-md bg-slate-100 text-[7px] font-extrabold text-slate-500 uppercase tracking-wide">{item.state}</span>
      </div>

      {/* Check */}
      {isSelected && (
        <span className="shrink-0 text-indigo-600">
          <CheckCircle2 className="w-4 h-4 fill-indigo-50" />
        </span>
      )}
    </button>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const LMSAuth = ({ onLoginSuccess, onBackToLanding }) => {
  // ── Step: 'type' | 'institution' | 'form'
  const [step, setStep] = useState('type');
  const [accessType, setAccessType] = useState(null); // 'external' | 'school' | 'college'
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // Form state
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* ── Navigation ──────────────────────────────────────────── */
  const handleAccessTypeNext = () => {
    if (!accessType) return;
    setError('');
    if (accessType === 'external') {
      setStep('form');
    } else {
      setStep('institution');
    }
  };

  const handleInstitutionNext = () => {
    if (!selectedInstitution) return;
    setError('');
    setStep('form');
  };

  const handleBack = () => {
    setError('');
    setSuccess('');
    if (step === 'form') {
      if (accessType === 'external') {
        setStep('type');
        setAccessType(null);
      } else {
        setStep('institution');
      }
    } else if (step === 'institution') {
      setStep('type');
      setSelectedInstitution(null);
    }
  };

  /* ── Submit handlers ──────────────────────────────────────── */
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Signed in successfully! Opening LMS Portal…');
      const school = selectedInstitution?.name || 'RaamBow Academy';
      setTimeout(() => {
        onLoginSuccess({ name: email.split('@')[0].toUpperCase(), email, phone: '+91 98765 43210', school, role: 'student', isNewUser: false });
      }, 1400);
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !password || !confirmPassword) { setError('Please fill in all required fields.'); return; }
    if (accessType === 'external' && !phone) { setError('Phone number is required.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Account created! Opening LMS Portal…');
      const school = selectedInstitution?.name || 'RaamBow Academy';
      setTimeout(() => {
        onLoginSuccess({ name: fullName, email, phone: phone || '+91 99999 88888', school, role: 'student', isNewUser: true });
      }, 1400);
    }, 1500);
  };

  /* ── Slide variants ───────────────────────────────────────── */
  const slideIn = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, transition: { duration: 0.3 } };
  const slideBack = { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 40 }, transition: { duration: 0.3 } };

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50 flex items-stretch font-sans text-slate-800">

      {/* Back to website */}
      <button
        onClick={onBackToLanding}
        className="absolute top-5 left-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm transition-all duration-200 font-semibold text-xs cursor-pointer group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to raambow.com
      </button>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">

        {/* ── LEFT PANEL ──────────────────────────────────────── */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-50/60 via-slate-50 to-orange-50/30 relative flex-col justify-between p-12 border-r border-slate-200/50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage:'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize:'28px 28px'}} />

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 shrink-0">
              <img src={raambowLogo} alt="RaamBow" className="h-8 w-12 object-contain" />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-slate-900">RaamBow <span className="font-light text-slate-400">LMS</span></span>
              <p className="text-[10px] text-indigo-600 font-mono tracking-wider uppercase font-bold">learn.raambow.com</p>
            </div>
          </div>

          {/* Mockup card */}
          <div className="relative my-auto flex flex-col items-center justify-center py-6 z-10">
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-[360px] bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_20px_40px_rgba(99,102,241,0.07)] space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">AD</div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-slate-800">Adityaa S.</h5>
                    <p className="text-[9px] text-slate-400">Level 8 · AI Prodigy</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Trophy className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[9px] text-amber-700 font-bold font-mono">1,820 XP</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="font-semibold text-slate-700 text-xs block">Generative AI Fundamentals</span>
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Your Progress</span>
                    <span className="font-black font-mono text-slate-700">72%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ delay: 0.7, duration: 1 }} className="h-full bg-indigo-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">Course Syllabus</span>
                    <span className="font-black font-mono text-slate-500">90%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 0.9, duration: 1 }} className="h-full bg-orange-400 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Learning Streak</span>
                  <span className="text-sm font-bold text-orange-500 flex items-center gap-1 mt-0.5">🔥 12 Days</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Certificates</span>
                  <span className="text-sm font-bold text-indigo-600 flex items-center gap-1 mt-0.5">🏅 3 Earned</span>
                </div>
              </div>
            </motion.div>

            <div className="text-center mt-6 space-y-1.5 max-w-[310px]">
              <h3 className="font-display font-bold text-base text-slate-800">Your portal to future-ready coding</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Gamified AI curricula, live sandboxes, date-wise quizzes and real certificates.</p>
            </div>
          </div>

          <div className="border-t border-slate-200/50 pt-4 text-[10px] text-slate-400 font-medium">
            © 2026 RaamBow Academy. All Rights Reserved.
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────── */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-start lg:justify-center px-5 sm:px-10 md:px-16 lg:px-20 bg-white relative py-14 overflow-y-auto">

          {/* Step indicator */}
          <div className="w-full max-w-[500px] mx-auto mb-5">
            <div className="flex items-center gap-2">
              {['type', 'institution', 'form'].map((s, i) => {
                const stepIndex = ['type', 'institution', 'form'].indexOf(step);
                const thisIndex = i;
                const active = thisIndex === stepIndex;
                const done = thisIndex < stepIndex;
                // Hide institution step bubble for external
                if (s === 'institution' && accessType === 'external') return null;
                return (
                  <React.Fragment key={s}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                      done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    {i < 2 && !(s === 'type' && accessType === 'external') && (
                      <div className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${done ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-[500px] mx-auto">

            <AnimatePresence mode="wait">

              {/* ══════════════════════════════════════════════
                  STEP 1 · CHOOSE ACCESS TYPE
              ══════════════════════════════════════════════ */}
              {step === 'type' && (
                <motion.div key="step-type" {...slideIn} className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">Welcome to RaamBow LMS</h2>
                    <p className="text-sm text-slate-500">Select the category that best describes you to get started.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'external',
                        icon: '👤',
                        title: 'External User',
                        subtitle: 'Individual learners enrolling directly through RaamBow AI Academy.',
                        tags: ['School Students', 'College Students', 'Professionals', 'Self Learners'],
                        color: 'from-blue-500 to-indigo-600',
                      },
                      {
                        id: 'school',
                        icon: '🏫',
                        title: 'School Partner Access',
                        subtitle: 'Students and staff of schools that have signed an MOU with RaamBow AI Academy.',
                        tags: ['School-specific courses', 'Institution dashboard', 'Group learning access'],
                        color: 'from-emerald-500 to-teal-600',
                      },
                      {
                        id: 'college',
                        icon: '🎓',
                        title: 'College Partner Access',
                        subtitle: 'Students and faculty from colleges that have an official partnership with RaamBow AI Academy.',
                        tags: ['College learning portal', 'Placement preparation', 'Campus-specific programs'],
                        color: 'from-orange-500 to-rose-600',
                      },
                    ].map((card) => {
                      const sel = accessType === card.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => setAccessType(card.id)}
                          className={`relative w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                            sel
                              ? 'border-indigo-500 bg-indigo-50/60 shadow-md ring-2 ring-indigo-200'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm'
                          }`}
                        >
                          {sel && <span className="absolute top-3 right-3 text-indigo-600"><CheckCircle2 className="w-4 h-4 fill-indigo-50" /></span>}

                          <span className={`text-2xl shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.color} shadow-md`}>
                            {card.icon}
                          </span>

                          <div className="flex-1 pr-5 space-y-1.5">
                            <h3 className="font-display font-black text-sm text-slate-800">{card.title}</h3>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{card.subtitle}</p>
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {card.tags.map((t, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded-md bg-slate-100/80 border border-slate-200/50 text-[7px] font-extrabold text-slate-500 uppercase tracking-wide">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={!accessType}
                    onClick={handleAccessTypeNext}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-display font-black text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* ══════════════════════════════════════════════
                  STEP 2 · SELECT INSTITUTION
              ══════════════════════════════════════════════ */}
              {step === 'institution' && (
                <motion.div key="step-institution" {...slideIn} className="space-y-4">
                  {/* Back */}
                  <button type="button" onClick={handleBack} className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-700 cursor-pointer transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <div className="space-y-0.5">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                      {accessType === 'school' ? '🏫 Select Your School' : '🎓 Select Your College'}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {accessType === 'school'
                        ? 'Choose your partner school to continue.'
                        : 'Choose your engineering college to continue.'}
                    </p>
                  </div>

                  {/* Search hint */}
                  <div className="grid grid-cols-1 gap-2.5 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
                    {(accessType === 'school' ? SCHOOLS : COLLEGES).map((item, idx) => (
                      <InstitutionCard
                        key={item.id}
                        item={item}
                        selected={selectedInstitution}
                        onSelect={setSelectedInstitution}
                        colorIdx={idx}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={!selectedInstitution}
                    onClick={handleInstitutionNext}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-display font-black text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {selectedInstitution ? `Continue with ${selectedInstitution.short}` : 'Select an institution'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* ══════════════════════════════════════════════
                  STEP 3 · LOGIN / SIGNUP FORM
              ══════════════════════════════════════════════ */}
              {step === 'form' && (
                <motion.div key="step-form" {...slideIn} className="space-y-5">
                  {/* Back */}
                  <button type="button" onClick={handleBack} className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-700 cursor-pointer transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  {/* Institution badge */}
                  {selectedInstitution && (
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/60">
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-white p-0.5 shrink-0">
                        {selectedInstitution.logo
                          ? <img src={selectedInstitution.logo} alt="" className="w-full h-full object-contain" />
                          : <InitialAvatar text={selectedInstitution.short} colorClass="bg-indigo-100 text-indigo-700" />
                        }
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-wider">{accessType === 'school' ? 'Partner School' : 'Partner College'}</p>
                        <p className="text-xs font-black text-slate-800 leading-tight">{selectedInstitution.name}</p>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <div className="space-y-0.5">
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                      {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {activeTab === 'login' ? 'Sign in to access your lessons and assignments.' : 'Get started with AI-first education.'}
                    </p>
                  </div>

                  {/* Login / Sign Up Tab */}
                  <div className="flex bg-slate-100 p-1 rounded-full relative border border-slate-200/40">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
                      className={`flex-1 text-center py-2.5 rounded-full font-display text-xs font-black transition-all duration-300 relative z-10 cursor-pointer ${activeTab === 'login' ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                    >Login</button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
                      className={`flex-1 text-center py-2.5 rounded-full font-display text-xs font-black transition-all duration-300 relative z-10 cursor-pointer ${activeTab === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                    >Sign Up</button>
                    <motion.div
                      className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md z-0"
                      animate={{ x: activeTab === 'login' ? '0%' : '100%' }}
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  </div>

                  {/* Alerts */}
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
                      </motion.div>
                    )}
                    {success && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" /><span>{success}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="space-y-3.5">
                    {activeTab === 'signup' && (
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Full Name</label>
                        <div className="relative">
                          <input type="text" required placeholder="Adityaa Sharma" value={fullName}
                            onChange={e => setFullName(e.target.value)} disabled={isLoading}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-semibold" />
                          <User className="absolute left-3.5 top-[11px] w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Email Address</label>
                      <div className="relative">
                        <input type="email" required placeholder="you@example.com" value={email}
                          onChange={e => setEmail(e.target.value)} disabled={isLoading}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-semibold" />
                        <Mail className="absolute left-3.5 top-[11px] w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    {activeTab === 'signup' && accessType === 'external' && (
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Phone Number</label>
                        <div className="relative">
                          <input type="tel" required placeholder="+91 98765 43210" value={phone}
                            onChange={e => setPhone(e.target.value)} disabled={isLoading}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-semibold" />
                          <Phone className="absolute left-3.5 top-[11px] w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    )}

                    {activeTab === 'login' ? (
                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Password</label>
                          <button type="button" className="text-[9px] font-extrabold text-indigo-600 hover:text-indigo-700 cursor-pointer">Forgot Password?</button>
                        </div>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={password}
                            onChange={e => setPassword(e.target.value)} disabled={isLoading}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm" />
                          <Lock className="absolute left-3.5 top-[11px] w-4 h-4 text-slate-400" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-[11px] text-slate-400 hover:text-slate-600 cursor-pointer">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Password</label>
                          <input type="password" required placeholder="••••••••" value={password}
                            onChange={e => setPassword(e.target.value)} disabled={isLoading}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-semibold" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Confirm</label>
                          <input type="password" required placeholder="••••••••" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} disabled={isLoading}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm font-semibold" />
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 text-white rounded-xl font-display text-sm font-extrabold shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60 ${
                        activeTab === 'login'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                          : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
                      }`}
                    >
                      {isLoading
                        ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <>{activeTab === 'login' ? 'Sign In' : 'Create Account'}<ChevronRight className="w-4 h-4" /></>
                      }
                    </button>

                    {/* Social login — External only */}
                    {accessType === 'external' && (
                      <>
                        <div className="relative flex py-1 items-center">
                          <div className="flex-grow border-t border-slate-200" />
                          <span className="flex-shrink mx-3 text-[9px] text-slate-400 uppercase font-black tracking-wider">Or Continue With</span>
                          <div className="flex-grow border-t border-slate-200" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsLoading(true);
                              setTimeout(() => {
                                setIsLoading(false);
                                onLoginSuccess({ name: 'ADITYAA', email: 'adityaa@google.com', phone: '+91 98765 43210', school: 'RaamBow Academy', role: 'student', isNewUser: false });
                              }, 1000);
                            }}
                            className="py-2 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs font-bold"
                          >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.1C18.281 1.944 15.495 1 12.24 1 5.922 1 1 5.922 1 12.24s4.922 11.24 11.24 11.24c6.6 0 11-4.636 11-11.24 0-.755-.083-1.33-.18-1.955H12.24z" /></svg>
                            Google
                          </button>
                          <button type="button" className="py-2 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs font-bold">
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23"><rect width="10" height="10" fill="#f25022" /><rect x="11" width="10" height="10" fill="#7fba00" /><rect y="11" width="10" height="10" fill="#00a1f1" /><rect x="11" y="11" width="10" height="10" fill="#ffb900" /></svg>
                            Microsoft
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LMSAuth;
