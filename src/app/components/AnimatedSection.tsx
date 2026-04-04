import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

// Character reveal animation for titles
export const AnimatedTitle = ({ 
  text, 
  className = '', 
  delay = 0,
  as = 'h2'
}: { 
  text: string; 
  className?: string; 
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  const Component = motion[as];
  
  return (
    <Component className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * 0.05) + (charIndex * 0.03),
                ease: [0.33, 1, 0.68, 1]
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  );
};

// Paragraph animation with staggered fade-in
export const AnimatedParagraph = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
    >
      {children}
    </motion.p>
  );
};

// Image animation with parallax and scale
export const AnimatedImage = ({ 
  src, 
  alt, 
  className = '', 
  delay = 0,
  direction = 'up'
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const directions = {
    up: { x: 0, y: 60 },
    down: { x: 0, y: -60 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.9, ...directions[direction] }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 1,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

// Button animation with glow effect
export const AnimatedButton = ({ 
  children, 
  className = '', 
  delay = 0,
  onClick,
  href,
  type = 'button'
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
}) => {
  const baseClasses = `relative px-8 py-4 bg-[var(--gold)] text-white rounded-xl font-medium overflow-hidden group ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
      />
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
      />
      {/* Gold glow on hover */}
      <div className="absolute inset-0 shadow-[0_0_40px_rgba(198,151,53,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  const motionProps = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] },
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
  };

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={baseClasses} {...motionProps}>
      {content}
    </motion.button>
  );
};

// Card animation
export const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Section container with fade-in
export const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{
        duration: 0.8,
        delay,
      }}
    >
      {children}
    </motion.section>
  );
};

// Stagger container for lists
export const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger item
export const StaggerItem = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.33, 1, 0.68, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Icon with rotation and scale animation
export const AnimatedIcon = ({ 
  icon: Icon, 
  className = '', 
  delay = 0 
}: { 
  icon: any; 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.3 }
      }}
    >
      <Icon className={className} strokeWidth={1.5} />
    </motion.div>
  );
};

// Decorative element with complex animation
export const AnimatedDecorative = ({ 
  className = '', 
  delay = 0 
}: { 
  className?: string; 
  delay?: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay, ease: [0.33, 1, 0.68, 1] },
        scale: { duration: 1.2, delay, ease: [0.33, 1, 0.68, 1] },
        rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
};

// Hero-style button with premium animations (matching hero slideshow buttons)
export const HeroButton = ({ 
  children, 
  className = '', 
  delay = 0,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  showIcon = true
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
}) => {
  const isPrimary = variant === 'primary';
  const baseClasses = isPrimary 
    ? `relative px-8 py-4 bg-[var(--gold)] text-white text-sm md:text-base font-medium rounded-full overflow-hidden group ${className}`
    : `relative px-8 py-4 bg-transparent text-white text-sm md:text-base font-medium rounded-full border-2 border-white/30 backdrop-blur-sm overflow-hidden group ${className}`;

  const content = (
    <>
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3 }}
      >
        {children}
        {showIcon && (
          <motion.div
            animate={{
              x: [0, 5, 0],
              rotate: isPrimary ? [0, 360] : 0
            }}
            transition={{
              x: { duration: 1.5, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' }
            }}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        )}
      </motion.span>

      {/* Hover overlay */}
      <motion.div
        className={`absolute inset-0 ${isPrimary ? 'bg-white' : 'bg-white'}`}
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
          boxShadow: isPrimary 
            ? [
                '0 0 0px rgba(255, 255, 255, 0)',
                '0 0 20px rgba(255, 255, 255, 0.5)',
                '0 0 0px rgba(255, 255, 255, 0)',
              ]
            : [
                '0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)',
                '0 0 20px rgba(198, 151, 53, 0.3), inset 0 0 10px rgba(198, 151, 53, 0.1)',
                '0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)',
              ]
        }}
        transition={{ duration: isPrimary ? 2 : 3, repeat: Infinity }}
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

      {/* Rotating border gradient for secondary */}
      {!isPrimary && (
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
      )}
    </>
  );

  const motionProps = {
    whileHover: {
      scale: 1.05,
      y: -4,
      rotateX: 10,
      rotateY: -5,
      boxShadow: isPrimary 
        ? '0 30px 80px rgba(198, 151, 53, 0.6)'
        : '0 20px 60px rgba(198, 151, 53, 0.3)',
    },
    whileTap: {
      scale: 0.95,
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
    initial: { opacity: 0, x: -20, rotateY: isPrimary ? -30 : 30 },
    whileInView: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      y: [0, -2, 0],
    },
    viewport: { once: true, margin: '-100px' },
    transition: {
      duration: 0.6,
      delay,
      y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    style: { transformStyle: 'preserve-3d' as const },
  };

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={baseClasses} {...motionProps}>
      {content}
    </motion.button>
  );
};