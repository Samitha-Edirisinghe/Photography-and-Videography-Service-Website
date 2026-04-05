import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Users, Camera, Heart } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { AnimatedTitle, AnimatedParagraph, AnimatedImage, AnimatedCard, StaggerContainer, StaggerItem, AnimatedIcon } from '../components/AnimatedSection';

export function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Every shot is captured with genuine love for the art of storytelling.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We pursue perfection in every frame, every moment, every detail.',
    },
    {
      icon: Users,
      title: 'Connection',
      description: 'Building authentic relationships with our clients is our foundation.',
    },
    {
      icon: Camera,
      title: 'Artistry',
      description: 'Blending technical mastery with creative vision to create magic.',
    },
  ];

  const team = [
    {
      name: 'Alexander Chen',
      role: 'Lead Photographer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      name: 'Isabella Martinez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    },
    {
      name: 'David Thompson',
      role: 'Cinematographer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    },
    {
      name: 'Sophie Laurent',
      role: 'Editor & Stylist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="About"
        titleGold="Menaric"
        subtitle="Capturing Life's Most Precious Moments with Timeless Elegance"
        image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80"
      />

      {/* Our Story Section */}
      <section className="py-32 lg:py-48 bg-background" ref={ref}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9 }}
            >
              <motion.div 
                className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
                  Our Story
                </span>
              </motion.div>
              
              <AnimatedTitle 
                text="A Journey of Artistry" 
                className="text-4xl md:text-5xl mb-8 leading-tight"
                as="h2"
                delay={0.3}
              />
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <AnimatedParagraph delay={0.5}>
                  Founded in 2014, Menaric was born from a simple yet profound belief: every moment 
                  deserves to be remembered with beauty, authenticity, and timeless elegance.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.7}>
                  What began as a passion project between two friends has blossomed into a 
                  full-service luxury photography and cinematography studio, serving discerning 
                  clients across the globe.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.9}>
                  Today, we're proud to have documented over 500 weddings, countless fashion 
                  editorials, and lifestyle moments that our clients treasure for a lifetime.
                </AnimatedParagraph>
              </div>
            </motion.div>

            <AnimatedImage
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80"
              alt="Our Story"
              className="aspect-[4/5] rounded-2xl shadow-2xl"
              delay={0.4}
              direction="right"
            />
          </div>

          {/* Our Values */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <AnimatedTitle 
                text="Our Values" 
                className="text-4xl md:text-5xl mb-6"
                as="h2"
                delay={0}
              />
              <AnimatedParagraph 
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                delay={0.3}
              >
                The principles that guide every frame we capture
              </AnimatedParagraph>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <AnimatedCard className="text-center p-8 bg-card rounded-2xl border border-border hover:border-[var(--gold)]/40 transition-all duration-500 h-full" delay={index * 0.1}>
                    <AnimatedIcon 
                      icon={value.icon}
                      className="w-16 h-16 mx-auto mb-6 p-4 bg-[var(--gold)]/10 rounded-2xl text-[var(--gold)]"
                      delay={0.2 + index * 0.1}
                    />
                    <motion.h3 
                      className="text-xl mb-3" 
                      style={{ fontFamily: 'var(--font-heading)' }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {value.title}
                    </motion.h3>
                    <AnimatedParagraph 
                      className="text-muted-foreground text-sm leading-relaxed"
                      delay={0.4 + index * 0.1}
                    >
                      {value.description}
                    </AnimatedParagraph>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Meet the Team */}
          <div>
            <div className="text-center mb-16">
              <AnimatedTitle 
                text="Meet the Team" 
                className="text-4xl md:text-5xl mb-6"
                as="h2"
                delay={0}
              />
              <AnimatedParagraph 
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                delay={0.3}
              >
                Talented artists dedicated to creating your perfect story
              </AnimatedParagraph>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedImage
                      src={member.image}
                      alt={member.name}
                      className="aspect-[3/4] rounded-2xl shadow-lg mb-6 relative"
                      delay={index * 0.15}
                      direction="up"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    </AnimatedImage>
                    
                    <motion.h3 
                      className="text-xl mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm text-[var(--gold)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {member.role}
                    </motion.p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
