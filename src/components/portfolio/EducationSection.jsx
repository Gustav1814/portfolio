import React from 'react';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.S. Cybersecurity',
    school: 'FAST-NUCES',
    period: '2021 - Present',
    focus: 'SOC Operations, Threat Detection & Offensive Security',
    highlights: ['ISO 27001 Lead Auditor', 'Security Automation', 'SIEM Engineering']
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[400px] bg-gradient-to-r from-amber-500/5 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Academic</span>
          <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-16 leading-[1.1]"
        >
          Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-500">
                {/* Year Badge */}
                <div className="absolute top-8 right-8 text-xs tracking-wider text-white/30">
                  {edu.period}
                </div>

                <div className="text-5xl font-extralight text-white/5 mb-6">
                  0{index + 1}
                </div>

                <div className="text-xs tracking-[0.2em] text-amber-400/60 uppercase mb-2">
                  {edu.school}
                </div>
                <h3 className="text-2xl font-light text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-white/40 mb-6">{edu.focus}</p>

                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map(highlight => (
                    <span
                      key={highlight}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-xs text-white/60"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continuous Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-white/5 bg-white/[0.01]"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.2em] text-white/30 uppercase mb-2">Continuous Learning</div>
              <div className="text-white/60">Currently completing certifications in cloud security and advanced penetration testing.</div>
            </div>
            <div className="flex gap-4">
              {['SANS', 'AWS', 'OffSec'].map(provider => (
                <div
                  key={provider}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/40"
                >
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}