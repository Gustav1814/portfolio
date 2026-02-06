import React, { useEffect, useRef } from 'react';
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

  // Floating particles data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black noise-overlay">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Premium Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-red-500/20 via-rose-500/10 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-400/10 via-transparent to-red-400/10 rounded-full blur-[120px]"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-amber-400/60 to-orange-500/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Geometric Elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 90, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] w-32 h-32 border border-amber-500/10 rounded-3xl backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -45, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-40 left-[10%] w-24 h-24 border border-orange-500/10 rounded-full backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/3 left-[5%] w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-[8%] w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-sm"
      />


      {/* Premium Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/10 backdrop-blur-sm flex items-center justify-center"
      >
        <span className="text-amber-400/60 text-xs font-mono">01</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute bottom-[25%] right-[15%] w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/10 backdrop-blur-sm flex items-center justify-center"
      >
        <span className="text-red-400/60 text-xs font-mono tracking-wider">SEC</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        className="absolute top-[60%] right-[25%] w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/10 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse" />
      </motion.div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Eyebrow Text with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-4 text-white/50 text-sm tracking-[0.5em] uppercase font-light">
            <span className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400" />
            <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
              Cybersecurity Analyst
            </span>
            <span className="text-white/30">|</span>
            <span className="bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">
              ISO 27001 Lead Auditor
            </span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent via-red-400/50 to-red-400" />
          </span>
        </motion.div>

        {/* Main Title with Premium Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] mb-8 font-display"
        >
          <motion.span
            className="text-white inline-block"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ZEERAK
          </motion.span>
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent font-normal text-glow animate-gradient">
              SHAHZAD
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 origin-left glow-amber"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light mb-14"
        >
          Bridging{' '}
          <span className="text-white/80 font-medium">SOC operations</span>,{' '}
          <span className="text-white/80 font-medium">threat detection</span>, and{' '}
          <span className="text-white/80 font-medium">security automation</span>{' '}
          with regulatory compliance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 overflow-hidden rounded-full cursor-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full animate-gradient" style={{ backgroundSize: '200% 200%' }} />
            <div className="absolute inset-[2px] bg-black rounded-full transition-all duration-500 group-hover:bg-transparent" />
            <span className="relative text-sm tracking-[0.25em] text-white font-medium group-hover:text-black transition-colors duration-500">
              LET'S CONNECT
            </span>
          </button>

          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-10 py-5 glass-hover rounded-full premium-border"
          >
            <span className="text-sm tracking-[0.25em] text-white/60 group-hover:text-white font-medium transition-colors duration-500">
              VIEW PROJECTS
            </span>
          </button>
        </motion.div>

        {/* Stats with Premium Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center gap-8 md:gap-16 mt-24"
        >
          {[
            { value: '6+', label: 'Certifications', icon: '🛡️' },
            { value: '4+', label: 'Projects', icon: '💻' },
            { value: 'ISO', label: 'Lead Auditor', icon: '📋' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="glass rounded-2xl px-6 py-4 mb-2 group-hover:glow-amber transition-all duration-500">
                <div className="text-3xl md:text-5xl font-light text-white mb-1 font-display">{stat.value}</div>
              </div>
              <div className="text-xs tracking-[0.3em] text-white/30 uppercase group-hover:text-amber-400/60 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 hover:text-amber-400/80 transition-colors duration-500 group"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-light">Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="p-3 glass rounded-full group-hover:glow-amber transition-all duration-500"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Corner Accents with Gradient */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-gradient-to-r from-amber-500/20 to-transparent rounded-tl-3xl" style={{ borderColor: 'rgba(245, 158, 11, 0.1)' }} />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 rounded-tr-3xl" style={{ borderColor: 'rgba(239, 68, 68, 0.1)' }} />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 rounded-bl-3xl" style={{ borderColor: 'rgba(249, 115, 22, 0.1)' }} />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 rounded-br-3xl" style={{ borderColor: 'rgba(251, 113, 133, 0.1)' }} />
    </section >
  );
}