import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import raambowLogo from '../assets/raambowlogo.png';

const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#programs' },
    { name: 'Schools', href: '#schools' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out py-4 md:py-5 px-6 md:px-12 ${isScrolled
            ? 'bg-glass border-b border-glass shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center bg-white p-1 rounded-lg shadow-sm shadow-white/10 shrink-0">
              <img src={raambowLogo} alt="RaamBow Logo" className="h-7 md:h-8 w-10 md:w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-accent-orange transition-colors duration-300">
              RaamBow <span className="font-light text-neutral-400 group-hover:text-neutral-200"></span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-sans text-[14px] font-medium text-neutral-300 hover:text-white transition-colors duration-300 py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* LMS Login Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={onOpenAuth}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-display text-[13px] font-semibold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow shadow-md shadow-accent-orange/15 hover:shadow-accent-orange/30 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1">
                LMS Login
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block md:hidden text-neutral-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-glass border-b border-glass shadow-2xl p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-lg font-medium text-neutral-300 hover:text-white py-1 transition-colors duration-200 border-b border-neutral-800/40"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full text-center px-5 py-3 rounded-full font-display text-[15px] font-semibold text-white bg-gradient-to-r from-accent-orange to-accent-orange-glow flex items-center justify-center gap-1.5 shadow-lg shadow-accent-orange/20 cursor-pointer"
            >
              LMS Login
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
