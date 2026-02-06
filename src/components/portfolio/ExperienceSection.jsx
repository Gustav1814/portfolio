import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'IT & Security Intern',
    company: 'Lucky Textile Mills Limited',
    period: 'Jul 2024 - Sep 2024',
    location: 'Karachi, Pakistan',
    description: 'Secured business-critical Oracle Databases with RMAN encryption backups. Utilized Splunk for log analysis and security event monitoring. Executed Linux server hardening and automated security tasks using Bash scripting.',
    achievements: ['Oracle DB Security', 'Splunk SIEM', 'Server Hardening', 'Firewall Audits']
  },
  {
    id: 2,
    role: 'IT & Infrastructure Intern',
    company: 'Alkaram Textile Mills Pvt. Ltd',
    period: 'Jun 2024 - Jul 2024',
    location: 'Karachi, Pakistan',
    description: 'Monitored firewall activity and closed insecure ports to reduce organizational attack surface. Managed database access and conducted log reviews for incident triage.',
    achievements: ['Perimeter Security', 'Access Control', 'Incident Triage', 'SQL Queries']
  },
];

export default function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(1);

  return (
    <section id="experience" className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Grid */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Career</span>
          <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-16 leading-[1.1]"
        >
          Professional
          <br />
          <span className="text-white/40">Journey</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
          {/* Timeline Navigation */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveExp(exp.id)}
                  className={`relative w-full text-left pl-10 py-6 pr-6 rounded-r-2xl transition-all duration-500 ${activeExp === exp.id
                      ? 'bg-white/5'
                      : 'hover:bg-white/[0.02]'
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 transition-all duration-300 ${activeExp === exp.id
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400/50 scale-100'
                      : 'bg-black border-white/20 scale-75'
                    }`}>
                    {activeExp === exp.id && (
                      <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
                    )}
                  </div>

                  <div className="text-xs text-white/30 tracking-wider mb-1">{exp.period}</div>
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl p-8 md:p-12 border border-white/5"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-4 text-white/40">
                        <span>{exp.company}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 leading-relaxed mb-8 text-lg">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div>
                    <div className="text-xs tracking-[0.2em] text-white/30 uppercase mb-4">Key Achievements</div>
                    <div className="flex flex-wrap gap-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.span
                          key={achievement}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/70 border border-white/5"
                        >
                          {achievement}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Number */}
                  <div className="absolute top-8 right-8 text-8xl font-bold text-white/[0.02] select-none">
                    0{exp.id}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}