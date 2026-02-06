import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'zeerak.shahzad2000@outlook.com', href: 'mailto:zeerak.shahzad2000@outlook.com' },
  { icon: MapPin, label: 'Location', value: 'Pakistan', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/zeerakshahzad1814', href: 'https://www.linkedin.com/in/zeerakshahzad1814' },
  { icon: Github, label: 'GitHub', value: 'gustav1814', href: 'https://github.com/gustav1814' },
];

// Animated input component
const AnimatedInput = ({ label, type = 'text', value, onChange, required, rows }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const Component = rows ? 'textarea' : 'input';

  return (
    <div className="relative group">
      <Component
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-6 py-4 bg-white/[0.03] border rounded-xl text-white placeholder-transparent focus:outline-none transition-all duration-300 font-light peer ${isFocused ? 'border-amber-500/50 bg-white/[0.05]' : 'border-white/10 hover:border-white/20'
          } ${rows ? 'resize-none' : ''}`}
        placeholder={label}
      />
      <motion.label
        className="absolute left-6 transition-all duration-300 pointer-events-none text-white/30"
        animate={{
          y: isFocused || hasValue ? -28 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.3)',
        }}
        style={{ top: rows ? '1rem' : '50%', translateY: rows ? 0 : '-50%', originX: 0 }}
      >
        {label}
      </motion.label>
      {/* Focus glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isFocused
            ? '0 0 20px rgba(245, 158, 11, 0.1), inset 0 0 20px rgba(245, 158, 11, 0.02)'
            : '0 0 0 rgba(245, 158, 11, 0), inset 0 0 0 rgba(245, 158, 11, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Mobile check
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        setSubmitSuccess(true);
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated Background Accents - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-red-500/5 blur-[80px]"
          />
        </>
      )}

      {/* Large Background Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-bold text-white/[0.015] whitespace-nowrap select-none pointer-events-none font-display tracking-wider"
        style={{ x: '-50%', y: '-50%' }}
      >
        CONTACT
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-premium mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-red-500"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-light tracking-[0.2em] text-white/60 uppercase">Get in Touch</span>
          </motion.div>
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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Contact Information</h3>
              <p className="text-white/40 font-light leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing
                new projects, creative ideas, or opportunities to be part of your cybersecurity initiatives.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ x: 10, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-4 p-5 rounded-2xl glass-card-premium transition-all duration-300 ${item.href ? 'cursor-pointer' : 'cursor-default'
                    }`}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-red-500/20 flex items-center justify-center border border-white/10 group-hover:border-amber-500/30 transition-colors"
                    whileHover={{ rotate: 5 }}
                  >
                    <item.icon className="w-5 h-5 text-amber-400" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-xs text-white/40 uppercase tracking-wider">{item.label}</div>
                    <div className="text-white/80 font-light group-hover:text-white transition-colors">{item.value}</div>
                  </div>
                  {item.href && (
                    <motion.div
                      className="text-white/20 group-hover:text-amber-400 transition-colors"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <AnimatedInput
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <AnimatedInput
                label="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl text-white font-medium flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />

                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      ✓
                    </motion.span>
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Send Message</span>
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