import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Play, Pause, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1762016292874-18459e2ddc59?w=1920&q=80',
    tag: 'Wedding Photography',
    title: 'Timeless Love Stories',
    number: '01',
    color: '#c69735'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1768900044120-650653953a6a?w=1920&q=80',
    tag: 'Romantic Portraits',
    title: 'Captured Forever',
    number: '02',
    color: '#d4a853'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1767986012154-db9a321c8832?w=1920&q=80',
    tag: 'Luxury Events',
    title: 'Moments of Elegance',
    number: '03',
    color: '#b88728'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1635324456433-17d1f50d9fb8?w=1920&q=80',
    tag: 'Creative Vision',
    title: 'Artistic Expression',
    number: '04',
    color: '#e5c068'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1762843353007-e198859f36b6?w=1920&q=80',
    tag: 'Fashion Editorial',
    title: 'Modern Excellence',
    number: '05',
    color: '#a67c2e'
  }
];

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
            width: ['0px', '1200px'],
            height: ['0px', '1200px'],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.25,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
};

// Energy pulse rings
const EnergyPulse = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-4 border-[var(--gold)]"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.4, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// Film grain/noise texture
const FilmGrain = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      animate={{
        backgroundImage: [
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        ]
      }}
      transition={{ duration: 0.1, repeat: Infinity }}
    />
  );
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Spring-animated mouse values for smoother cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Create transformed values for parallax effects
  const parallaxX1 = useTransform(smoothMouseX, (v) => v * -3);
  const parallaxY1 = useTransform(smoothMouseY, (v) => v * -3);
  const parallaxX2 = useTransform(smoothMouseX, (v) => v * 2);
  const parallaxY2 = useTransform(smoothMouseY, (v) => v * 2);
  const parallaxX3 = useTransform(smoothMouseX, (v) => v * -2);
  const parallaxY3 = useTransform(smoothMouseY, (v) => v * -2);
  const parallaxX4 = useTransform(smoothMouseX, (v) => v * 3);
  const parallaxY4 = useTransform(smoothMouseY, (v) => v * 3);
  const parallaxX5 = useTransform(smoothMouseX, (v) => v * -1);
  const parallaxY5 = useTransform(smoothMouseY, (v) => v * -1);
  const parallaxX6 = useTransform(smoothMouseX, (v) => v * 1.5);
  const parallaxY6 = useTransform(smoothMouseY, (v) => v * 1.5);
  const parallaxX7 = useTransform(smoothMouseX, (v) => v * -1.5);
  const parallaxY7 = useTransform(smoothMouseY, (v) => v * -1.5);
  const parallaxX8 = useTransform(smoothMouseX, (v) => v * 2.5);
  const parallaxY8 = useTransform(smoothMouseY, (v) => v * 2.5);
  const parallaxX9 = useTransform(smoothMouseX, (v) => v * 0.5);
  const parallaxY9 = useTransform(smoothMouseY, (v) => v * 0.5);
  const parallaxX10 = useTransform(smoothMouseX, (v) => v * 1);
  const parallaxY10 = useTransform(smoothMouseY, (v) => v * 1);

  // Mouse parallax effect with cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;

      setMousePosition({ x, y });
      setCursorPosition({ x: e.clientX, y: e.clientY });

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Ultra-advanced slide variants with extreme 3D animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '120%' : '-120%',
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 1.5,
      rotateX: direction > 0 ? 25 : -25,
      rotateY: direction > 0 ? 60 : -60,
      rotateZ: direction > 0 ? 8 : -8,
      filter: 'blur(20px) brightness(0.5)',
      skewX: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      filter: 'blur(0px) brightness(1)',
      skewX: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 2, ease: [0.16, 1, 0.3, 1] },
        rotateX: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        rotateY: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 1.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-120%' : '120%',
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.6,
      rotateX: direction > 0 ? -20 : 20,
      rotateY: direction > 0 ? -45 : 45,
      rotateZ: direction > 0 ? -8 : 8,
      filter: 'blur(20px) brightness(0.5)',
      skewX: direction > 0 ? -10 : 10,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  // Enhanced text animation variants with elastic effects
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 150,
      rotateX: -90,
      rotateZ: -15,
      scale: 0.3,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateZ: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.3 + i * 0.15,
        }
      }
    })
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ margin: 0, padding: 0, position: 'relative' }}
    >
      {/* Film grain texture */}
      <div className="absolute inset-0 z-[1]">
        <FilmGrain />
      </div>

      {/* Animated liquid background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 z-[1]"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${slides[currentSlide].color}40 0%, transparent 60%)`,
            `radial-gradient(circle at 80% 70%, ${slides[currentSlide].color}40 0%, transparent 60%)`,
            `radial-gradient(circle at 50% 50%, ${slides[currentSlide].color}40 0%, transparent 60%)`,
            `radial-gradient(circle at 20% 30%, ${slides[currentSlide].color}40 0%, transparent 60%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ripple waves */}
      <div className="absolute inset-0 z-[2]">
        <RippleWaves />
      </div>

      {/* Energy pulse rings */}
      <div className="absolute inset-0 z-[2]">
        <EnergyPulse />
      </div>

      {/* Light rays */}
      <div className="absolute inset-0 z-[3]">
        <LightRays color={slides[currentSlide].color} />
      </div>

      {/* Lens flare */}
      <div className="absolute inset-0 z-[4]">
        <LensFlare mousePosition={mousePosition} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[5]">
        <FloatingParticles />
      </div>

      {/* Chromatic aberration effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen z-[6]"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #ff000040 0%, transparent 30%)`,
              `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #00ff0040 0%, transparent 30%)`,
              `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #0000ff40 0%, transparent 30%)`,
              `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #ff000040 0%, transparent 30%)`,
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Depth layers with parallax */}
      <motion.div
        className="absolute inset-0 opacity-10 z-[7]"
        style={{
          backgroundImage: `radial-gradient(circle, ${slides[currentSlide].color} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          x: parallaxX1,
          y: parallaxY1,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-0 opacity-5 z-[7]"
        style={{
          backgroundImage: `radial-gradient(circle, ${slides[currentSlide].color} 2px, transparent 2px)`,
          backgroundSize: '120px 120px',
          x: parallaxX2,
          y: parallaxY2,
        }}
        animate={{
          backgroundPosition: ['100% 100%', '0% 0%']
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5 z-[7]"
        style={{
          backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2
        }}
      />

      {/* Multiple ultra-animated rotating geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 border-2 border-[var(--gold)]/20 rounded-full z-[8]"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.4, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0],
          borderRadius: ['50%', '30%', '50%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          x: parallaxX3,
          y: parallaxY3,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner rotating ring */}
        <motion.div
          className="absolute inset-8 border border-[var(--gold)]/30 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 border-2 border-[var(--gold)]/15 z-[8]"
        animate={{
          rotate: [0, -180, -360],
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
          borderRadius: ['0%', '30%', '0%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          x: parallaxX4,
          y: parallaxY4
        }}
      >
        {/* Crossed lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--gold)]/20" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--gold)]/20" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-[var(--gold)]/10 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          x: parallaxX5,
          y: parallaxY5
        }}
      />

      {/* Additional morphing shapes */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-48 h-48 border-2 border-[var(--gold)]/25 z-[8]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 1],
          borderRadius: ['20%', '50%', '20%'],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          x: parallaxX6,
          y: parallaxY6,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-32 h-32 z-[8]"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          x: parallaxX7,
          y: parallaxY7,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <motion.polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            opacity="0.2"
            animate={{
              points: [
                '50,10 90,90 10,90',
                '50,5 95,85 5,85',
                '50,10 90,90 10,90',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Hexagon shape */}
      <motion.div
        className="absolute top-2/3 left-2/3 w-40 h-40 z-[8]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          x: parallaxX8,
          y: parallaxY8,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <motion.polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            opacity="0.15"
            animate={{
              strokeDasharray: ['0, 300', '300, 0', '0, 300'],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </motion.div>

      {/* Slideshow Container with enhanced 3D perspective */}
      <div className="absolute inset-0 z-0" style={{ perspective: '3000px', perspectiveOrigin: '50% 50%' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Background depth layer - furthest back */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
              style={{
                x: parallaxX9,
                y: parallaxY9,
                filter: 'blur(3px) brightness(0.7)',
                transform: 'translateZ(-100px)',
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slides[currentSlide].image}')`,
                }}
              />
            </motion.div>

            {/* Mid depth layer */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
              style={{
                x: parallaxX10,
                y: parallaxY10,
                filter: 'blur(1px) brightness(0.85)',
                transform: 'translateZ(-50px)',
                opacity: 0.7,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slides[currentSlide].image}')`,
                }}
              />
            </motion.div>

            {/* Main image layer with parallax and wave distortion */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              style={{
                x: parallaxX6,
                y: parallaxY6,
                transform: 'translateZ(0px)',
              }}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slides[currentSlide].image}')`,
                }}
                animate={{
                  filter: [
                    'hue-rotate(0deg) contrast(1)',
                    'hue-rotate(5deg) contrast(1.1)',
                    'hue-rotate(0deg) contrast(1)',
                  ]
                }}
                transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
              />
            </motion.div>

            {/* Foreground depth layer with RGB split */}
            <motion.div
              className="absolute inset-0 mix-blend-screen opacity-20"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              style={{
                x: smoothMouseX.get() * 2,
                y: smoothMouseY.get() * 2,
                transform: 'translateZ(50px)',
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${slides[currentSlide].image}')`,
                  filter: 'blur(2px)',
                  mixBlendMode: 'color-dodge',
                }}
              />
            </motion.div>

            {/* Multiple animated gradient overlays with different blend modes */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                background: [
                  `radial-gradient(circle at 30% 40%, ${slides[currentSlide].color}30 0%, transparent 50%)`,
                  `radial-gradient(circle at 70% 60%, ${slides[currentSlide].color}30 0%, transparent 50%)`,
                  `radial-gradient(circle at 30% 40%, ${slides[currentSlide].color}30 0%, transparent 50%)`,
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated vignette with pulsing */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, black 100%)'
              }}
            />

            {/* Wave distortion overlay */}
            <motion.div
              className="absolute inset-0 opacity-10 mix-blend-overlay"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${slides[currentSlide].color}20 0px, transparent 10px, transparent 20px, ${slides[currentSlide].color}20 30px)`,
              }}
            />

            {/* Animated scan lines effect - horizontal */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '0% 100%']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--gold) 2px, var(--gold) 4px)',
                backgroundSize: '100% 20px'
              }}
            />

            {/* Animated scan lines effect - vertical */}
            <motion.div
              className="absolute inset-0 opacity-3"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, var(--gold) 2px, var(--gold) 4px)',
                backgroundSize: '20px 100%'
              }}
            />

            {/* Animated light leak effect */}
            <motion.div
              className="absolute inset-0 opacity-20 mix-blend-screen"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: `linear-gradient(90deg, transparent, ${slides[currentSlide].color}60, transparent)`,
                width: '50%',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-5">
          {/* Left Side - Main Content */}
          <div className="pt-20 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Ultra-animated Tag */}
                <motion.div
                  className="inline-flex items-center gap-3 mb-6 md:mb-8 overflow-hidden"
                  initial={{ opacity: 0, x: -50, rotateY: -90 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <motion.div
                    className="h-px bg-[var(--gold)] relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                  <motion.span
                    className="text-[var(--gold)] text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {slides[currentSlide].tag.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20, rotateX: -90 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.2,
                          color: '#ffffff',
                          transition: { duration: 0.2 }
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + i * 0.03,
                          type: 'spring',
                          stiffness: 300,
                        }}
                        className="inline-block cursor-pointer"
                        style={{ perspective: 1000 }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                  </motion.div>
                </motion.div>

                {/* Ultra-animated Title with word reveal and floating characters */}
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[0.95]">
                  {slides[currentSlide].title.split(' ').map((word, wordIndex) => (
                    <div key={wordIndex} className="overflow-hidden inline-block">
                      <motion.span
                        custom={wordIndex}
                        variants={titleVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block origin-bottom"
                        style={{ perspective: 1000 }}
                      >
                        {word.split('').map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            initial={{
                              opacity: 0,
                              y: 50,
                              rotateX: -90,
                              rotateZ: -15,
                              scale: 0.5,
                              filter: 'blur(10px)'
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              rotateX: 0,
                              rotateZ: 0,
                              scale: 1,
                              filter: 'blur(0px)'
                            }}
                            whileHover={{
                              y: -10,
                              rotateZ: Math.random() * 20 - 10,
                              scale: 1.15,
                              color: slides[currentSlide].color,
                              textShadow: `0 0 20px ${slides[currentSlide].color}`,
                              transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 10
                              }
                            }}
                            transition={{
                              duration: 0.6,
                              delay: 0.3 + wordIndex * 0.15 + charIndex * 0.03,
                              ease: [0.16, 1, 0.3, 1],
                              scale: {
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                                delay: 0.3 + wordIndex * 0.15 + charIndex * 0.03,
                              }
                            }}
                            className="inline-block cursor-pointer"
                            style={{
                              perspective: 1000,
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            <motion.span
                              animate={{
                                y: [0, -3, 0],
                              }}
                              transition={{
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                delay: charIndex * 0.1,
                                ease: 'easeInOut'
                              }}
                            >
                              {char}
                            </motion.span>
                          </motion.span>
                        ))}{' '}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Ultra-animated Description with line reveal and word effects */}
                <div className="overflow-hidden mb-8 md:mb-12">
                  <motion.p
                    className="text-white/70 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)', rotateX: -20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      rotateX: 0,
                    }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ perspective: 1000 }}
                  >
                    {'Luxury photography & cinematography crafted to tell your unforgettable story with artistic excellence.'.split(' ').map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                        }}
                        whileHover={{
                          color: '#ffffff',
                          y: -3,
                          scale: 1.05,
                          textShadow: `0 0 10px ${slides[currentSlide].color}`,
                          transition: { duration: 0.2 }
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + i * 0.05,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                </div>

                {/* Ultra-animated CTAs with magnetic effects */}
                <motion.div
                  className="flex flex-col sm:flex-row flex-wrap gap-4"
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ perspective: 1000 }}
                >
                  <Link to="/portfolio">
                    <motion.button
                      className="group relative px-6 md:px-8 py-3 md:py-4 bg-[var(--gold)] text-black font-semibold rounded-full overflow-hidden w-full sm:w-auto"
                      whileHover={{
                        scale: 1.08,
                        y: -5,
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
                      initial={{ opacity: 0, x: -20, rotateY: -30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 1.1,
                        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.span
                        className="relative z-10 flex items-center justify-center gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        Explore Work
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

                      {/* Multiple animated overlays */}
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
                    </motion.button>
                  </Link>

                  <Link to="/contact">
                    <motion.button
                      className="relative px-6 md:px-8 py-3 md:py-4 backdrop-blur-md text-white font-semibold rounded-full border-2 overflow-hidden w-full sm:w-auto transition-colors duration-300 hover:bg-white/15 hover:border-[var(--gold)]/80"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.3)', transformStyle: 'preserve-3d' }}
                      whileHover={{
                        scale: 1.08,
                        y: -5,
                        rotateX: 10,
                        rotateY: 5,
                        boxShadow: '0 20px 60px rgba(198, 151, 53, 0.4)',
                      }}
                      whileTap={{
                        scale: 0.95,
                        y: 0,
                        rotateX: 0,
                        rotateY: 0,
                      }}
                      initial={{ opacity: 0, x: -20, rotateY: 30 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 1.2,
                        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                      }}
                    >
                      <span className="relative z-10">Get in Touch</span>

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
                        className="absolute inset-0 rounded-full opacity-0"
                        whileHover={{ opacity: 1 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          rotate: { duration: 4, repeat: Infinity, ease: 'linear' }
                        }}
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${slides[currentSlide].color}, transparent)`,
                          padding: '2px',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                        }}
                      />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Animated Slide Number & Info Card */}
          <div className="hidden lg:flex justify-end items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, rotateY: 180, filter: 'blur(20px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Large slide number with gradient */}
                <motion.div 
                  className="text-[12rem] xl:text-[16rem] font-bold leading-none select-none relative"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${slides[currentSlide].color}40, ${slides[currentSlide].color}10)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {slides[currentSlide].number}
                  
                  {/* Glowing outline */}
                  <motion.div
                    className="absolute inset-0 text-[12rem] xl:text-[16rem] font-bold leading-none"
                    style={{
                      color: slides[currentSlide].color,
                      opacity: 0.2,
                      filter: 'blur(20px)'
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {slides[currentSlide].number}
                  </motion.div>
                </motion.div>
                
                {/* Animated Info card */}
                <motion.div
                  className="absolute bottom-0 right-0 backdrop-blur-2xl border rounded-2xl p-6 lg:p-8 max-w-xs overflow-hidden transition-colors duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(198, 151, 53, 0.5)'
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, ${slides[currentSlide].color} 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, ${slides[currentSlide].color} 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 0%, ${slides[currentSlide].color} 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-[var(--gold)] text-xs tracking-wider uppercase mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      Current Slide
                    </motion.div>
                    <motion.div 
                      className="text-white text-xl lg:text-2xl font-semibold mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {slides[currentSlide].title}
                    </motion.div>
                    <motion.div 
                      className="text-white/60 text-sm flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentSlide + 1}
                      </motion.span>
                       of {slides.length}
                      
                      {/* Progress circle */}
                      {isAutoPlaying && (
                        <svg width="20" height="20" className="ml-2">
                          <motion.circle
                            cx="10"
                            cy="10"
                            r="8"
                            fill="none"
                            stroke="var(--gold)"
                            strokeWidth="2"
                            strokeDasharray="50"
                            initial={{ strokeDashoffset: 50 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 5, ease: 'linear' }}
                          />
                        </svg>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Ultra-animated Navigation - Bottom Left */}
      <motion.div
        className="absolute bottom-[15px] sm:bottom-[25px] left-6 sm:left-8 lg:left-16 z-20 flex items-center gap-3 sm:gap-6 p-[0px]"
        initial={{ opacity: 0, x: -50, filter: 'blur(10px)', rotateY: -30 }}
        animate={{
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          rotateY: 0,
        }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Play/Pause with enhanced ripple effect */}
        <motion.button
          onClick={toggleAutoPlay}
          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border flex items-center justify-center text-white overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
          whileHover={{
            scale: 1.15,
            rotateZ: 180,
            backgroundColor: 'rgba(198, 151, 53, 0.3)',
            borderColor: 'rgba(198, 151, 53, 1)',
            boxShadow: '0 10px 40px rgba(198, 151, 53, 0.5)'
          }}
          whileTap={{ scale: 0.9, rotateZ: 0 }}
          animate={{
            boxShadow: isAutoPlaying
              ? [
                  '0 0 0px rgba(198, 151, 53, 0)',
                  '0 0 20px rgba(198, 151, 53, 0.4)',
                  '0 0 0px rgba(198, 151, 53, 0)',
                ]
              : '0 0 0px rgba(198, 151, 53, 0)',
          }}
          transition={{
            scale: { duration: 0.3 },
            rotateZ: { duration: 0.5 },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--gold)]"
            initial={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
          {/* Rotating ring indicator */}
          {isAutoPlaying && (
            <motion.div
              className="absolute inset-0 border-2 border-[var(--gold)] rounded-full"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{
                rotate: { duration: 5, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity }
              }}
            />
          )}
          {isAutoPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 relative z-10" />
          )}
        </motion.button>

        {/* Prev/Next with enhanced magnetic effect */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border flex items-center justify-center text-white relative overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
            whileHover={{
              scale: 1.15,
              x: -8,
              rotateY: -15,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 15px 40px rgba(198, 151, 53, 0.4)'
            }}
            whileTap={{ scale: 0.9, x: 0, rotateY: 0 }}
            animate={{
              x: [0, -2, 0],
            }}
            transition={{
              x: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            {/* Particle trail */}
            <motion.div className="absolute inset-0" whileHover="hover">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[var(--gold)] rounded-full top-1/2 left-1/2"
                  variants={{
                    hover: {
                      x: -20 - i * 5,
                      opacity: [1, 0],
                      scale: [0, 1, 0],
                    }
                  }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              ))}
            </motion.div>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5 relative z-10">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md border flex items-center justify-center text-white relative overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
            whileHover={{
              scale: 1.15,
              x: 8,
              rotateY: 15,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 15px 40px rgba(198, 151, 53, 0.4)'
            }}
            whileTap={{ scale: 0.9, x: 0, rotateY: 0 }}
            animate={{
              x: [0, 2, 0],
            }}
            transition={{
              x: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-[var(--gold)]/30 to-transparent"
              initial={{ x: '100%' }}
              whileHover={{ x: '-100%' }}
              transition={{ duration: 0.6 }}
            />
            {/* Particle trail */}
            <motion.div className="absolute inset-0" whileHover="hover">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[var(--gold)] rounded-full top-1/2 left-1/2"
                  variants={{
                    hover: {
                      x: 20 + i * 5,
                      opacity: [1, 0],
                      scale: [0, 1, 0],
                    }
                  }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              ))}
            </motion.div>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5 relative z-10">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Slide Indicators - Bottom Right */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 z-20"
        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="group relative"
              whileHover={{ scale: 1.2, x: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
            >
              <div className={`relative flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
                index === currentSlide ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}>
                {/* Animated line indicator */}
                <div className={`relative h-px bg-white transition-all duration-500 overflow-hidden ${
                  index === currentSlide ? 'w-12 sm:w-16' : 'w-6 sm:w-8'
                }`}>
                  {index === currentSlide && isAutoPlaying && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--gold)] via-yellow-300 to-[var(--gold)]"
                      initial={{ width: '0%', x: '-100%' }}
                      animate={{ width: '200%', x: '0%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  )}
                  
                  {/* Glow effect */}
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-[var(--gold)] blur-sm"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                
                {/* Animated number */}
                <motion.span 
                  className={`text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                    index === currentSlide ? 'text-[var(--gold)]' : 'text-white'
                  }`}
                  animate={index === currentSlide ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  0{index + 1}
                </motion.span>
                
                {/* Hover tooltip */}
                <motion.div
                  className="absolute right-full mr-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {slide.tag}
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Ultra-enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0, y: -30, filter: 'blur(10px)', scale: 0.5 }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        }}
        transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          className="relative flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{
            scale: 1.15,
            y: 5,
          }}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.span
            className="text-xs tracking-[0.3em] uppercase relative z-10"
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [0, -3, 0],
            }}
            transition={{
              opacity: { duration: 2, repeat: Infinity },
              y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            {('Scroll').split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          <div className="relative">
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
              <motion.rect
                x="0.5"
                y="0.5"
                width="19"
                height="29"
                rx="9.5"
                stroke="currentColor"
                strokeOpacity="0.3"
                animate={{
                  strokeOpacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="10"
                cy="8"
                r="2"
                fill="currentColor"
                animate={{
                  y: [0, 14, 0],
                  opacity: [1, 0, 1],
                  scale: [1, 0.5, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* Animated arrows below */}
            <motion.div className="absolute top-full left-1/2 -translate-x-1/2 mt-1">
              {[...Array(3)].map((_, i) => (
                <motion.svg
                  key={i}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="absolute left-1/2 -translate-x-1/2"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ))}
            </motion.div>
          </div>

          {/* Enhanced glow effect */}
          <motion.div
            className="absolute inset-0 bg-[var(--gold)] rounded-full blur-2xl opacity-0 group-hover:opacity-40"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 border-2 border-[var(--gold)] rounded-full opacity-0"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        </motion.button>
      </motion.div>
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--gold)]/30 pointer-events-none hidden lg:block z-[9]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: 1,
          rotate: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 1, delay: 2 }
        }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[var(--gold)]/30 pointer-events-none hidden lg:block z-[9]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: 1,
          rotate: [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, delay: 0.5 },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          scale: { duration: 1, delay: 2.1 }
        }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[var(--gold)]/30 pointer-events-none hidden lg:block z-[9]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: 1,
          rotate: [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, delay: 1 },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          scale: { duration: 1, delay: 2.2 }
        }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--gold)]/30 pointer-events-none hidden lg:block z-[9]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: 1,
          rotate: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, delay: 1.5 },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          scale: { duration: 1, delay: 2.3 }
        }}
      />

      {/* Animated frame border */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden xl:block z-[9]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <svg className="absolute inset-0 w-full h-full">
          <motion.rect
            x="40"
            y="40"
            width="calc(100% - 80px)"
            height="calc(100% - 80px)"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="10 5"
            animate={{
              strokeDashoffset: [0, -300],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              strokeDashoffset: { duration: 20, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </svg>
      </motion.div>

      {/* Floating timestamp indicator */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: [0, 0.5, 0.5],
          y: 0,
        }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          className="px-4 py-2 backdrop-blur-md border rounded-full text-xs text-white/50 font-mono"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          animate={{
            borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(198, 151, 53, 0.3)', 'rgba(255, 255, 255, 0.1)'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PREMIUM COLLECTION {new Date().getFullYear()}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Ambient light orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none z-[8]"
        style={{
          background: `radial-gradient(circle, ${slides[currentSlide].color}20 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none z-[8]"
        style={{
          background: `radial-gradient(circle, ${slides[currentSlide].color}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </section>
  );
}
