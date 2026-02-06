import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { scrollTo } from '../../hooks/useLenis';

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
  const [hoveredItem, setHoveredItem] = useState(null);
  const navRef = useRef(null);

  // Track scroll for nav background
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section with improved detection
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    scrollTo(href);
    setMobileMenuOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl transition-all duration-500 ${isScrolled
              ? 'bg-black/60 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/50'
              : 'bg-transparent'
              }`}
            style={{ opacity: isScrolled ? 1 : navOpacity }}
          >
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo(0)}
              className="relative group flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Clean Minimal Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-lg"
                />
                {/* Main logo container */}
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-red-500 p-[1.5px] overflow-hidden">
                  <div className="w-full h-full rounded-[6px] bg-black flex items-center justify-center">
                    <span className="text-base font-semibold tracking-wide text-white">ZS</span>
                  </div>
                </div>
              </div>
              {/* Title Text */}
              <div className="hidden sm:block">
                <div className="text-sm font-light text-white/80 tracking-wide group-hover:text-white transition-colors">Cybersecurity Analyst</div>
                <div className="text-xs text-amber-400/60 tracking-wider group-hover:text-amber-400/80 transition-colors">& ISO 27001 Lead Auditor</div>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  className="relative px-4 py-2.5 text-sm tracking-wide font-medium transition-colors duration-300"
                >
                  <span className={`relative z-10 ${activeSection === item.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                    }`}>
                    {item.label}
                  </span>

                  {/* Active indicator background */}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10 rounded-lg border border-amber-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover indicator */}
                  {hoveredItem === item.label && activeSection !== item.href.replace('#', '') && (
                    <motion.div
                      layoutId="hoverNavBg"
                      className="absolute inset-0 bg-white/5 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Status Indicator - Premium */}
            <div className="hidden md:flex items-center gap-3">
              <motion.div
                className="flex items-center gap-2.5 px-4 py-2.5 glass-card-premium rounded-full cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs text-white/70 tracking-wider font-medium group-hover:text-white transition-colors">AVAILABLE</span>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-11 h-11 flex items-center justify-center glass-card-premium rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Fullscreen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/98 backdrop-blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-red-500/5 rounded-full blur-[100px]" />
              </div>

              {/* Nav items */}
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-4xl md:text-5xl font-light tracking-[0.15em] transition-all duration-300 ${activeSection === item.href.replace('#', '')
                    ? 'text-gradient'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center gap-3 glass-card-premium rounded-full px-6 py-3"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm text-white/70 tracking-wider">Available for Work</span>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white/30 text-xs tracking-widest"
              >
                <span>GITHUB</span>
                <span>•</span>
                <span>LINKEDIN</span>
                <span>•</span>
                <span>EMAIL</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}