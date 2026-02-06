import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Award, ArrowUp, Heart } from 'lucide-react';

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-amber-500/30 selection:text-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <EducationSection />
      <ContactSection />

      {/* Premium Footer */}
      <footer className="relative py-16 bg-black noise-overlay">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background Accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-amber-500/5 to-transparent blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
            {/* Logo & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              {/* Premium Monogram Logo */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl opacity-20 blur-sm" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-white/10 flex items-center justify-center">
                  <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-amber-200 via-orange-300 to-red-400 bg-clip-text text-transparent">ZS</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-white/60 tracking-[0.3em]">ZEERAK SHAHZAD</div>
                <div className="text-xs text-white/30 tracking-wider">Cybersecurity Analyst</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: Github, url: 'https://github.com/gustav1814', label: 'GitHub' },
                { icon: Linkedin, url: 'https://www.linkedin.com/in/zeerakshahzad1814', label: 'LinkedIn' },
                { icon: Award, url: 'https://www.credly.com/users/zeerak-shahazad/badges', label: 'Credly' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-hover rounded-xl group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/40 group-hover:text-amber-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={scrollToTop}
              className="flex items-center gap-3 glass-hover rounded-full px-6 py-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm text-white/50 group-hover:text-white transition-colors tracking-wider">Back to Top</span>
              <ArrowUp className="w-4 h-4 text-white/50 group-hover:text-amber-400 transition-colors" />
            </motion.button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-white/30 text-sm tracking-wider"
            >
              <span>© 2026</span>
              <span className="text-gradient font-medium">ZEERAK SHAHZAD</span>
              <span>- All Rights Reserved</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-white/30 text-sm"
            >
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>in Karachi, Pakistan</span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}