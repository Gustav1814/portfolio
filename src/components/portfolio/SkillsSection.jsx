import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

const skillCategories = [
  {
    id: 'security',
    title: 'SOC & Threat Ops',
    color: 'from-red-500 to-orange-500',
    colorHex: '#ef4444',
    skills: [
      { name: 'Splunk (SIEM)', level: 92 },
      { name: 'Wazuh XDR', level: 90 },
      { name: 'Threat Hunting', level: 88 },
      { name: 'MITRE ATT&CK Framework', level: 90 },
      { name: 'Incident Response', level: 88 },
      { name: 'Nessus & Wireshark', level: 85 },
    ]
  },
  {
    id: 'offensive',
    title: 'Offensive Security',
    color: 'from-amber-500 to-yellow-500',
    colorHex: '#f59e0b',
    skills: [
      { name: 'Metasploit Pro', level: 88 },
      { name: 'Burp Suite', level: 90 },
      { name: 'OWASP Top 10', level: 92 },
      { name: 'Nmap & Recon', level: 88 },
      { name: 'Malware Analysis', level: 82 },
      { name: 'Penetration Testing', level: 85 },
    ]
  },
  {
    id: 'devops',
    title: 'DevSecOps & Automation',
    color: 'from-orange-500 to-red-500',
    colorHex: '#ea580c',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Bash & PowerShell', level: 88 },
      { name: 'Ansible', level: 80 },
      { name: 'Terraform', level: 78 },
      { name: 'Docker', level: 82 },
      { name: 'Jenkins CI/CD', level: 78 },
    ]
  },
  {
    id: 'grc',
    title: 'GRC & Compliance',
    color: 'from-purple-500 to-pink-500',
    colorHex: '#a855f7',
    skills: [
      { name: 'ISO 27001:2022 (Lead Auditor)', level: 95 },
      { name: 'SOC 2 Compliance', level: 85 },
      { name: 'NIST CSF', level: 88 },
      { name: 'Risk Management', level: 88 },
      { name: 'ISMS Implementation', level: 85 },
      { name: 'IT General Controls (ITGC)', level: 82 },
    ]
  },
];

const tools = ['Splunk', 'Wazuh', 'Nessus', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'Python', 'Ansible', 'Docker', 'Linux', 'Oracle RMAN', 'OpenVAS', 'Terraform', 'Jenkins', 'AWS', 'Azure'];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('security');
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

  const activeData = skillCategories.find(c => c.id === activeCategory);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="skills" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated Background */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse at right, rgba(251,191,36,0.05) 0%, transparent 70%)',
          y: backgroundY,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Expertise</span>
          <motion.span
            className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* MOBILE LAYOUT - Show all categories expanded */}
        {isMobile ? (
          <div className="space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl font-extralight text-white mb-8"
            >
              Technical <span className="text-white/40">Arsenal</span>
            </motion.h2>

            {skillCategories.map((category, catIndex) => (
              <div key={category.id} className="space-y-4">
                <div className={`text-lg font-medium bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{skill.name}</span>
                        <span className="text-white/40">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.05 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP LAYOUT - Tab navigation */
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Title & Categories */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-4 leading-[1.1]"
              >
                Technical
                <br />
                <span className="text-white/40">Arsenal</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-white/40 max-w-md mb-12"
              >
                Years of hands-on experience building secure systems and breaking them to make them stronger.
              </motion.p>

              {/* Category Tabs */}
              <div className="flex flex-col gap-3">
                {skillCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group relative flex items-center gap-6 p-6 rounded-2xl transition-all duration-500 overflow-hidden ${activeCategory === category.id
                      ? 'bg-white/5 border border-white/10'
                      : 'hover:bg-white/[0.02] border border-transparent'
                      }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glow effect on active */}
                    {activeCategory === category.id && (
                      <motion.div
                        layoutId="categoryGlow"
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at left, ${category.colorHex}40, transparent 70%)`,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Active Indicator */}
                    <motion.div
                      className={`w-1 h-12 rounded-full bg-gradient-to-b ${category.color}`}
                      animate={{
                        opacity: activeCategory === category.id ? 1 : 0,
                        scaleY: activeCategory === category.id ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="text-left relative z-10">
                      <div className={`text-xl font-light transition-colors duration-300 ${activeCategory === category.id ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                        }`}>
                        {category.title}
                      </div>
                      <div className="text-xs text-white/30 tracking-wider mt-1">
                        {category.skills.length} SKILLS
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="ml-auto text-xl"
                      animate={{
                        opacity: activeCategory === category.id ? 1 : 0,
                        x: activeCategory === category.id ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-gradient">→</span>
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right - Skills Display */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {activeData?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                        <motion.span
                          className="text-white/30 text-sm tabular-nums font-mono"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.08 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden group-hover:bg-white/10 transition-colors">
                        {/* Background glow */}
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full opacity-50"
                          style={{
                            background: `linear-gradient(90deg, ${activeData.colorHex}40, transparent)`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* Main bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${activeData.color} rounded-full`}
                        />
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ left: '-20%' }}
                          whileInView={{ left: '120%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.5 + index * 0.08 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-20 h-20 border border-white/5 rounded-full pointer-events-none" />
            </div>
          </div>
        )}

        {/* Tools Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-24 overflow-hidden group"
        >
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...tools, ...tools].map((tool, i) => (
              <span
                key={i}
                className="flex items-center gap-4 px-8 text-white/20 text-sm tracking-[0.2em] whitespace-nowrap hover:text-amber-400/60 transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400/40 to-red-400/40 rounded-full" />
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}