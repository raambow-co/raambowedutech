import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Award, ExternalLink, Download, Share2, Eye, X } from 'lucide-react';
import raambowLogo from '../../assets/raambowlogo.png';

const CertificatesView = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const mockCerts = [
    {
      id: 'cert-1',
      name: 'Generative AI Fundamentals',
      date: 'June 01, 2026',
      certId: 'RB-ML-908234',
      instructor: 'Dr. Sarah Jenkins'
    }
  ];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="font-display font-black text-2xl text-slate-800 tracking-tight">Earned Certificates</h2>
        <p className="text-xs text-slate-500">View, download, and verify your credentials</p>
      </div>

      {mockCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCerts.map((cert) => (
            <div 
              key={cert.id}
              className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_-5px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-8.5 h-8.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-display font-black text-sm text-slate-800 leading-tight">
                    {cert.name}
                  </h3>
                </div>

                {/* Meta details */}
                <div className="space-y-2 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Completion Date: {cert.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span className="font-mono">ID: {cert.certId}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-100 mt-6 bg-white">
                <button 
                  onClick={() => setSelectedCert(cert)}
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 border border-slate-200/60 rounded-xl font-display text-[10px] font-black cursor-pointer flex items-center justify-center gap-1 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button 
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 border border-slate-200/60 rounded-xl font-display text-[10px] font-black cursor-pointer flex items-center justify-center gap-1 transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button 
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 border border-slate-200/60 rounded-xl font-display text-[10px] font-black cursor-pointer flex items-center justify-center gap-1 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button 
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-600 border border-slate-200/60 rounded-xl font-display text-[10px] font-black cursor-pointer flex items-center justify-center gap-1 transition-all"
                >
                  Verify <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center max-w-sm mx-auto space-y-3">
          <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-display font-bold text-sm text-slate-700">No certificates earned</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Certificates will be generated once you finish all modules of a course.
          </p>
        </div>
      )}

      {/* CERTIFICATE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setSelectedCert(null)} />
            
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl relative z-10 w-full max-w-2xl text-center space-y-6"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Simulated Elegant Certificate Design */}
              <div className="border-[12px] border-indigo-50/50 p-6 relative bg-slate-50 rounded-2xl border-double">
                <div className="border border-slate-200 p-8 space-y-6 bg-white relative">
                  
                  {/* Logo */}
                  <div className="flex flex-col items-center gap-1.5">
                    <img src={raambowLogo} alt="RaamBow Logo" className="h-8 object-contain" />
                    <span className="text-[8px] text-indigo-600 font-mono tracking-widest uppercase font-bold">RaamBow Academy</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">Certificate of Completion</span>
                    <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
                    <h3 className="font-display font-black text-lg text-slate-800 tracking-tight">Adityaa Sharma</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-semibold">
                      for successfully completing all curriculum standards and exam components of the advanced course
                    </p>
                    <h4 className="font-display font-extrabold text-sm text-indigo-600 tracking-tight pt-2">
                      {selectedCert.name}
                    </h4>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-slate-400 border-t border-slate-100 pt-6 font-mono font-semibold">
                    <div className="text-left">
                      <span>Date: {selectedCert.date}</span>
                    </div>
                    <div className="text-center">
                      <span>Instructor: {selectedCert.instructor}</span>
                    </div>
                    <div className="text-right">
                      <span>ID: {selectedCert.certId}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CertificatesView;
