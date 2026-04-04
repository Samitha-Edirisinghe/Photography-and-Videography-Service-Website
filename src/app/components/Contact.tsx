import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [focused, setFocused] = useState<string | null>(null);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@luxurystudio.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'New York, NY' },
  ];

  return (
    <section id="contact" className="py-32 lg:py-48 bg-background" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
              Contact Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Let's Begin Your <span className="text-[var(--gold)]">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your vision with us, and we'll bring it to life with artistry and excellence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Info */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Get in Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We'd love to hear from you. Whether you're planning a wedding, need lifestyle 
                photography, or have a creative project in mind, reach out and let's create 
                something beautiful together.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-5 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[var(--gold)]/10 rounded-xl group-hover:bg-[var(--gold)]/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1 font-medium">{item.label}</div>
                    <div className="text-base">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office Hours */}
            <motion.div
              className="pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h4 className="text-sm font-medium mb-3">Studio Hours</h4>
              <p className="text-muted-foreground text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: By Appointment
                <br />
                Sunday: Closed
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form - clean, minimal with rounded inputs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Full Name <span className="text-[var(--gold)]">*</span>
                </label>
                <motion.input
                  type="text"
                  className={`w-full px-6 py-4 bg-card border-2 rounded-xl transition-all duration-300 outline-none ${
                    focused === 'name' 
                      ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                      : 'border-border hover:border-[var(--gold)]/40'
                  }`}
                  placeholder="John Doe"
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Email Address <span className="text-[var(--gold)]">*</span>
                </label>
                <motion.input
                  type="email"
                  className={`w-full px-6 py-4 bg-card border-2 rounded-xl transition-all duration-300 outline-none ${
                    focused === 'email' 
                      ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                      : 'border-border hover:border-[var(--gold)]/40'
                  }`}
                  placeholder="john@example.com"
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Phone Number
                </label>
                <motion.input
                  type="tel"
                  className={`w-full px-6 py-4 bg-card border-2 rounded-xl transition-all duration-300 outline-none ${
                    focused === 'phone' 
                      ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                      : 'border-border hover:border-[var(--gold)]/40'
                  }`}
                  placeholder="+1 (555) 000-0000"
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Service of Interest <span className="text-[var(--gold)]">*</span>
                </label>
                <motion.select
                  className={`w-full px-6 py-4 bg-card border-2 rounded-xl transition-all duration-300 outline-none ${
                    focused === 'service' 
                      ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                      : 'border-border hover:border-[var(--gold)]/40'
                  }`}
                  onFocus={() => setFocused('service')}
                  onBlur={() => setFocused(null)}
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="cinematography">Luxury Cinematography</option>
                  <option value="fashion">Editorial & Fashion</option>
                  <option value="lifestyle">Lifestyle Sessions</option>
                  <option value="other">Other</option>
                </motion.select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Your Message <span className="text-[var(--gold)]">*</span>
                </label>
                <motion.textarea
                  rows={5}
                  className={`w-full px-6 py-4 bg-card border-2 rounded-xl transition-all duration-300 outline-none resize-none ${
                    focused === 'message' 
                      ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                      : 'border-border hover:border-[var(--gold)]/40'
                  }`}
                  placeholder="Tell us about your vision..."
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Submit Button */}
              <PremiumButton
                type="submit"
                variant="primary"
                icon={Send}
                fullWidth
                className="px-10 py-5 rounded-xl"
              >
                Send Message
              </PremiumButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
