import React from 'react';
import { motion } from 'framer-motion';

const certifications = [
  { name: 'ISO/IEC 27001:2022 Lead Auditor', issuer: 'Mastermind Assurance', year: '2024', color: 'from-red-500 to-orange-500', url: 'https://learn.mastermindassurance.com/certificates/nvm9vwxheg' },
  { name: 'CCEP - Certified Cybersecurity Educator', issuer: 'RedTeam Leaders', year: '2024', color: 'from-amber-500 to-yellow-500', url: 'https://courses.redteamleaders.com/exam-completion/307ef63cb818ce20' },
  { name: 'Threat Intelligence Analyst', issuer: 'arcX', year: '2024', color: 'from-orange-500 to-red-500', url: 'https://arcx.io/verify-certificate?id=ce41aa57cf06cab3ec76eba024420d8ee94f3eb1&k=bc20a38ac035487bb8627f2c8e844bcf' },
  { name: 'Threat Landscape 3.0', issuer: 'Fortinet', year: '2026', color: 'from-yellow-500 to-amber-500' },
  { name: 'Introduction to CIP', issuer: 'OPSWAT', year: '2024', color: 'from-red-500 to-rose-500', url: 'https://learn.opswatacademy.com/certificate/5xundbUeCA' },
  { name: 'SOC 2 Essentials', issuer: 'Scytale', year: '2024', color: 'from-amber-500 to-orange-500', url: 'https://academy.scytale.ai/certificates/snllaqyby4' },
];

const achievements = [
  { title: 'Lead Auditor', platform: 'ISO 27001:2022', stat: 'Certified', desc: 'GRC & Compliance' },
  { title: 'Security Automation', platform: 'Python & SOAR', stat: 'Expert', desc: 'DevSecOps' },
  { title: 'SIEM Engineer', platform: 'Splunk & Wazuh', stat: 'Advanced', desc: 'Threat Detection' },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Credentials</span>
          <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Certifications */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extralight text-white mb-12 leading-[1.1]"
            >
              Certifications
              <br />
              <span className="text-white/40">& Badges</span>
            </motion.h2>

            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <a href={cert.url || '#'} target="_blank" rel="noopener noreferrer" className="block relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden">
                    {/* Gradient Accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="text-xs text-white/30 mb-2">{cert.year}</div>
                    <div className="text-lg font-light text-white group-hover:text-amber-200 transition-colors mb-1">
                      {cert.name}
                    </div>
                    <div className="text-xs text-white/40">{cert.issuer}</div>
                    {cert.url && <div className="text-xs text-amber-400/60 mt-2">View Certificate →</div>}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-light text-white/60 mb-12"
            >
              Community Recognition
            </motion.h3>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-amber-500/20 transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs tracking-[0.2em] text-amber-400/60 uppercase mb-2">
                        {achievement.platform}
                      </div>
                      <div className="text-xl font-light text-white mb-1">
                        {achievement.title}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-light text-white">
                        {achievement.stat}
                      </div>
                      <div className="text-xs text-white/40">
                        {achievement.desc}
                      </div>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-transparent origin-left"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 p-6 rounded-2xl border border-dashed border-white/10 text-center"
            >
              <div className="text-white/20 text-sm">
                Always learning, always growing.
                <br />
                <span className="text-white/40">Currently studying for OSWE certification.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}