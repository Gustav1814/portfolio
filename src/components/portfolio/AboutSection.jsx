import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { MapPin, Briefcase, Code, Sparkles } from 'lucide-react';

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setPosition({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: -position.y,
        rotateY: position.x,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${50 + position.x * 5}% ${50 + position.y * 5}%, rgba(251,191,36,0.08), transparent 40%)`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function AboutSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Detect mobile/touch device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother parallax with spring physics - disabled on mobile
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]), springConfig);
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [0.95, 1]), springConfig);
  const imageRotate = useSpring(useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-2, 2]), springConfig);

  // Mouse parallax for image - disabled on mobile
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile

    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const facts = [
    { label: 'Location', value: 'Karachi, Pakistan', icon: MapPin },
    { label: 'Focus', value: 'SOC & Threat Ops', icon: Briefcase },
    { label: 'Tools', value: 'Python, Splunk, Wazuh', icon: Code },
    { label: 'Status', value: 'Open to Work', icon: Sparkles },
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Accents - Animated */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: useTransform(scrollYProgress, [0, 1], [0, 50]),
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          x: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              ref={imageRef}
              style={{
                y: imageY,
                scale: imageScale,
                rotateZ: imageRotate,
              }}
              className="relative perspective-1000"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] max-w-xs sm:max-w-md mx-auto">
                {/* Rotating decorative borders */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 rounded-3xl border border-dashed border-amber-500/10 hidden sm:block"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 rounded-3xl border border-dashed border-red-500/10 hidden sm:block"
                />

                {/* Static decorative elements */}
                <motion.div
                  style={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border border-amber-500/20 rounded-3xl hidden sm:block"
                />
                <motion.div
                  style={{ x: mousePosition.x * -0.2, y: mousePosition.y * -0.2 }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full border border-red-500/20 rounded-3xl hidden sm:block"
                />

                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-red-500/20 p-[1px]">
                  <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-black" />
                </div>

                {/* Main Image Container */}
                <motion.div
                  className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 group"
                  style={{ x: mousePosition.x * 0.1, y: mousePosition.y * 0.1 }}
                >
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985fe3d1592ba78dd703b40/2e84e8e71_WhatsAppImage2025-11-14at72740PM.jpg"
                    alt="ZEERAK SHAHZAD - Cybersecurity Analyst"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      filter: 'contrast(1.1) saturate(0.85) brightness(0.95)',
                    }}
                  />

                  {/* Gradient Overlays - Desktop only for clean mobile view */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

                  {/* Minimal mobile gradient - just bottom fade */}
                  <div className="sm:hidden absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />

                  {/* Color tint - desktop only */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-red-900/10 mix-blend-overlay" />

                  {/* Hover glow - desktop only */}
                  <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />

                  {/* Scan line effect - desktop only for performance */}
                  <motion.div
                    className="hidden sm:block absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
                    animate={{ y: ['100%', '-100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute -bottom-8 -right-4 md:right-8 glass-card-premium rounded-2xl p-6 glow-amber-hover cursor-default"
                >
                  <motion.div
                    className="text-4xl font-light text-white mb-1 font-display"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    6+
                  </motion.div>
                  <div className="text-xs tracking-[0.2em] text-amber-400/60 uppercase">Certs</div>
                </motion.div>

                {/* Sparkle icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-4 -left-4 glass-card-premium rounded-xl p-3"
                >
                  <Sparkles className="w-5 h-5 text-amber-400/70" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs tracking-[0.5em] text-amber-400/80 uppercase font-medium">About</span>
              <motion.span
                className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 leading-[1.1] font-display">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                Building secure
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-gradient inline-block"
              >
                digital futures
              </motion.span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-white/50 leading-relaxed"
            >
              <p className="text-lg">
                I am a Cybersecurity student at <span className="text-white/80 font-medium">FAST-NUCES</span> specializing in SOC operations,
                threat detection, and offensive security.
              </p>
              <p>
                I bridge the gap between technical defense - using SIEM tools like <span className="text-amber-400/80">Splunk</span> and <span className="text-amber-400/80">Wazuh</span> - and
                regulatory compliance as a <span className="text-white/80 font-medium">Certified ISO/IEC 27001:2022 Lead Auditor</span>. My expertise
                includes penetration testing, incident response, and security automation.
              </p>
              <p>
                I am committed to continuous learning, currently working toward my <span className="text-orange-400/80">ISC2 CC</span> certification,
                and I thrive in dynamic, global environments focused on enhancing organizational security posture.
              </p>
            </motion.div>

            {/* Quick Facts with 3D Tilt Cards */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <TiltCard className="relative group glass-card-premium rounded-2xl p-4 cursor-default overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                      <fact.icon className="w-3 h-3 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
                      <div className="text-xs tracking-[0.2em] text-white/30 uppercase">{fact.label}</div>
                    </div>
                    <div className="text-white/80 font-light group-hover:text-amber-300 transition-colors duration-300">{fact.value}</div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}