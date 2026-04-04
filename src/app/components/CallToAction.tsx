import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden" ref={ref}>
      {/* Dark background with subtle texture/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#0B0B0B]">
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--gold-dark)_0%,_transparent_70%)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          {/* Strong emotional headline */}
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Create
            <br />
            <span className="text-[var(--gold)]">Something Timeless?</span>
          </h2>

          {/* Refined divider */}
          <motion.div
            className="w-20 h-0.5 bg-[var(--gold)]/40 mx-auto mb-10"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
            Let's collaborate to craft stunning visual stories that capture your most precious moments with elegance and artistry
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <PremiumButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="primary"
              delay={0.5}
              className="px-12 py-5 rounded-xl tracking-wide"
            >
              Get Started
            </PremiumButton>

            <PremiumButton
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              variant="secondary"
              delay={0.6}
              className="px-12 py-5 rounded-xl tracking-wide"
            >
              View Our Work
            </PremiumButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
