import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Automated OS Vulnerability Monitoring & Patch System',
    category: 'Security Automation',
    description: 'Built a comprehensive vulnerability management system integrating OpenVAS for scanning, automated patch deployment for Linux/Windows, and rollback for failed patches. Features real-time monitoring GUI with Tkinter for status tracking, scheduled scans, and security dashboards.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenVAS', 'PowerShell', 'Paramiko', 'Tkinter'],
    year: '2024',
    github: 'https://github.com/Gustav1814/Automated-OS-Vulnerability-Monitoring-and-Patch-Update-System',
  },
  {
    id: 2,
    title: 'CyberSec Trojan Simulation (Educational RAT)',
    category: 'Red Team Research',
    description: 'Developed an educational malware simulation tool demonstrating adversary techniques: webcam snapshots, clipboard sniffing, system info gathering, and screen capture. Built with ethical disclaimers for controlled cybersecurity research and training environments.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenCV', 'PyAutoGUI', 'Psutil'],
    year: '2024',
    github: 'https://github.com/Gustav1814/CyberSec_Trojan_Sim',
  },
  {
    id: 3,
    title: 'SDN Load Balancing with Mininet & POX',
    category: 'Network Security',
    description: 'Designed and implemented dynamic load balancing in an SDN environment using Mininet and POX controller. Integrated Round Robin and Least Connection algorithms to optimize traffic across 8-10 clients with Python-based web servers and centralized switch.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['SDN', 'Mininet', 'POX', 'Python', 'Network Security'],
    year: '2024',
    github: 'https://github.com/Gustav1814/SDN-LOAD-BALANCER',
  },
  {
    id: 4,
    title: 'Pucket AI Strategy Game',
    category: 'AI & Development',
    description: 'Demonstration of AI logic through strategic game development showcasing minimax algorithms, state evaluation, and decision trees. Highlights programming versatility and problem-solving in competitive scenarios.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    tags: ['AI', 'Game Dev', 'Python', 'Algorithms'],
    year: '2023',
    github: 'https://github.com/Gustav1814/pucket-ai-game',
  },
];

// 3D Tilt Project Card
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setMousePosition({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateX: -mousePosition.y * 0.5,
          rotateY: mousePosition.x * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900"
      >
        {/* Image with parallax effect */}
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          animate={{
            x: mousePosition.x * 5,
            y: mousePosition.y * 5,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, rgba(251,191,36,0.1), transparent 40%)`,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                {project.category}
              </motion.span>
              <span className="text-xs text-white/40 font-mono">{project.year}</span>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 border border-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 border border-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ transform: 'translateZ(40px)' }}>
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-3 group-hover:text-amber-200 transition-colors duration-300"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-white/60 transition-colors">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-xs text-white/40 tracking-wider px-2 py-1 bg-white/5 rounded-md hover:text-amber-400/80 hover:bg-amber-500/10 transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 transition-colors duration-500"
          animate={{
            borderColor: isHovered ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.05)',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-transparent group-hover:border-amber-500/30 rounded-tl-2xl transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-transparent group-hover:border-red-500/30 rounded-br-2xl transition-all duration-500" />
      </motion.div>
    </motion.article>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="projects" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.05) 0%, transparent 50%)',
          x: backgroundX,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-4"
            >
              <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Portfolio</span>
              <motion.span
                className="w-24 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1]"
            >
              Selected
              <br />
              <span className="text-white/40">Work</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden md:block text-right"
          >
            <div className="text-6xl font-light text-white/10 font-display">04</div>
            <div className="text-xs tracking-[0.2em] text-white/30 uppercase">Projects</div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/Gustav1814"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors group px-6 py-3 rounded-full glass-card-premium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm tracking-[0.2em] uppercase">View All Projects</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}