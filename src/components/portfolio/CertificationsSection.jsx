import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Shield, Cpu, Lock } from 'lucide-react';

const certifications = [
  { name: 'ISO/IEC 27001:2022 Lead Auditor', issuer: 'Mastermind Assurance', year: '2024', color: 'from-red-500 to-orange-500', url: 'https://learn.mastermindassurance.com/certificates/nvm9vwxheg' },
  { name: 'CCEP - Certified Cybersecurity Educator', issuer: 'RedTeam Leaders', year: '2024', color: 'from-amber-500 to-yellow-500', url: 'https://courses.redteamleaders.com/exam-completion/307ef63cb818ce20' },
  { name: 'ISC2 Certified in Cybersecurity (CC)', issuer: 'ISC2', year: '2024', color: 'from-blue-500 to-cyan-500' },
  { name: 'Threat Intelligence Analyst', issuer: 'arcX', year: '2024', color: 'from-orange-500 to-red-500', url: 'https://arcx.io/verify-certificate?id=ce41aa57cf06cab3ec76eba024420d8ee94f3eb1&k=bc20a38ac035487bb8627f2c8e844bcf' },
  { name: 'Offensive Security Operations', issuer: 'Cybrary', year: '2024', color: 'from-purple-500 to-pink-500' },
  { name: 'Introduction to the Threat Landscape 3.0', issuer: 'Fortinet', year: '2026', color: 'from-yellow-500 to-amber-500' },
  { name: 'SOC 2 Compliance Essentials', issuer: 'Scytale', year: '2024', color: 'from-amber-500 to-orange-500', url: 'https://academy.scytale.ai/certificates/snllaqyby4' },
  { name: 'Introduction to CIP', issuer: 'OPSWAT', year: '2024', color: 'from-red-500 to-rose-500', url: 'https://learn.opswatacademy.com/certificate/5xundbUeCA' },
];

const achievements = [
  { title: 'Lead Auditor', platform: 'ISO 27001:2022', stat: 'Certified', desc: 'GRC & Compliance', icon: Shield },
  { title: 'Security Automation', platform: 'Python & SOAR', stat: 'Expert', desc: 'DevSecOps', icon: Cpu },
  { title: 'SIEM Engineer', platform: 'Splunk & Wazuh', stat: 'Advanced', desc: 'Threat Detection', icon: Lock },
];

// Certification Card with 3D hover effect
const CertCard = ({ cert, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setMousePos({ x: x * 10, y: y * 10 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.a
        href={cert.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative p-6 rounded-2xl glass-card-premium overflow-hidden transition-all duration-500"
        animate={{
          rotateX: -mousePos.y * 0.5,
          rotateY: mousePos.x * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Gradient accent line */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${50 + mousePos.x * 3}% ${50 + mousePos.y * 3}%, rgba(251,191,36,0.08), transparent 50%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/30 font-mono">{cert.year}</span>
            {cert.url && (
              <motion.span
                className="text-amber-400/40 group-hover:text-amber-400 transition-colors"
                animate={{ x: isHovered ? 3 : 0 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            )}
          </div>
          <div className="text-lg font-light text-white group-hover:text-amber-200 transition-colors mb-1">
            {cert.name}
          </div>
          <div className="text-xs text-white/40">{cert.issuer}</div>
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-transparent group-hover:border-amber-500/20 rounded-br-2xl transition-colors duration-500" />
      </motion.a>
    </motion.div>
  );
};

export default function CertificationsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="certifications" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Floating background elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-amber-500/10 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-red-500/10 rounded-2xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Credentials</span>
          <motion.span
            className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Certifications */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extralight text-white mb-12 leading-[1.1]"
            >
              Certifications
              <br />
              <span className="text-white/40">& Badges</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <CertCard key={cert.name} cert={cert} index={index} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-2xl font-light text-white/60 mb-12"
            >
              Community Recognition
            </motion.h3>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="group relative p-8 rounded-2xl glass-card-premium overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center border border-white/10 group-hover:border-amber-500/30 transition-colors"
                        whileHover={{ rotate: 5 }}
                      >
                        <achievement.icon className="w-5 h-5 text-amber-400/70" />
                      </motion.div>
                      <div>
                        <div className="text-xs tracking-[0.2em] text-amber-400/60 uppercase mb-1">
                          {achievement.platform}
                        </div>
                        <div className="text-xl font-light text-white">
                          {achievement.title}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light text-gradient">
                        {achievement.stat}
                      </div>
                      <div className="text-xs text-white/40">
                        {achievement.desc}
                      </div>
                    </div>
                  </div>

                  {/* Animated progress line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Learning status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.01 }}
              className="mt-12 p-6 rounded-2xl border border-dashed border-white/10 text-center glass-card-premium"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 mb-3"
              >
                <Award className="w-5 h-5 text-amber-400/50" />
              </motion.div>
              <div className="text-white/30 text-sm">
                Always learning, always growing.
                <br />
                <span className="text-amber-400/50">Currently studying for ISC2 CC certification.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}