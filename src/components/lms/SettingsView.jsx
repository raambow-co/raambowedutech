import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Globe, Check } from 'lucide-react';

const SettingsView = ({ user }) => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 text-left max-w-2xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Account Settings</h2>
        <p className="text-xs text-slate-500">Configure your password, email settings, and connected accounts</p>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Change Password Block */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-indigo-600" /> Security
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Current Password</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-indigo-500 transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">New Password</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Confirm New</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-600" /> Notifications
            </h3>

            <div className="space-y-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-800 block">Course Deadlines & Reminders</span>
                  <span className="text-[10px] text-slate-400">Receive email sheets when quiz or assignment deadlines approach.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={taskReminders}
                  onChange={(e) => setTaskReminders(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-800 block">AI Recommended Digests</span>
                  <span className="text-[10px] text-slate-400">Weekly reports summarising learning milestones and strengths.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-white">
            {saveSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Settings Saved!
              </span>
            ) : (
              <span className="text-xs text-slate-400">All data secured with TLS encryption</span>
            )}
            
            <button 
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-display text-xs font-black shadow-md cursor-pointer transition-all"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default SettingsView;
