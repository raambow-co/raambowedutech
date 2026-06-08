import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import raambowLogo from '../assets/raambowlogo.png';

// Custom inline SVG icons for brands to prevent lucide dependency version mismatch
const InstagramIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/raambow_technologies/', name: 'Instagram', glow: 'hover:shadow-pink-500/25 hover:border-pink-500/30 text-pink-400' },
    { icon: LinkedinIcon, href: '#linkedin', name: 'LinkedIn', glow: 'hover:shadow-blue-500/25 hover:border-blue-500/30 text-blue-400' },
    { icon: YoutubeIcon, href: '#youtube', name: 'YouTube', glow: 'hover:shadow-red-500/25 hover:border-red-500/30 text-red-400' },
    { icon: TwitterIcon, href: '#twitter', name: 'Twitter/X', glow: 'hover:shadow-neutral-400/20 hover:border-neutral-500/20 text-neutral-300' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#programs' },
    { name: 'Schools', href: '#schools' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const programs = [
    { name: 'Prompt Engineering', href: '#programs' },
    { name: 'C Programming', href: '#programs' },
    { name: 'Python Basics', href: '#programs' },
    { name: 'Web Development', href: '#programs' },
  ];

  return (
    <footer className="relative bg-navy-950 pt-20 pb-8 overflow-hidden z-10 w-full">
      {/* Subtle top border glow separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-accent-orange/30 to-transparent" />

      {/* Background Grids and lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-radial from-blue-900/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] rounded-full bg-radial from-accent-orange/5 to-transparent blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
        
        {/* COLUMN 1 - BRAND SECTION */}
        <div className="lg:col-span-4 flex flex-col items-start text-left space-y-5">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center bg-white p-1 rounded-lg shadow-sm shadow-white/10 shrink-0">
              <img src={raambowLogo} alt="RaamBow Logo" className="h-7 md:h-8 w-10 md:w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-accent-orange transition-colors duration-300">
              RaamBow <span className="font-light text-neutral-400">AI Learning</span>
            </span>
          </a>
          
          <div className="space-y-2">
            <p className="font-display text-xs md:text-sm font-semibold text-accent-orange-glow tracking-wider uppercase">
              “Build AI later, learn to use it now.”
            </p>
            <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Empowering students with future-ready AI literacy, creativity, and digital skills.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social, idx) => {
              const IconComp = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 shadow-md ${social.glow} hover:bg-white/[0.07]`}
                  aria-label={social.name}
                >
                  <IconComp />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div className="lg:col-span-2 flex flex-col items-start text-left space-y-4">
          <h4 className="font-display text-sm md:text-base font-bold text-white tracking-wide uppercase border-b border-white/5 pb-1.5 w-full">
            Quick Links
          </h4>
          <ul className="space-y-2.5 w-full">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="inline-flex items-center text-xs md:text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-sans group relative"
                >
                  <span className="w-1.5 h-[1px] bg-accent-orange mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 - PROGRAMS */}
        <div className="lg:col-span-3 flex flex-col items-start text-left space-y-4">
          <h4 className="font-display text-sm md:text-base font-bold text-white tracking-wide uppercase border-b border-white/5 pb-1.5 w-full">
            Programs
          </h4>
          <ul className="space-y-2.5 w-full">
            {programs.map((prog, idx) => (
              <li key={idx}>
                <a
                  href={prog.href}
                  className="inline-flex items-center text-xs md:text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-sans group"
                >
                  <span className="w-1.5 h-[1px] bg-indigo-500 mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300" />
                  {prog.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 - CONTACT DETAILS */}
        <div className="lg:col-span-3 flex flex-col items-start text-left space-y-4">
          <h4 className="font-display text-sm md:text-base font-bold text-white tracking-wide uppercase border-b border-white/5 pb-1.5 w-full">
            Contact
          </h4>
          <ul className="space-y-3.5 w-full">
            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-orange/20 flex items-center justify-center text-accent-orange shrink-0 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase font-mono leading-none mb-1">Email Us</span>
                <a href="mailto:hello@raambow.com" className="text-xs md:text-sm text-neutral-300 hover:text-accent-orange-glow transition-colors font-sans">
                  hello@raambow.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-orange/20 flex items-center justify-center text-indigo-400 shrink-0 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase font-mono leading-none mb-1">Call Us</span>
                <a href="tel:+919490543499" className="text-xs md:text-sm text-neutral-300 hover:text-indigo-400 transition-colors font-sans">
                  +91 94905 43499
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-orange/20 flex items-center justify-center text-emerald-400 shrink-0 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase font-mono leading-none mb-1">Office Location</span>
                <span className="text-xs md:text-sm text-neutral-300 font-sans">
                  Bangalore, Karnataka, India
                </span>
              </div>
            </li>
          </ul>
          
          <div className="pt-2 text-[10px] md:text-xs text-neutral-500 italic font-sans leading-relaxed">
            *For school partnerships or inquiries, drop us a line directly.
          </div>
        </div>

      </div>

      {/* BOTTOM FOOTER BAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 border-t border-white/5 pt-8">
        
        {/* Animated subtle divider glow line */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-[10px] md:text-xs text-neutral-500 font-mono">
            © {new Date().getFullYear()} RaamBow AI Learning. All rights reserved.
          </div>

          {/* Futuristic education platform label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.01] border border-white/5 text-[9px] md:text-[10px] font-mono tracking-widest text-neutral-500 uppercase shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            Future-Ready Education Platform
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
