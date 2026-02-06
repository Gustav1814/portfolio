import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Automated OS Vulnerability Monitoring',
    category: 'Security Tool',
    description: 'Integrated system using OpenVAS for scanning and PowerShell/Bash for automated multi-OS patching. Features a Python (Tkinter) GUI for real-time status tracking and audit logging.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenVAS', 'PowerShell', 'Bash'],
    year: '2024',
    github: 'https://github.com/Gustav1814/Automated-OS-Vulnerability-Monitoring-and-Patch-Update-System',
  },
  {
    id: 2,
    title: 'CyberSec Trojan Sim',
    category: 'Educational RAT',
    description: 'Python-based simulator for ethical research into adversary techniques like keylogging, webcam snapshots, and data exfiltration.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    tags: ['Python', 'Ethical Hacking', 'Research'],
    year: '2024',
    github: 'https://github.com/Gustav1814/CyberSec_Trojan_Sim',
  },
  {
    id: 3,
    title: 'SDN Load Balancing',
    category: 'Network Security',
    description: 'Dynamic load balancing in SDN environment using Mininet and POX controller. Optimizes traffic via Round Robin and Least Connection algorithms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['SDN', 'Mininet', 'POX', 'Python'],
    year: '2023',
    github: 'https://github.com/Gustav1814/SDN-LOAD-BALANCER',
  },
  {
    id: 4,
    title: 'Pucket AI Game',
    category: 'AI Project',
    description: 'Demonstration of AI logic and general programming versatility through game development.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    tags: ['AI', 'Game Dev', 'Python'],
    year: '2023',
    github: 'https://github.com/Gustav1814/pucket-ai-game',
  },
];

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="projects" className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.4em] text-amber-400/80 uppercase">Portfolio</span>
              <span className="w-24 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[1.1]"
            >
              Selected
              <br />
              <span className="text-white/40">Work</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block text-right"
          >
            <div className="text-5xl font-light text-white/10">04</div>
            <div className="text-xs tracking-[0.2em] text-white/30 uppercase">Projects</div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/70">
                        {project.category}
                      </span>
                      <span className="text-xs text-white/40">{project.year}</span>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs text-white/40 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-500"
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
          >
            <span className="text-sm tracking-[0.2em] uppercase">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}