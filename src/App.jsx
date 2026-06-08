import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroVisual from './components/HeroVisual';
import BackgroundEffects from './components/BackgroundEffects';
import AILiteracySection from './components/AILiteracySection';
import ProgramsSection from './components/ProgramsSection';
import SchoolPartnershipSection from './components/SchoolPartnershipSection';
import OrganisationSection from './components/OrganisationSection';
import StatsBanner from './components/StatsBanner';
import PlatformSection from './components/PlatformSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import LMSAuth from './components/lms/LMSAuth';
import LMSLayout from './components/lms/LMSLayout';
import MembershipPlans from './components/lms/MembershipPlans';
import WelcomeScreen from './components/lms/WelcomeScreen';
import { auth, onAuthStateChanged, signOut } from './firebase';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // LMS State Management
  const [appMode, setAppMode] = useState('landing'); // 'landing' | 'auth' | 'plans' | 'lms'
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'teacher' | 'admin'
  const [userProfile, setUserProfile] = useState({
    name: 'ADITYAA SHARMA',
    email: 'adityaa@example.com',
    phone: '+91 98765 43210',
    school: 'IIT Madras',
    role: 'student'
  });
  // Membership: null = unpaid, object = paid/active
  const [membership, setMembership] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // wait for Firebase session check

  // ── Persist session: listen for Firebase auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && appMode === 'landing') {
        // User is already logged in from a previous session
        setUserProfile(prev => ({
          ...prev,
          name:  (firebaseUser.displayName || firebaseUser.email.split('@')[0]).toUpperCase(),
          email: firebaseUser.email,
          uid:   firebaseUser.uid,
        }));
        // Don't auto-redirect to LMS here — user chose to visit landing page
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Conditional early returns are moved below hooks to comply with React Rules of Hooks

  const slides = [
    {
      badge: '⚡ AI & Prompt Engineering',
      titleLine1: 'Build AI Later.',
      titleLine2: 'Learn To Use It Now.',
      subheading: 'Learn practical AI skills, prompting techniques, and creativity to become a future-ready digital creator.',
      primaryBtnText: 'Explore Programs',
      primaryBtnLink: '#programs',
      secondaryBtnText: 'LMS Login',
      secondaryBtnLink: '#partner',
      trustIndicators: ['AI Workshops', 'School Partnerships', 'Future Skills'],
      visualType: 'ai'
    },
    {
      badge: '⚡ College Coding Prep',
      titleLine1: 'Learn C Programming.',
      titleLine2: 'Before Entering College.',
      subheading: 'Master logical thinking, memory management, pointers, and data structures before your engineering college classes begin.',
      primaryBtnText: 'Explore Syllabus',
      primaryBtnLink: '#programs',
      secondaryBtnText: 'Start Learning',
      secondaryBtnLink: '#partner',
      trustIndicators: ['C Basics', 'Logic Building', 'Pointers & Memory'],
      visualType: 'c'
    },
    {
      badge: '⚡ Beginner Friendly Coding',
      titleLine1: 'Learn Python Basics.',
      titleLine2: 'Build Core Software Logic.',
      subheading: 'Start coding with the most popular and readable language. Learn object-oriented programming, data structures, and scripting.',
      primaryBtnText: 'Explore Syllabus',
      primaryBtnLink: '#programs',
      secondaryBtnText: 'Start Learning',
      secondaryBtnLink: '#partner',
      trustIndicators: ['Python Scripts', 'OOP Concepts', 'Data Structures'],
      visualType: 'python'
    },
    {
      badge: '⚡ Frontend Engineering',
      titleLine1: 'Learn Web Development.',
      titleLine2: 'Build Real-World Sites.',
      subheading: 'Create stunning websites using HTML, CSS, JavaScript, and modern frameworks. Design interactive interfaces from scratch.',
      primaryBtnText: 'Explore Syllabus',
      primaryBtnLink: '#programs',
      secondaryBtnText: 'Start Learning',
      secondaryBtnLink: '#partner',
      trustIndicators: ['HTML & CSS', 'JavaScript UI', 'React Framework'],
      visualType: 'web'
    }
  ];

  const handleSetSlide = (newIndex) => {
    if (newIndex === currentSlide) return;
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500); // Cycle slides every 6.5 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

  // Horizontal sliding carousel animations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 160 : -160,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 160 : -160,
      opacity: 0
    })
  };

  if (appMode === 'lms') {
    return (
      <>
        {showWelcome && membership && (
          <WelcomeScreen
            user={userProfile}
            membership={membership}
            onStartLearning={() => setShowWelcome(false)}
          />
        )}
        <LMSLayout
          user={userProfile}
          activeRole={activeRole}
          membership={membership}
          onRoleChange={(newRole) => setActiveRole(newRole)}
          onLogout={async () => {
            await signOut(auth);
            setAppMode('landing');
            setActiveRole('student');
            setMembership(null);
            setShowWelcome(false);
          }}
          onRenewMembership={() => setAppMode('plans')}
        />
      </>
    );
  }

  if (appMode === 'plans') {
    return (
      <MembershipPlans
        user={userProfile}
        onPaymentSuccess={(planData) => {
          setMembership(planData);
          setShowWelcome(true);
          setAppMode('lms');
        }}
        onLogout={() => {
          setAppMode('landing');
          setMembership(null);
        }}
      />
    );
  }

  if (appMode === 'auth') {
    return (
      <LMSAuth
        onLoginSuccess={(profile) => {
          setUserProfile(profile);
          setActiveRole(profile.role || 'student');
          // New user (registered) → go to Plans; returning user (login) → check membership
          if (profile.isNewUser) {
            setMembership(null);
            setAppMode('plans');
          } else {
            // Returning user: simulate having a membership (demo)
            const demo = {
              planId: 'pro',
              planName: 'LMS Pro',
              courses: ['Generative AI Fundamentals', 'Python Programming Masterclass'],
              validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              activatedAt: new Date().toISOString(),
              justActivated: false,
            };
            setMembership(demo);
            setShowWelcome(false);
            setAppMode('lms');
          }
        }}
        onBackToLanding={() => setAppMode('landing')}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-navy-950 text-white overflow-hidden flex flex-col justify-between selection:bg-accent-orange/30 selection:text-white">
      {/* 1. Background Visual Effects (Grid, Glows, Particles) */}
      <BackgroundEffects />

      {/* 2. Glassmorphic Navigation Bar */}
      <Navbar onOpenAuth={() => setAppMode('auth')} />

      {/* 3. Hero Section Container */}
      <main id="home" className="flex-grow flex flex-col items-center justify-center pt-28 md:pt-32 pb-16 z-10 px-6 md:px-12 max-w-7xl mx-auto w-full overflow-hidden">
        <div className="relative w-full overflow-visible">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 220, damping: 26 },
                opacity: { duration: 0.25 }
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full"
            >
              
              {/* LEFT SIDE CONTENT - HERO COPY */}
              <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-7 w-full">
                {/* Locked Height Text Block to prevent button layout shifts */}
                <div className="min-h-[300px] sm:min-h-[250px] md:min-h-[230px] lg:min-h-[275px] flex flex-col justify-start space-y-4 md:space-y-6 w-full">
                  {/* Small Future Badge */}
                  <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-glass border border-glass shadow-md shadow-black/20">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
                    </span>
                    <span className="font-display text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                      {slides[currentSlide].badge}
                    </span>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-3">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                      {slides[currentSlide].titleLine1}<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-orange-glow to-indigo-400 text-glow-orange font-bold">
                        {slides[currentSlide].titleLine2}
                      </span>
                    </h1>
                  </div>

                  {/* Subheading */}
                  <p className="font-sans text-base md:text-lg text-neutral-400 font-normal leading-relaxed max-w-xl">
                    {slides[currentSlide].subheading}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  {/* Primary Button */}
                  <motion.a
                    href={slides[currentSlide].primaryBtnLink}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display text-sm font-bold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow shadow-lg shadow-accent-orange/20 hover:shadow-accent-orange/40 hover:text-glow-orange transition-all duration-300 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {slides[currentSlide].primaryBtnText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  </motion.a>

                  {/* Secondary Button */}
                  <motion.button
                    onClick={() => setAppMode('auth')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-full font-display text-sm font-semibold text-neutral-300 hover:text-white bg-glass border border-glass hover:bg-glass-hover shadow-md hover:shadow-white/5 transition-all duration-300 group cursor-pointer"
                  >
                    {slides[currentSlide].secondaryBtnText}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </motion.button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-white/5 w-full max-w-xl">
                  {slides[currentSlide].trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-accent-orange-glow" />
                      </div>
                      <span className="font-sans text-xs md:text-sm font-medium text-neutral-400">
                        {indicator}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE VISUAL - 3D GRAPHICS */}
              <div className="lg:col-span-5 flex items-center justify-center w-full">
                <HeroVisual type={slides[currentSlide].visualType} />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Static Slide Navigation Dots (aligned under the text column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full mt-6 z-20">
          <div className="lg:col-span-7 flex items-center justify-start gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSetSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-accent-orange' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </main>

      {/* Trust Metrics Statistics Banner */}
      <StatsBanner />

      {/* RaamBow Organisation Section */}
      <OrganisationSection />

      {/* AI Literacy is the Future Section */}
      <AILiteracySection />

      {/* What Students Learn Section */}
      <ProgramsSection />

      {/* Become An AI-Ready School Section */}
      <SchoolPartnershipSection />

      {/* Future Learning Platform Section */}
      <PlatformSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Futuristic Responsive Footer */}
      <Footer />
    </div>
  );
}

export default App;
