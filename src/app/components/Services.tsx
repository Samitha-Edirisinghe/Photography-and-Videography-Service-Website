import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Camera, Video, Palette, Sparkles, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PremiumButton } from './PremiumButton';

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Timeless imagery capturing the beauty, emotion, and elegance of your special day with artistic precision.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      features: ['Full Day Coverage', 'Two Photographers', 'Digital Gallery'],
    },
    {
      icon: Video,
      title: 'Luxury Cinematography',
      description: 'Cinematic storytelling through motion, crafted to immortalize your most precious moments in stunning film.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      features: ['4K Filming', 'Drone Footage', 'Feature Film'],
    },
    {
      icon: Palette,
      title: 'Editorial & Fashion',
      description: 'High-end editorial photography for fashion, lifestyle, and luxury brands seeking sophisticated visual narratives.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      features: ['Creative Direction', 'Professional Styling', 'Retouching'],
    },
    {
      icon: Sparkles,
      title: 'Lifestyle Sessions',
      description: 'Authentic, elegant portraits and lifestyle photography that capture your unique story with grace and style.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      features: ['2-3 Hour Session', '50+ Images', 'Location Flexibility'],
    },
    {
      icon: Users,
      title: 'Corporate & Events',
      description: 'Professional photography for corporate events, conferences, and brand activations with meticulous attention to detail.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      features: ['Event Coverage', 'Team Portraits', 'Brand Imagery'],
    },
    {
      icon: Award,
      title: 'Fine Art Prints',
      description: 'Museum-quality fine art prints and custom framing services to preserve your most precious memories forever.',
      image: 'https://images.unsplash.com/photo-1764444218575-63709977a42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwYXJ0JTIwZnJhbWVkJTIwcHJpbnRzJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzUxMTQxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: ['Gallery Quality', 'Custom Framing', 'Limited Editions'],
    },
  ];

  return (
    <section id="services" className="py-32 lg:py-48 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Crafting Your <span className="text-[var(--gold)]">Visual Story</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From intimate moments to grand celebrations, we offer comprehensive services 
            tailored to your unique vision and lifestyle.
          </p>
        </motion.div>

        {/* Services Grid - 3 columns, 2 rows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-[var(--gold)]/40 transition-all duration-700 shadow-xl hover:shadow-2xl flex flex-col"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden flex-shrink-0">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-6 left-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-[var(--gold)]/90 backdrop-blur-sm rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1">
                {/* Title */}
                <h3
                  className="text-2xl mb-4 group-hover:text-[var(--gold)] transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium border border-border h-fit"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA - Premium Animated Button */}
                <Link to="/services">
                  <motion.button
                    className="group/btn relative flex items-center gap-3 text-[var(--gold)] font-medium text-sm overflow-hidden"
                    whileHover={{
                      x: 5,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.3,
                      scale: { duration: 0.2 }
                    }}
                  >
                    <span className="relative z-10">Learn More</span>
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                    </motion.div>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-[var(--gold)]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{ backgroundColor: 'rgba(198, 151, 53, 0.1)' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.button>
                </Link>
              </div>

              {/* Premium Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl shadow-[0_0_50px_rgba(198,151,53,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="relative mt-24 p-12 lg:p-16 bg-gradient-to-br from-secondary to-card rounded-3xl border border-border overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--gold)]/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl lg:text-4xl mb-6">
              Need a <span className="text-[var(--gold)]\">Custom Package?</span>
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              We create bespoke photography and cinematography packages tailored 
              to your unique needs and vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <PremiumButton
                  variant="primary"
                  delay={0.8}
                  className="px-10 py-5 rounded-xl"
                >
                  View All Services
                </PremiumButton>
              </Link>
              <Link to="/contact">
                <PremiumButton
                  variant="outline"
                  delay={0.9}
                  className="px-10 py-5 rounded-xl"
                >
                  Discuss Your Vision
                </PremiumButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}