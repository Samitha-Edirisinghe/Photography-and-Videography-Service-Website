import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative py-32 lg:py-48 bg-background" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Split layout - image + text offset */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image - with soft shadow */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ y: imageY }}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80"
                  alt="About"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-40 h-40 border-2 border-[var(--gold)]/20 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            />
          </motion.div>

          {/* Content - offset */}
          <motion.div
            className="space-y-10 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Label */}
            <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
                About Us
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Capturing Emotions,
              <br />
              Creating <span className="text-[var(--gold)]">Legacies</span>
            </h2>

            {/* Body text - minimal, well-spaced, readable */}
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                We are storytellers at heart, dedicated to preserving your most precious 
                moments with authenticity, elegance, and timeless beauty.
              </p>
              
              <p>
                With over a decade of experience in luxury photography and cinematography, 
                we've had the honor of documenting love stories, fashion editorials, and 
                lifestyle moments for discerning clients worldwide.
              </p>
            </div>

            {/* Signature-style element / brand quote */}
            <motion.div
              className="pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <p 
                className="text-2xl italic text-foreground/80"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                "Every moment tells a story worth remembering"
              </p>
              <p className="text-sm text-muted-foreground mt-3">— Our Philosophy</p>
            </motion.div>

            {/* Stats - refined */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { number: '500+', label: 'Events Captured' },
                { number: '12+', label: 'Years Experience' },
                { number: '98%', label: 'Happy Clients' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.6 + index * 0.1 }}
                >
                  <div 
                    className="text-3xl md:text-4xl text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs tracking-wide uppercase text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action button with hero-style animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Link to="/about">
                <motion.button
                  className="relative px-8 py-4 bg-[var(--gold)] text-white text-sm md:text-base font-medium rounded-full overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    rotateX: 10,
                    rotateY: -5,
                    boxShadow: '0 30px 80px rgba(198, 151, 53, 0.6)',
                  }}
                  whileTap={{
                    scale: 0.95,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Learn More About Us
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
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </motion.span>

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
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}