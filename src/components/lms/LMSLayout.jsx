import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, MessageSquare, FileText, FolderGit, 
  HelpCircle, ShieldCheck, Trophy, Bell, Search, Settings, 
  User, LogOut, Menu, X, ChevronDown, Check, UserCheck, AlertCircle, BookMarked,
  Lock, RefreshCw, Calendar
} from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';

// Import all subviews (we will create these next)
import DashboardView from './DashboardView';
import CoursesView from './CoursesView';
import CourseLearnView from './CourseLearnView';
import QuizzesView from './QuizzesView';
import AssignmentsView from './AssignmentsView';
import ProjectsView from './ProjectsView';
import CertificatesView from './CertificatesView';
import ProfileView from './ProfileView';
import SettingsView from './SettingsView';
import AdminView from './AdminView';
import TeacherView from './TeacherView';
import LeaderboardView from './LeaderboardView';

const LMSLayout = ({ user, activeRole, onRoleChange, onLogout, membership, onRenewMembership }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showDebugSwitcher, setShowDebugSwitcher] = useState(false);
  const [lockedToast, setLockedToast] = useState(false);

  // Membership derived state
  const isLocked = !membership; // no paid plan
  const isExpired = membership && new Date(membership.validUntil) < new Date();
  
  // Search bar query
  const [searchQuery, setSearchQuery] = useState('');

  // Selected course for course learning page
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Lesson Available', desc: 'Neural Networks module is now live in Generative AI.', read: false, type: 'lesson' },
    { id: 2, title: 'Quiz Deadline Reminder', desc: 'Python Loops Quiz expires in 4 hours.', read: false, type: 'quiz' },
    { id: 3, title: 'Certificate Issued!', desc: 'Generative AI Fundamentals certificate generated.', read: true, type: 'certificate' },
    { id: 4, title: 'AI Recommendation', desc: 'Study coach recommends: practice Python loops based on quiz 2 score.', read: true, type: 'ai' }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Sidebar navigation menu items
  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'projects', name: 'Projects', icon: FolderGit },
    { id: 'quizzes', name: 'Quizzes', icon: HelpCircle },
    { id: 'certificates', name: 'Certificates', icon: ShieldCheck },
    { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
  ];

  // Switch navigation tabs or handle direct learning actions
  const handleNavigate = (tab) => {
    if ((isLocked || isExpired) && tab !== 'dashboard') {
      setLockedToast(true);
      setTimeout(() => setLockedToast(false), 2800);
      return;
    }
    setCurrentTab(tab);
    setIsSidebarOpen(false);
  };

  const handleStartLearning = (course) => {
    setSelectedCourse(course);
    setCurrentTab('learn');
  };

  // Render subviews based on active tab and active role
  const renderContent = () => {
    if (currentTab === 'learn') {
      return (
        <CourseLearnView 
          course={selectedCourse} 
          onBack={() => setCurrentTab('courses')} 
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        if (activeRole === 'admin') return <AdminView onNavigate={handleNavigate} />;
        if (activeRole === 'teacher') return <TeacherView onNavigate={handleNavigate} />;
        return <DashboardView onStartLearning={handleStartLearning} onNavigate={handleNavigate} />;
      case 'courses':
        return <CoursesView onStartLearning={handleStartLearning} />;
      case 'quizzes':
        return <QuizzesView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'projects':
        return <ProjectsView />;
      case 'certificates':
        return <CertificatesView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'profile':
        return <ProfileView user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsView user={user} />;
      default:
        return <DashboardView onStartLearning={handleStartLearning} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- DESKTOP SIDEBAR (Notion Clean Layout) --- */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-slate-200/60 fixed left-0 top-0 bottom-0 z-30 overflow-hidden">
        
        {/* Top Section Logo & Nav (Scrollable if needed) */}
        <div className="flex-grow overflow-y-auto p-5 pb-4 space-y-6 scrollbar-none">
          {/* Sidebar Header Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 shrink-0">
              <img src={raambowLogo} alt="RaamBow Logo" className="h-7 w-10 object-contain" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-tight text-slate-900 leading-none block">
                RaamBow
              </span>
              <span className="text-[10px] text-indigo-600 font-mono tracking-widest uppercase font-bold leading-none">
                ACADEMY
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const itemLocked = (isLocked || isExpired) && item.id !== 'dashboard';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-display text-xs font-bold transition-all cursor-pointer ${
                    itemLocked
                      ? 'text-slate-300 hover:bg-slate-50'
                      : isActive 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : item.highlight 
                          ? 'text-indigo-500 hover:bg-slate-50' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${itemLocked ? 'text-slate-300' : isActive ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
                    {item.name}
                  </span>
                  {itemLocked ? (
                    <Lock className="w-3 h-3 text-slate-300" />
                  ) : item.highlight && (
                    <span className="bg-linear-to-r from-indigo-500 to-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm animate-pulse-glow">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Details (Fixed, non-scrollable) */}
        <div className="border-t border-slate-100 p-5 pt-4 bg-white space-y-3 shrink-0">
          
          {/* Active Role Indicator (conditional debug mode) */}
          {showDebugSwitcher && (
            <div className="flex items-center justify-between px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Role:</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] border ${
                activeRole === 'admin' 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : activeRole === 'teacher' 
                    ? 'bg-amber-50 border-amber-200 text-amber-600' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-600'
              }`}>
                {activeRole}
              </span>
            </div>
          )}

          <button 
            onClick={() => handleNavigate('profile')}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
              {user.name.substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-display font-bold text-xs text-slate-800 block truncate group-hover:text-indigo-600 transition-colors">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                {user.email}
              </span>
            </div>
          </button>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-600 transition-colors rounded-xl text-xs font-bold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN PAGE CONTENT CONTAINER --- */}
      <div className="flex-grow lg:pl-[260px] flex flex-col min-w-0 min-h-screen relative pb-16 lg:pb-0">

        {/* Locked Toast */}
        <AnimatePresence>
          {lockedToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2.5 px-5 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 text-xs font-bold"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              Activate a membership plan to unlock learning access.
              <button onClick={() => { setLockedToast(false); if(onRenewMembership) onRenewMembership(); }} className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-[10px] font-black cursor-pointer transition-colors">
                View Plans
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expiry / Locked banner */}
        {(isExpired || isLocked) && (
          <div className={`px-6 py-3 flex items-center gap-3 text-sm font-bold ${isExpired ? 'bg-rose-50 border-b border-rose-200 text-rose-700' : 'bg-amber-50 border-b border-amber-200 text-amber-800'}`}>
            {isExpired ? (
              <>
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Your LMS subscription has expired. Renew now to continue learning.</span>
                <button onClick={onRenewMembership} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black cursor-pointer transition-all shrink-0">
                  <RefreshCw className="w-3 h-3" /> Renew Membership
                </button>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 shrink-0" />
                <span>Activate a membership plan to unlock learning access.</span>
                <button onClick={onRenewMembership} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-black cursor-pointer transition-all shrink-0">
                  View Plans
                </button>
              </>
            )}
          </div>
        )}

        {/* --- TOP HEADER (Premium Navigation) --- */}
        <header className="bg-white border-b border-slate-200/60 h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
          
          {/* Left search */}
          <div className="flex items-center gap-4 flex-1 max-w-sm">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="relative w-full hidden sm:block">
              <input 
                type="text"
                placeholder="Search lessons, coding challenges, study notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all font-semibold"
              />
              <Search className="absolute left-3.5 top-[9px] w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Right Header: Notification & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Notifications Center */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
                className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2.5 w-[300px] bg-white border border-slate-200/80 rounded-2xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                        <span className="font-display font-black text-xs text-slate-800">Notifications</span>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllRead}
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      
                      <div className="max-h-[280px] overflow-y-auto divide-y divide-slate-100">
                        {notifications.length > 0 ? (
                          notifications.map((item) => (
                            <div 
                              key={item.id} 
                              className={`p-3 text-left transition-colors ${item.read ? 'bg-white' : 'bg-indigo-50/20'}`}
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className={`font-display text-xs font-bold ${item.read ? 'text-slate-700' : 'text-slate-900'}`}>
                                  {item.title}
                                </span>
                                {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1" />}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center text-slate-400 text-xs">No notifications yet.</div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
                onDoubleClick={() => setShowDebugSwitcher(!showDebugSwitcher)}
                title="Double click to toggle Developer switcher"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-black text-xs flex items-center justify-center border border-orange-200">
                  {user.name.substring(0, 2)}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2.5 w-[340px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl z-50 p-5 space-y-4 text-left"
                    >
                      <div className="p-3 border-b border-slate-100 pb-4">
                        <span className="font-display font-black text-lg text-slate-800 block truncate">{user.name}</span>
                        <span className="text-sm text-slate-400 font-semibold truncate block mt-0.5">{user.email}</span>
                      </div>

                      {/* Role switcher inside Profile Menu (Conditional debug switcher) */}
                      {showDebugSwitcher && (
                        <div className="p-2 border-b border-slate-100 pb-4 space-y-2">
                          <span className="text-xs font-black text-slate-400 uppercase block">Switch LMS Role (Debug)</span>
                          <div className="grid grid-cols-3 gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
                            {['student', 'teacher', 'admin'].map((roleOpt) => (
                              <button
                                key={roleOpt}
                                onClick={() => {
                                  onRoleChange(roleOpt);
                                  setIsProfileOpen(false);
                                  setCurrentTab('dashboard'); // reset to dashboard
                                }}
                                className={`text-xs font-black capitalize py-2 rounded-md transition-all cursor-pointer ${
                                  activeRole === roleOpt 
                                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
                                    : 'text-slate-400 hover:text-slate-700'
                                }`}
                              >
                                {roleOpt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dropdown navigation shortcuts */}
                      <button 
                        onClick={() => { handleNavigate('profile'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-4.5 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors text-sm sm:text-base font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        <User className="w-5 h-5 text-slate-400" />
                        My Profile
                      </button>

                      <button 
                        onClick={() => { handleNavigate('settings'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-4.5 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors text-sm sm:text-base font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        <Settings className="w-5 h-5 text-slate-400" />
                        Account Settings
                      </button>

                      <button 
                        onClick={() => { onLogout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-4.5 px-4 py-3 rounded-2xl hover:bg-rose-50 text-rose-600 transition-colors text-sm sm:text-base font-black cursor-pointer"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* --- MOBILE NAV OVERLAY DRAWERS & MOBILE PANEL --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay Backdrop */}
              <div 
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
              
              {/* Mobile Sidebar Slider */}
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                className="fixed left-0 top-0 bottom-0 w-[240px] bg-white border-r border-slate-200 z-50 flex flex-col justify-between lg:hidden overflow-hidden"
              >
                {/* Top Section Logo & Nav (Scrollable) */}
                <div className="flex-grow overflow-y-auto p-5 pb-4 space-y-5 scrollbar-none">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <img src={raambowLogo} alt="RaamBow Logo" className="h-6 w-9 object-contain" />
                      <span className="font-display font-black text-sm tracking-tight text-slate-900">RaamBow LMS</span>
                    </div>
                    <button 
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-display text-xs font-bold transition-all cursor-pointer ${
                            isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            {item.name}
                          </span>
                          {item.highlight && (
                            <span className="bg-indigo-600 text-white text-[8px] font-black px-1 py-0.5 rounded">AI</span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Sidebar Footer (Fixed, non-scrollable) */}
                <div className="border-t border-slate-100 p-5 pt-4 bg-white space-y-2 text-left shrink-0">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block px-1">Role: {activeRole}</span>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors rounded-xl text-xs font-extrabold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* --- MAIN SCROLLABLE DASHBOARD VIEWPORT --- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50">
          {renderContent()}
        </main>

        {/* --- MOBILE BOTTOM NAVIGATION (Apple Style) --- */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 h-16 flex items-center justify-around px-3 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
          <button 
            onClick={() => handleNavigate('dashboard')}
            className={`flex flex-col items-center justify-center w-12 py-1 cursor-pointer transition-colors ${
              currentTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[8px] font-extrabold mt-0.5">Home</span>
          </button>

          <button 
            onClick={() => handleNavigate('courses')}
            className={`flex flex-col items-center justify-center w-12 py-1 cursor-pointer transition-colors ${
              currentTab === 'courses' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[8px] font-extrabold mt-0.5">Courses</span>
          </button>


          <button 
            onClick={() => handleNavigate('leaderboard')}
            className={`flex flex-col items-center justify-center w-12 py-1 cursor-pointer transition-colors ${
              currentTab === 'leaderboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[8px] font-extrabold mt-0.5">Ranks</span>
          </button>

          <button 
            onClick={() => handleNavigate('profile')}
            className={`flex flex-col items-center justify-center w-12 py-1 cursor-pointer transition-colors ${
              currentTab === 'profile' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[8px] font-extrabold mt-0.5">Profile</span>
          </button>
        </nav>

      </div>

    </div>
  );
};

export default LMSLayout;
