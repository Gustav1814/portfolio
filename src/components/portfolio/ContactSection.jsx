import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactLinks = [
  { label: 'Email', value: 'zeerak.shahzad2000@outlook.com', href: 'mailto:zeerak.shahzad2000@outlook.com', icon: Mail },
  { label: 'Phone', value: '+92 (313) 2349459', href: 'tel:+923132349459', icon: Phone },
  { label: 'LinkedIn', value: 'linkedin.com/in/zeerakshahzad1814', href: 'https://www.linkedin.com/in/zeerakshahzad1814', icon: Linkedin },
  { label: 'GitHub', value: 'github.com/gustav1814', href: 'https://github.com/gustav1814', icon: Github },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-black overflow-hidden noise-overlay">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background Accents */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-amber-500/10 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-red-500/10 to-transparent rounded-full blur-[100px]"
      />

      {/* Large Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] whitespace-nowrap select-none pointer-events-none font-display tracking-wider">
        CONTACT
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs tracking-[0.5em] text-amber-400/80 uppercase font-medium">Contact</span>
              <span className="flex-1 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-8 leading-[1.1] font-display"
            >
              Let's build
              <br />
              <span className="text-gradient">something secure</span>
            </motion.h2>

            <p className="text-white/40 max-w-md mb-12 leading-relaxed">
              Have a project in mind or want to discuss security?
              I'm always open to interesting opportunities and collaborations.
            </p>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between p-5 rounded-2xl glass-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-white/5 group-hover:border-amber-500/30 transition-colors">
                      <link.icon className="w-4 h-4 text-white/50 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 tracking-wider uppercase mb-1">{link.label}</div>
                      <div className="text-white/70 group-hover:text-white transition-colors">{link.value}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-3 font-medium">Your Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ZEERAK SHAHZAD"
                    required
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl h-14 px-5 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-3 font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl h-14 px-5 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-3 font-medium">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or security needs..."
                  rows={6}
                  required
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl p-5 resize-none transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-black font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 glow-amber-hover"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-4">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="text-white/80 font-medium">Available for new projects</div>
                  <div className="text-white/40 text-sm">Typically respond within 24 hours</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}