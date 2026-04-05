import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Camera, Video, Palette, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { PremiumButton } from '../components/PremiumButton';

export function ServicesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      tagline: 'Timeless memories of your special day',
      description: 'Capture the beauty, emotion, and elegance of your wedding with our signature artistic style. We document every precious moment with meticulous attention to detail.',
      features: [
        'Full day coverage (8-12 hours)',
        'Two professional photographers',
        'Engagement session included',
        'Custom-designed wedding album',
        'High-resolution digital gallery',
        'Print release for all images',
      ],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      price: 'Starting at $4,500',
    },
    {
      icon: Video,
      title: 'Luxury Cinematography',
      tagline: 'Your story, beautifully told through film',
      description: 'Our cinematic approach blends documentary storytelling with artistic vision to create films that move hearts and stand the test of time.',
      features: [
        'Full-length feature film (60-90 min)',
        'Highlight reel (3-5 minutes)',
        'Drone footage included',
        'Professional audio & music',
        '4K ultra-high definition',
        'Multiple cinematic edits',
      ],
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
      price: 'Starting at $5,500',
    },
    {
      icon: Palette,
      title: 'Editorial & Fashion',
      tagline: 'Sophisticated imagery for luxury brands',
      description: 'High-end editorial photography for fashion, lifestyle, and luxury brands seeking sophisticated visual narratives that captivate and inspire.',
      features: [
        'Creative direction & concept',
        'Professional styling consultation',
        'Location scouting included',
        'Retouching & color grading',
        'Commercial usage rights',
        'Print & digital formats',
      ],
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
      price: 'Custom pricing',
    },
    {
      icon: Sparkles,
      title: 'Lifestyle Sessions',
      tagline: 'Authentic moments, elegantly captured',
      description: 'Authentic, elegant portraits and lifestyle photography that capture your unique story with grace, style, and timeless sophistication.',
      features: [
        '2-3 hour session',
        'Location of your choice',
        'Wardrobe consultation',
        'Professional editing',
        'Online gallery access',
        '50+ edited images',
      ],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      price: 'Starting at $1,800',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our"
        titleGold="Services"
        subtitle="Comprehensive luxury photography & cinematography tailored to your vision"
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80"
      />

      {/* Services Details Section */}
      <section className="py-32 lg:py-48 bg-background" ref={ref}>
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: index * 0.2 }}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <div className="aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Icon overlay */}
                    <div className="absolute top-8 left-8">
                      <div className="w-16 h-16 flex items-center justify-center bg-[var(--gold)]/90 backdrop-blur-sm rounded-2xl">
                        <service.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-4">
                      <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
                        Premium Service
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl mb-4 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-xl text-[var(--gold)] italic" style={{ fontFamily: 'var(--font-heading)' }}>
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className="w-5 h-5 text-[var(--gold)]" strokeWidth={2} />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Investment</div>
                        <div className="text-2xl font-medium text-[var(--gold)]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {service.price}
                        </div>
                      </div>
                      <Link to="/contact">
                        <PremiumButton
                          variant="primary"
                          delay={0.2 + index * 0.1}
                          className="px-8 py-4 rounded-xl"
                        >
                          Book This Service
                        </PremiumButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Packages CTA */}
          <motion.div
            className="mt-32 text-center p-16 bg-secondary/50 rounded-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl mb-6">
              Need a <span className="text-[var(--gold)]">Custom Package?</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We create bespoke photography and cinematography packages tailored to your unique needs and vision.
            </p>
            <Link to="/contact">
              <PremiumButton
                variant="outline"
                delay={1}
                className="px-12 py-5 rounded-xl"
              >
                Discuss Your Vision
              </PremiumButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
