import { motion } from 'motion/react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  showIcon?: boolean;
  rotateIcon?: boolean;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  delay?: number;
}

export function PremiumButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  icon: Icon = ArrowRight,
  showIcon = true,
  rotateIcon = true,
  className = '',
  disabled = false,
  fullWidth = false,
  delay = 0,
}: PremiumButtonProps) {

  // Variant-specific styles
  const variantStyles = {
    primary: {
      className: 'bg-[var(--gold)] text-white',
      hoverStyle: {
        scale: 1.08,
        y: -5,
        rotateX: 10,
        rotateY: -5,
        boxShadow: '0 30px 80px rgba(198, 151, 53, 0.6)',
      },
      particleColor: 'bg-white',
      glowColor: 'rgba(255, 255, 255, 0.5)',
    },
    secondary: {
      className: 'backdrop-blur-md text-white border-2 transition-colors duration-300 hover:bg-white/15 hover:border-[var(--gold)]/80',
      baseStyle: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.3)' },
      hoverStyle: {
        scale: 1.08,
        y: -5,
        rotateX: 10,
        rotateY: 5,
        boxShadow: '0 20px 60px rgba(198, 151, 53, 0.4)',
      },
      particleColor: 'bg-[var(--gold)]',
      glowColor: 'rgba(198, 151, 53, 0.3)',
    },
    outline: {
      className: 'border-2 text-[var(--gold)] transition-colors duration-300 hover:bg-[var(--gold)]/10',
      baseStyle: { backgroundColor: 'transparent', borderColor: 'rgba(198, 151, 53, 1)' },
      hoverStyle: {
        scale: 1.08,
        y: -5,
        rotateX: 10,
        rotateY: -5,
        boxShadow: '0 20px 60px rgba(198, 151, 53, 0.4)',
      },
      particleColor: 'bg-[var(--gold)]',
      glowColor: 'rgba(198, 151, 53, 0.3)',
    },
  };

  const variantConfig = variantStyles[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative px-6 md:px-8 py-3 md:py-4 font-semibold rounded-full overflow-hidden ${
        fullWidth ? 'w-full' : 'w-full sm:w-auto'
      } ${variantConfig.className} ${className}`}
      whileHover={disabled ? {} : variantConfig.hoverStyle}
      whileTap={
        disabled
          ? {}
          : {
              scale: 0.95,
              y: 0,
              rotateX: 0,
              rotateY: 0,
            }
      }
      initial={{ opacity: 0, x: -20, rotateY: variant === 'primary' ? -30 : 30 }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
        y: [0, -2, 0],
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: delay },
      }}
      style={{
        transformStyle: 'preserve-3d',
        ...(variantConfig.baseStyle || {})
      }}
    >
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        whileHover={showIcon ? { x: 5 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
        {showIcon && (
          <motion.div
            animate={
              rotateIcon
                ? {
                    x: [0, 5, 0],
                    rotate: [0, 360],
                  }
                : {
                    x: [0, 5, 0],
                  }
            }
            transition={
              rotateIcon
                ? {
                    x: { duration: 1.5, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                  }
                : {
                    x: { duration: 1.5, repeat: Infinity },
                  }
            }
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        )}
      </motion.span>

      {/* Multiple animated overlays for primary variant */}
      {variant === 'primary' && (
        <>
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
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 3D depth shadow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50"
            style={{ transform: 'translateZ(-10px)' }}
          />
        </>
      )}

      {/* Secondary/Outline variant animations */}
      {(variant === 'secondary' || variant === 'outline') && (
        <>
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                `0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)`,
                `0 0 20px ${variantConfig.glowColor}, inset 0 0 10px rgba(198, 151, 53, 0.1)`,
                `0 0 0px rgba(198, 151, 53, 0), inset 0 0 0px rgba(198, 151, 53, 0)`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Rotating border gradient */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            whileHover={{ opacity: 1 }}
            animate={{ rotate: 360 }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
            }}
            style={{
              background: 'conic-gradient(from 0deg, transparent, var(--gold), transparent)',
              padding: '2px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
            }}
          />

          {/* Hover shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%', skewX: -20 }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      )}

      {/* Particle burst on hover - all variants */}
      <motion.div className="absolute inset-0" whileHover="hover">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${variantConfig.particleColor} rounded-full`}
            style={{
              left: '50%',
              top: '50%',
            }}
            variants={{
              hover: {
                x: Math.cos((i * Math.PI) / 4) * 30,
                y: Math.sin((i * Math.PI) / 4) * 30,
                opacity: [1, 0],
                scale: [0, 1, 0],
              },
            }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </motion.div>
    </motion.button>
  );
}
