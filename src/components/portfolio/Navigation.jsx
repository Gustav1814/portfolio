import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Arsenal', href: '#skills' },
  { label: 'Journey', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Creds', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? 'py-3'
          : 'py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${isScrolled
            ? 'glass border border-white/5 shadow-2xl shadow-black/50'
            : 'bg-transparent'
            }`}>
            {/* Logo */}
            <motion.a
              href="#"
              className="relative group flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              {/* Premium Monogram Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-white/10 group-hover:border-amber-500/30 flex items-center justify-center overflow-hidden transition-all">
                  <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-amber-200 via-orange-300 to-red-400 bg-clip-text text-transparent">ZS</span>
                </div>
              </div>
              {/* Title Text */}
              <div className="hidden sm:block">
                <div className="text-sm font-light text-white/80 tracking-wide">Cybersecurity Analyst</div>
                <div className="text-xs text-amber-400/60 tracking-wider">& ISO 27001 Lead Auditor</div>
              </div>
              <motion.div
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative px-5 py-2.5 text-sm tracking-wider font-medium transition-all duration-300 ${activeSection === item.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                    }`}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-full border border-amber-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                className="flex items-center gap-2.5 px-5 py-2.5 glass-hover rounded-full cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-white/70 tracking-wider font-medium">AVAILABLE</span>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-11 h-11 flex items-center justify-center glass rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl md:hidden noise-overlay"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-3xl font-light text-white/70 hover:text-gradient tracking-[0.2em] transition-all duration-300"
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-3 glass rounded-full px-6 py-3"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-white/70 tracking-wider">Available for Work</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}