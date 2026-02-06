import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reduced particles for better performance (8 instead of 20)
  const particles = [
    { id: 0, x: 15, y: 20, size: 3, duration: 12 },
    { id: 1, x: 85, y: 30, size: 2, duration: 14 },
    { id: 2, x: 25, y: 70, size: 4, duration: 16 },
    { id: 3, x: 75, y: 80, size: 2, duration: 13 },
    { id: 4, x: 50, y: 15, size: 3, duration: 15 },
    { id: 5, x: 10, y: 50, size: 2, duration: 11 },
    { id: 6, x: 90, y: 60, size: 3, duration: 17 },
    { id: 7, x: 60, y: 90, size: 2, duration: 14 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black noise-overlay">
      {/* Animated Grid Background - Static, no animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Optimized Gradient Orbs - Reduced blur, added will-change */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-[80px] will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-red-500/15 via-rose-500/10 to-transparent rounded-full blur-[80px] will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Optimized Floating Particles - Fewer, GPU accelerated */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-amber-400/60 to-orange-500/60 will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Simplified Geometric Elements - Static borders, subtle animation */}
      <div className="absolute top-32 right-[15%] w-32 h-32 border border-amber-500/10 rounded-3xl" />
      <div className="absolute bottom-40 left-[10%] w-24 h-24 border border-orange-500/10 rounded-full" />

      {/* Accent dots - Static for performance */}
      <div className="absolute top-1/3 left-[5%] w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-50" />
      <div className="absolute bottom-1/3 right-[8%] w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-50" />

      {/* Premium Floating Elements - Reduced, optimized */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/10 backdrop-blur-sm flex items-center justify-center will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <span className="text-amber-400/60 text-xs font-mono">01</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute bottom-[25%] right-[15%] w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/15 to-rose-500/15 border border-red-500/10 backdrop-blur-sm flex items-center justify-center will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <span className="text-red-400/60 text-xs font-mono tracking-wider">SEC</span>
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto will-change-transform"
      >
        {/* Eyebrow Text with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500 animate-pulse" />
            <span className="text-sm font-light tracking-[0.3em] text-white/60 uppercase">Cybersecurity Analyst</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-amber-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Main Name with Premium Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] mb-8 font-display"
        >
          <motion.span
            className="text-white inline-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            ZEERAK
          </motion.span>
          <br className="md:hidden" />
          <span className="mx-4 text-white/20 hidden md:inline">|</span>
          <motion.span
            className="text-gradient inline-block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            SHAHZAD
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Protecting digital assets through advanced threat detection,
          <span className="text-amber-400/80"> SOC operations</span>, and
          <span className="text-red-400/80"> security automation</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl text-white font-medium tracking-wide hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass-card rounded-xl text-white/80 font-medium tracking-wide hover:text-white hover:border-white/20 transition-colors"
          >
            View Projects
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 flex justify-center gap-12 md:gap-20"
        >
          {[
            { value: '6+', label: 'Certifications' },
            { value: '50+', label: 'Projects' },
            { value: 'ISO', label: '27001 Auditor' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl md:text-3xl font-light text-white mb-1 font-display">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}