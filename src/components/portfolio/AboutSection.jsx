import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, Code, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden noise-overlay">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Accents - Static for performance */}
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-amber-500/10 to-transparent rounded-full blur-[60px]"
        style={{ transform: 'translateZ(0)' }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-gradient-to-r from-red-500/10 to-transparent rounded-full blur-[60px]"
        style={{ transform: 'translateZ(0)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div style={{ y: imageY, scale: imageScale }} className="relative">
              {/* Image Frame */}
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: [0, 2, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-6 -left-6 w-full h-full border border-amber-500/20 rounded-3xl"
                />
                <motion.div
                  animate={{ rotate: [0, -2, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 w-full h-full border border-red-500/20 rounded-3xl"
                />

                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-red-500/20 p-[1px]">
                  <div className="w-full h-full rounded-3xl bg-black" />
                </div>

                {/* Main Image Container with Premium Effects */}
                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 group">
                  {/* The Image with blend mode and filters to match dark theme */}
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6985fe3d1592ba78dd703b40/2e84e8e71_WhatsAppImage2025-11-14at72740PM.jpg"
                    alt="ZEERAK SHAHZAD - Cybersecurity Analyst"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    style={{
                      filter: 'contrast(1.1) saturate(0.85) brightness(0.95)',
                    }}
                  />

                  {/* Multiple Gradient Overlays for Seamless Blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                  {/* Color Tint Overlay to match theme */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-red-900/20 mix-blend-overlay" />

                  {/* Subtle Noise Texture */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }}
                  />

                  {/* Vignette Effect */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
                  }} />

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />
                </div>

                {/* Floating Badge with Glass Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-8 -right-4 md:right-8 glass-card rounded-2xl p-6 glow-amber-hover cursor-default"
                >
                  <div className="text-4xl font-light text-white mb-1 font-display">6+</div>
                  <div className="text-xs tracking-[0.2em] text-amber-400/60 uppercase">Certs</div>
                </motion.div>

                {/* Additional Floating Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-4 -left-4 glass rounded-xl p-3"
                >
                  <Sparkles className="w-5 h-5 text-amber-400/70" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs tracking-[0.5em] text-amber-400/80 uppercase font-medium">About</span>
              <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 leading-[1.1] font-display">
              Building secure
              <br />
              <span className="text-gradient">digital futures</span>
            </h2>

            <div className="space-y-6 text-white/50 leading-relaxed">
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
            </div>

            {/* Quick Facts with Premium Cards */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              {[
                { label: 'Location', value: 'Karachi, Pakistan', icon: MapPin },
                { label: 'Focus', value: 'SOC & Threat Ops', icon: Briefcase },
                { label: 'Tools', value: 'Python, Splunk, Wazuh', icon: Code },
                { label: 'Status', value: 'Open to Work', icon: Sparkles },
              ].map((fact) => (
                <motion.div
                  key={fact.label}
                  className="group glass-hover rounded-2xl p-4 cursor-default"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <fact.icon className="w-3 h-3 text-amber-400/60" />
                    <div className="text-xs tracking-[0.2em] text-white/30 uppercase">{fact.label}</div>
                  </div>
                  <div className="text-white/80 font-light group-hover:text-amber-300 transition-colors duration-300">{fact.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}