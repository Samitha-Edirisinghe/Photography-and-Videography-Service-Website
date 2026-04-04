import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { PremiumButton } from '../components/PremiumButton';

export function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [focused, setFocused] = useState<string | null>(null);

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: 'hello@menaric.com',
      link: 'mailto:hello@menaric.com'
    },
    { 
      icon: Phone, 
      label: 'Phone', 
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    { 
      icon: MapPin, 
      label: 'Studio Location', 
      value: '123 Creative Avenue, New York, NY 10001',
      link: null
    },
    { 
      icon: Clock, 
      label: 'Business Hours', 
      value: 'Mon-Fri: 9:00 AM - 6:00 PM',
      link: null
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram', handle: '@menaric' },
    { icon: Facebook, href: '#', name: 'Facebook', handle: '/menaric' },
    { icon: Twitter, href: '#', name: 'Twitter', handle: '@menaric' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Let's"
        titleGold="Connect"
        subtitle="Ready to create something extraordinary together? We'd love to hear from you"
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
        tag="Get In Touch"
      />

      {/* Contact Section */}
      <section className="py-32 lg:py-48 bg-background" ref={ref}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Left: Contact Info - 2 columns */}
            <motion.div
              className="lg:col-span-2 space-y-12"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl mb-6">
                  Get in <span className="text-[var(--gold)]">Touch</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We'd love to hear about your vision. Whether you're planning a wedding, 
                  need lifestyle photography, or have a creative project in mind, reach out 
                  and let's create something beautiful together.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    {item.link ? (
                      <a 
                        href={item.link}
                        className="flex items-start gap-5 p-6 bg-card rounded-2xl border border-border hover:border-[var(--gold)]/40 transition-all duration-300"
                      >
                        <div className="w-12 h-12 flex items-center justify-center bg-[var(--gold)]/10 rounded-xl group-hover:bg-[var(--gold)]/20 transition-colors duration-300">
                          <item.icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1 font-medium">{item.label}</div>
                          <div className="text-base">{item.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-5 p-6 bg-card rounded-2xl border border-border">
                        <div className="w-12 h-12 flex items-center justify-center bg-[var(--gold)]/10 rounded-xl">
                          <item.icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1 font-medium">{item.label}</div>
                          <div className="text-base">{item.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                className="pt-8 border-t border-border"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h4 className="text-sm font-medium mb-6">Follow Our Journey</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="group flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl hover:border-[var(--gold)] hover:bg-[var(--gold)]/5 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-[var(--gold)] transition-colors" strokeWidth={1.5} />
                      <span className="text-sm">{social.handle}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form - 3 columns */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-card p-10 md:p-12 rounded-3xl border border-border shadow-xl">
                <h3 className="text-2xl md:text-3xl mb-3">
                  Send Us a <span className="text-[var(--gold)]">Message</span>
                </h3>
                <p className="text-muted-foreground mb-10">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                <form className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Full Name <span className="text-[var(--gold)]">*</span>
                      </label>
                      <motion.input
                        type="text"
                        className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
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

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Email Address <span className="text-[var(--gold)]">*</span>
                      </label>
                      <motion.input
                        type="email"
                        className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
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
                  </div>

                  {/* Phone & Date Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
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

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Event Date (if applicable)
                      </label>
                      <motion.input
                        type="date"
                        className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
                          focused === 'date' 
                            ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                            : 'border-border hover:border-[var(--gold)]/40'
                        }`}
                        onFocus={() => setFocused('date')}
                        onBlur={() => setFocused(null)}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Service of Interest <span className="text-[var(--gold)]">*</span>
                    </label>
                    <motion.select
                      className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
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
                      <option value="commercial">Commercial Projects</option>
                      <option value="other">Other / Not Sure</option>
                    </motion.select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Budget Range
                    </label>
                    <motion.select
                      className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none ${
                        focused === 'budget' 
                          ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                          : 'border-border hover:border-[var(--gold)]/40'
                      }`}
                      onFocus={() => setFocused('budget')}
                      onBlur={() => setFocused(null)}
                      whileFocus={{ scale: 1.01 }}
                    >
                      <option value="">Select your budget</option>
                      <option value="under-3k">Under $3,000</option>
                      <option value="3k-5k">$3,000 - $5,000</option>
                      <option value="5k-8k">$5,000 - $8,000</option>
                      <option value="8k-12k">$8,000 - $12,000</option>
                      <option value="over-12k">Over $12,000</option>
                    </motion.select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Tell Us About Your Vision <span className="text-[var(--gold)]">*</span>
                    </label>
                    <motion.textarea
                      rows={6}
                      className={`w-full px-6 py-4 bg-background border-2 rounded-xl transition-all duration-300 outline-none resize-none ${
                        focused === 'message' 
                          ? 'border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10' 
                          : 'border-border hover:border-[var(--gold)]/40'
                      }`}
                      placeholder="Share your story, vision, and any specific requirements..."
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Optional */}
      <section className="h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-lg text-muted-foreground">Map integration available</p>
          </div>
        </div>
      </section>
    </div>
  );
}