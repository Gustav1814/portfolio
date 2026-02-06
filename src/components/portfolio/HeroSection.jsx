import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { scrollTo } from '../../hooks/useLenis';

// Animated text reveal component with stagger - simplified for mobile
const AnimatedText = ({ text, className, delay = 0, isMobile = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const letters = text.split('');

  if (isMobile) {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Magnetic button effect
const MagneticButton = ({ children, className, href, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Disable magnetic effect on mobile/touch
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default function HeroSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smoother transforms with spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 400]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.4], [1, 0.85]), springConfig);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  const scrollToAbout = () => {
    scrollTo('#about');
  };

  // Optimized floating particles with GPU acceleration
  // Reduce particles on mobile for performance
  const particles = Array.from({ length: isMobile ? 4 : 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  // Mouse parallax effect for floating elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return; // Disable parallax on mobile
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        {/* Animated gradient lines */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.5%,rgba(245,158,11,0.03)_49.5%,rgba(245,158,11,0.03)_50.5%,transparent_50.5%)] bg-[size:100px_100%]"
          animate={{
            backgroundPositionX: ['0px', '100px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Premium Gradient Orbs with mouse parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(245,158,11,0.08) 30%, transparent 70%)',
          filter: 'blur(80px)',
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, rgba(251,113,133,0.08) 30%, transparent 70%)',
          filter: 'blur(80px)',
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
      />

      {/* Morphing shape */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 animate-morph"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(239,68,68,0.3) 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Optimized Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `linear-gradient(135deg, rgba(251,191,36,0.6), rgba(239,68,68,0.6))`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Decorative floating elements with 3D effect */}
      <motion.div
        style={{ x: mousePosition.x * 0.8, y: mousePosition.y * 0.8 }}
        className="absolute top-[15%] left-[15%] w-20 h-20 hidden md:flex"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-amber-400/50 text-xs font-mono tracking-wider">SEC</span>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: mousePosition.x * -0.6, y: mousePosition.y * -0.6 }}
        className="absolute bottom-[20%] right-[12%] w-24 h-24 hidden md:flex"
      >
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="w-full h-full rounded-3xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 backdrop-blur-sm flex items-center justify-center"
        >
          <span className="text-red-400/50 text-xs font-mono">01</span>
        </motion.div>
      </motion.div>

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-white/[0.03]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-white/[0.02]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-16 rounded-full border border-amber-500/[0.05]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={!isMobile ? { y, opacity, scale, filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' } : {}}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto will-change-transform"
      >
        {/* Eyebrow Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card-premium">
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-light tracking-[0.3em] text-white/60 uppercase">Cybersecurity Analyst</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-amber-400"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Main Name with Premium Typography */}
        <div className="text-5xl md:text-6xl lg:text-8xl font-extralight tracking-[0.1em] mb-8 font-display overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <AnimatedText
              text="ZEERAK"
              className="text-white inline-block"
              delay={0.5}
              isMobile={isMobile}
            />
            <motion.span
              className="text-white/20 hidden md:inline-block"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              |
            </motion.span>
            <AnimatedText
              text="SHAHZAD"
              className="text-gradient inline-block"
              delay={0.8}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Tagline with line reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Protecting digital assets through advanced threat detection,
          <span className="text-amber-400/80"> SOC operations</span>, and
          <span className="text-red-400/80"> security automation</span>
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl text-white font-medium tracking-wide overflow-hidden button-shine"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>

          <MagneticButton
            href="#projects"
            className="group px-8 py-4 glass-card-premium rounded-xl text-white/80 font-medium tracking-wide hover:text-white transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View Projects
              <motion.span
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </MagneticButton>
        </motion.div>

        {/* Stats Row with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 flex justify-center gap-12 md:gap-20"
        >
          {[
            { value: '6+', label: 'Certifications' },
            { value: '50+', label: 'Projects' },
            { value: 'ISO', label: '27001 Auditor' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="text-2xl md:text-4xl font-light text-white mb-1 font-display group-hover:text-gradient transition-all duration-300">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Premium Design */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-light">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2 group-hover:border-amber-500/40 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-gradient-to-b from-amber-400 to-red-500"
          />
        </motion.div>
      </motion.button>

      {/* Side decorative elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center text-white/20">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-xs tracking-widest rotate-90 origin-center whitespace-nowrap">PORTFOLIO 2025</span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center text-white/20">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-xs tracking-widest -rotate-90 origin-center whitespace-nowrap">CYBER SECURITY</span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}