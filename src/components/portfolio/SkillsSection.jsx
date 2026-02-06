import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
  {
    id: 'security',
    title: 'SOC & Threat Ops',
    color: 'from-red-500 to-orange-500',
    skills: [
      { name: 'Splunk (SIEM)', level: 90 },
      { name: 'Wazuh XDR', level: 88 },
      { name: 'Threat Hunting', level: 85 },
      { name: 'MITRE ATT&CK Framework', level: 88 },
      { name: 'Incident Response', level: 85 },
      { name: 'Nessus & Wireshark', level: 82 },
    ]
  },
  {
    id: 'offensive',
    title: 'Offensive Security',
    color: 'from-amber-500 to-yellow-500',
    skills: [
      { name: 'Metasploit Pro', level: 85 },
      { name: 'Burp Suite', level: 88 },
      { name: 'OWASP Top 10', level: 90 },
      { name: 'Nmap', level: 85 },
      { name: 'Malware Analysis', level: 78 },
      { name: 'Penetration Testing', level: 82 },
    ]
  },
  {
    id: 'devops',
    title: 'DevSecOps & Automation',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Bash & PowerShell', level: 85 },
      { name: 'Ansible', level: 78 },
      { name: 'Terraform', level: 75 },
      { name: 'Docker', level: 80 },
      { name: 'Jenkins CI/CD', level: 75 },
    ]
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('security');

  const activeData = skillCategories.find(c => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] bg-gradient-to-l from-amber-500/5 via-transparent to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Expertise</span>
          <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Title & Categories */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[1.1]"
            >
              Technical
              <br />
              <span className="text-white/40">Arsenal</span>
            </motion.h2>

            <p className="text-white/40 max-w-md mb-12">
              Years of hands-on experience building secure systems and breaking them to make them stronger.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-col gap-3">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 ${
                    activeCategory === category.id
                      ? 'bg-white/5 border border-white/10'
                      : 'hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  {/* Active Indicator */}
                  <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${category.color} transition-opacity duration-300 ${
                    activeCategory === category.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'
                  }`} />
                  
                  <div className="text-left">
                    <div className={`text-xl font-light transition-colors duration-300 ${
                      activeCategory === category.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                    }`}>
                      {category.title}
                    </div>
                    <div className="text-xs text-white/30 tracking-wider mt-1">
                      {category.skills.length} SKILLS
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className={`ml-auto text-white/20 transition-all duration-300 ${
                    activeCategory === category.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}>
                    →
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right - Skills Display */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {activeData?.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-white/30 text-sm tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${activeData.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-20 h-20 border border-white/5 rounded-full" />
          </div>
        </div>

        {/* Tools Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 overflow-hidden"
        >
          <div className="flex animate-marquee">
            {['Splunk', 'Wazuh', 'Nessus', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Python', 'Ansible', 'Docker', 'Linux', 'Oracle RMAN', 'Splunk', 'Wazuh', 'Nessus', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Python'].map((tool, i) => (
              <span
                key={i}
                className="flex items-center gap-4 px-8 text-white/20 text-sm tracking-[0.2em] whitespace-nowrap"
              >
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}