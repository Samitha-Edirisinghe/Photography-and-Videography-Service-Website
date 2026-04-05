import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ChevronUp } from 'lucide-react';

export function Root() {
  const [isDark, setIsDark] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      {/* Scroll to top on route change */}
      <ScrollToTop />
      
      {/* Progress bar - elegant gold accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--gold)] origin-left z-50 shadow-lg shadow-[var(--gold)]/20"
        style={{ scaleX }}
      />

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Scroll to top - refined with rounded corners */}
      <motion.button
        className="fixed bottom-10 right-10 z-40 p-4 bg-[var(--gold)] text-white rounded-full shadow-2xl hover:shadow-[var(--gold)]/30 transition-all duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUp className="w-6 h-6" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
