import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'zeerak.shahzad2000@outlook.com', href: 'mailto:zeerak.shahzad2000@outlook.com' },
  { icon: MapPin, label: 'Location', value: 'Pakistan', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/zeerakshahzad1814', href: 'https://www.linkedin.com/in/zeerakshahzad1814' },
  { icon: Github, label: 'GitHub', value: 'gustav1814', href: 'https://github.com/gustav1814' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '90c71253-0afe-4bc8-af7c-c5ee6ebcfaa1',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'zeerakshahzad2@gmail.com',
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: 'ZS Portfolio',
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
    }

    setIsSubmitting(false);
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500 animate-pulse" />
            <span className="text-sm font-light tracking-[0.2em] text-white/60 uppercase">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-6 font-display">
            Let's <span className="text-gradient font-light">Connect</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
            Have a project in mind or want to discuss cybersecurity? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Contact Information</h3>
              <p className="text-white/40 font-light leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing
                new projects, creative ideas, or opportunities to be part of your cybersecurity initiatives.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className={`group flex items-center gap-4 p-4 rounded-xl glass-card transition-all ${item.href ? 'cursor-pointer hover:border-amber-500/30' : 'cursor-default'}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-red-500/30 transition-all">
                    <item.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">{item.label}</div>
                    <div className="text-white/80 font-light">{item.value}</div>
                  </div>
                  {item.href && <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-amber-400 transition-colors" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors font-light"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors font-light"
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors resize-none font-light"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl text-white font-medium flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}