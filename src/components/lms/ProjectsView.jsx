import React from 'react';
import { FolderGit } from 'lucide-react';

const ProjectsView = () => {
  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Industry Projects</h2>
        <p className="text-xs text-slate-500 font-semibold">Solve real-world capstone challenges and add them to your portfolio</p>
      </div>

      {/* Premium Empty State */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)]">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <FolderGit className="w-8 h-8 text-indigo-500" />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-display font-black text-base text-slate-800">No active projects</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your instructor has not assigned any industry capstone projects yet. They will appear here when active.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProjectsView;
