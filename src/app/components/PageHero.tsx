import { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

// Floating particles component with multiple types
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Original floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[var(--gold)] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, -100, window.innerHeight + 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        />
      ))}

      {/* Orbital particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orbital-${i}`}
          className="absolute w-2 h-2 bg-[var(--gold)]/60 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * Math.PI / 4) * 300, 0],
            y: [0, Math.sin(i * Math.PI / 4) * 300, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.75,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Light trails */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{
            width: `${100 + Math.random() * 200}px`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{
            x: ['0%', '100vw'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// Animated light rays
const LightRays = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 origin-left"
          style={{
            width: '150%',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
            rotate: `${i * 30}deg`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Lens flare effect
const LensFlare = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => {
        const scale = 0.3 + i * 0.15;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: '50%',
              top: '50%',
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(198, 151, 53, 0.2)' : 'rgba(255, 255, 255, 0.1)'} 0%, transparent 70%)`,
              x: mousePosition.x * scale,
              y: mousePosition.y * scale,
              filter: 'blur(2px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );
      })}
    </div>
  );
};

// Animated ripple waves
const RippleWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--gold)]/20 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: ['0px', '800px'],
            height: ['0px', '800px'],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

// Animated geometric shapes
const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating triangles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute border-2 border-[var(--gold)]/30"
          style={{
            width: '60px',
            height: '60px',
            left: `${20 + i * 25}%`,
            top: `${30 + i * 15}%`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Pulsing circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute border-2 border-[var(--gold)]/20 rounded-full"
          style={{
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            right: `${10 + i * 12}%`,
            bottom: `${20 + i * 10}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Rotating squares */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute border-2 border-[var(--gold)]/25"
          style={{
            width: '50px',
            height: '50px',
            left: `${60 + i * 15}%`,
            bottom: `${40 + i * 10}%`,
          }}
          animate={{
            rotate: [0, -360],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Scan line effect
const ScanLines = () => {
  return (
    <>
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent pointer-events-none"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--gold)]/40 to-transparent pointer-events-none"
        animate={{
          left: ['0%', '100%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </>
  );
};

// Energy pulse effect
const EnergyPulse = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[var(--gold)]/10 via-transparent to-transparent"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

// Film grain effect
const FilmGrain = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

// Ambient orbs
const AmbientOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            background: `radial-gradient(circle, rgba(198, 151, 53, ${0.15 - i * 0.03}) 0%, transparent 70%)`,
            left: `${i * 30}%`,
            top: `${i * 25}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.6, 0.4, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Character reveal animation
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.33, 1, 0.68, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

interface PageHeroProps {
  image: string;
  tag?: string;
  title: string;
  titleGold?: string;
  subtitle?: string;
  height?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export function PageHero({ 
  image, 
  tag, 
  title, 
  titleGold,
  subtitle,
  height = '70vh',
  primaryButton,
  secondaryButton
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.05);
    mouseY.set(y * 0.05);
  };

  const mousePosition = useMemo(() => ({
    x: mouseXSpring.get(),
    y: mouseYSpring.get()
  }), [mouseXSpring, mouseYSpring]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height }}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url('${image}')`,
          x: mouseXSpring,
          y: mouseYSpring,
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />

      {/* All Animation Layers */}
      <FloatingParticles />
      <LightRays color="#c69735" />
      <LensFlare mousePosition={mousePosition} />
      <RippleWaves />
      <GeometricShapes />
      <ScanLines />
      <EnergyPulse />
      <FilmGrain />
      <AmbientOrbs />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {tag && (
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)]/10 backdrop-blur-sm border border-[var(--gold)]/30 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
              {tag}
            </span>
          </motion.div>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 text-white leading-tight">
          <AnimatedText text={title} delay={0.8} />
          {titleGold && (
            <>
              {' '}
              <span className="text-[var(--gold)]">
                <AnimatedText text={titleGold} delay={0.8 + title.length * 0.03} />
              </span>
            </>
          )}
        </h1>

        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          className="mt-12 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />

        {/* Buttons with hero-style animations */}
        {(primaryButton || secondaryButton) && (
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            {primaryButton && (
              <Link to={primaryButton.link}>
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
                    {primaryButton.text}
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
            )}

            {secondaryButton && (
              <Link to={secondaryButton.link}>
                <motion.button
                  className="relative px-8 py-4 bg-transparent text-white text-sm md:text-base font-medium rounded-full border-2 border-white/30 backdrop-blur-sm overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    rotateX: 10,
                    rotateY: -5,
                    boxShadow: '0 20px 60px rgba(198, 151, 53, 0.3)',
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
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="relative z-10">{secondaryButton.text}</span>

                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)',
                        '0 0 20px rgba(198, 151, 53, 0.3), inset 0 0 10px rgba(198, 151, 53, 0.1)',
                        '0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Rotating border gradient */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0%, var(--gold) 50%, transparent 100%)',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      padding: '2px',
                    }}
                  />

                  {/* Hover shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%', skewX: -20 }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.button>
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut'
        }}
      />
    </section>
  );
}