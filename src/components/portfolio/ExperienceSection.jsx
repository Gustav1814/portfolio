import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'IT & Security Intern – Enterprise Infrastructure',
    company: 'Lucky Textile Mills Limited',
    period: 'Jul 2024 - Sep 2024',
    location: 'Karachi, Pakistan',
    description: 'Secured business-critical Oracle Databases by implementing RMAN encryption backups and strict access controls. Utilized Splunk for log analysis and security event monitoring, contributing to incident detection and faster response times.',
    achievements: [
      'Oracle DB Security & RMAN Backups',
      'Splunk SIEM Monitoring',
      'Linux Server Hardening',
      'Firewall & VPN Audits',
      'Bash Security Automation'
    ]
  },
  {
    id: 2,
    role: 'IT & Infrastructure Intern – Systems & Security',
    company: 'Alkaram Textile Mills Pvt. Ltd',
    period: 'Jun 2024 - Jul 2024',
    location: 'Karachi, Pakistan',
    description: 'Monitored firewall activity and ensured secure configurations, enhancing network defense. Performed SQL queries, data backups, and managed access control. Conducted log reviews to identify security gaps and assisted in incident triage.',
    achievements: [
      'Firewall Security & Config',
      'Database Access Control',
      'Log Analysis & Incident Triage',
      'Server Health Monitoring',
      'Attack Surface Reduction'
    ]
  },
];

export default function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(1);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Detect mobile for simplified layout
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="experience" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated Background Grid */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Career</span>
          <motion.span
            className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-16 leading-[1.1]"
        >
          Professional
          <br />
          <span className="text-white/40">Journey</span>
        </motion.h2>

        {isMobile ? (
          /* MOBILE LAYOUT - Simple Vertical Stack */
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative glass-card-premium rounded-2xl p-6 overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-amber-400 font-mono text-sm">{exp.period}</span>
                    <h3 className="text-xl font-light text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <span>{exp.company}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* DESKTOP LAYOUT - Interactive Timeline */
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            {/* Timeline Navigation */}
            <div className="relative">
              {/* Animated Vertical Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/10" />
              <motion.div
                className="absolute left-[11px] top-0 w-px bg-gradient-to-b from-amber-500 to-red-500"
                initial={{ height: 0 }}
                animate={isInView ? { height: `${(activeExp / experiences.length) * 100}%` } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="space-y-2">
                {experiences.map((exp, index) => (
                  <motion.button
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => setActiveExp(exp.id)}
                    className={`relative w-full text-left pl-10 py-6 pr-6 rounded-r-2xl transition-all duration-500 ${activeExp === exp.id
                      ? 'bg-white/5'
                      : 'hover:bg-white/[0.02]'
                      }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Timeline Dot with pulse effect */}
                    <motion.div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 transition-all duration-300 ${activeExp === exp.id
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400/50'
                        : 'bg-black border-white/20'
                        }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {activeExp === exp.id && (
                        <>
                          <motion.span
                            className="absolute inset-0 rounded-full bg-amber-400"
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.span
                            className="absolute inset-0 rounded-full bg-amber-400"
                            animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          />
                        </>
                      )}
                    </motion.div>

                    <div className="text-xs text-white/30 tracking-wider mb-1 font-mono">{exp.period}</div>
                    <div className={`text-lg transition-colors duration-300 ${activeExp === exp.id ? 'text-white' : 'text-white/50'
                      }`}>
                      {exp.role}
                    </div>
                    <div className="text-sm text-white/30">{exp.company}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Experience Details */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {experiences.filter(e => e.id === activeExp).map(exp => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    className="relative glass-card-premium rounded-3xl p-8 md:p-12 overflow-hidden"
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-8 relative z-10">
                      <div>
                        <motion.h3
                          className="text-2xl md:text-3xl font-light text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {exp.role}
                        </motion.h3>
                        <motion.div
                          className="flex items-center gap-4 text-white/40"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span>{exp.company}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span>{exp.location}</span>
                        </motion.div>
                      </div>
                      <motion.div
                        className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 border border-white/10 font-mono"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                      >
                        {exp.period}
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-white/50 leading-relaxed mb-8 text-lg relative z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {exp.description}
                    </motion.p>

                    {/* Achievements */}
                    <div className="relative z-10">
                      <motion.div
                        className="text-xs tracking-[0.2em] text-white/30 uppercase mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Key Achievements
                      </motion.div>
                      <div className="flex flex-wrap gap-3">
                        {exp.achievements.map((achievement, i) => (
                          <motion.span
                            key={achievement}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/70 border border-white/5 hover:border-amber-500/30 hover:text-amber-300 transition-colors cursor-default"
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Number */}
                    <motion.div
                      className="absolute top-8 right-8 text-8xl font-bold text-white/[0.02] select-none font-display"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      0{exp.id}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )
        }
      </div >
    </section >
  );
}