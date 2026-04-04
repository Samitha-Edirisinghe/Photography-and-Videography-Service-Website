import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Linkedin, Heart, Mail, Send } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import logo from '../../imports/logo-1.png';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Thank you for subscribing!');
    }, 1000);
  };

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  const footerLinks = {
    Studio: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Process', href: '/about' },
    ],
    Services: [
      { name: 'Wedding Photography', href: '/services' },
      { name: 'Cinematography', href: '/services' },
      { name: 'Editorial & Fashion', href: '/services' },
      { name: 'Lifestyle', href: '/services' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 py-20 relative z-10">
        {/* Top section */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-16 mb-16">
          {/* Logo & Description */}
          <StaggerItem className="lg:col-span-2">
            <Link to="/">
              <motion.img
                src={logo}
                alt="Menaric Logo"
                className="h-10 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <motion.p 
              className="text-muted-foreground leading-relaxed mb-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Creating timeless visual narratives with elegance, artistry, 
              and meticulous attention to every precious moment.
            </motion.p>
            
            {/* Social Icons - thin, elegant style */}
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300 group relative overflow-hidden"
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-[var(--gold)] transition-colors relative z-10" strokeWidth={1.5} />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-[var(--gold)]/20 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </StaggerItem>

          {/* Links - 2 columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <StaggerItem key={title}>
              <motion.h4 
                className="text-sm font-medium mb-6 tracking-wide"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + columnIndex * 0.1 }}
              >
                {title}
              </motion.h4>
              <ul className="space-y-4">
                {links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + columnIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors duration-300 inline-block relative group"
                    >
                      {link.name}
                      <motion.span 
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold)] group-hover:w-full transition-all duration-300"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          {/* Stay Updated - Newsletter */}
          <StaggerItem className="lg:col-span-2">
            <motion.h4 
              className="text-sm font-medium mb-6 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Stay Updated
            </motion.h4>
            <motion.p 
              className="text-sm text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Subscribe to our newsletter for exclusive updates, photography tips, and special offers.
            </motion.p>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 focus:border-[var(--gold)] transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--gold)] text-white py-3 px-6 rounded-full transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={!isSubmitting ? {
                  scale: 1.08,
                  y: -5,
                  rotateX: 10,
                  rotateY: -5,
                  boxShadow: '0 30px 80px rgba(198, 151, 53, 0.6)',
                } : {}}
                whileTap={!isSubmitting ? {
                  scale: 0.95,
                  y: 0,
                  rotateX: 0,
                  rotateY: 0,
                } : {}}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? 'Processing...' : 'Subscribe'}
                  {!isSubmitting && (
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        x: { duration: 1.5, repeat: Infinity },
                        rotate: { duration: 4, repeat: Infinity, ease: 'linear' }
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  )}
                </span>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%', skewX: -15 }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Continuous shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%', skewX: -20 }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                />

                {/* Pulsing glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(255, 255, 255, 0)',
                      '0 0 20px rgba(255, 255, 255, 0.5)',
                      '0 0 0px rgba(255, 255, 255, 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Particle burst on hover */}
                <motion.div className="absolute inset-0" whileHover="hover">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      variants={{
                        hover: {
                          x: Math.cos(i * Math.PI / 4) * 30,
                          y: Math.sin(i * Math.PI / 4) * 30,
                          opacity: [1, 0],
                          scale: [0, 1, 0],
                        }
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  ))}
                </motion.div>

                {/* 3D depth shadow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50"
                  style={{ transform: 'translateZ(-10px)' }}
                />
              </motion.button>
            </motion.form>
          </StaggerItem>
        </StaggerContainer>

        {/* Subtle divider line with animation */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Bottom section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            © 2026 Menaric Wedding Films. All rights reserved.
          </motion.p>

          {/* Designer credit */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Design By{' '}
            <a 
              href="https://www.linkedin.com/in/samitha-randika-edirisinghe-b3a68a2b6" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:underline transition-all duration-300 relative inline-block group"
            >
              Samitha Randika
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--gold)] group-hover:w-full transition-all duration-300"
              />
            </a>
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}