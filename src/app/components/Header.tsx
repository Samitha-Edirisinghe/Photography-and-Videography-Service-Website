import { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router';
import logo from '../../imports/logo-1.png';
import { PremiumButton } from './PremiumButton';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm' 
            : 'py-6 bg-transparent backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={logo}
                  alt="Menaric Logo"
                  className={`transition-all duration-500 ${isScrolled ? 'h-8' : 'h-10'}`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm tracking-wide transition-colors ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  } ${
                    location.pathname === item.path
                      ? 'opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--gold)]`}
                      layoutId="activeSection"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Search Icon */}
              <motion.button
                className={`p-2 transition-colors ${
                  isScrolled 
                    ? 'text-foreground/70 hover:text-foreground' 
                    : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>

              {/* Theme toggle - icon button */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 transition-colors ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-5 h-5" strokeWidth={1.5} />
                )}
              </motion.button>

              {/* Book Now Button - Premium animations */}
              <Link to="/contact">
                <PremiumButton
                  variant="primary"
                  className="px-6 py-2.5 text-sm"
                  rotateIcon={false}
                >
                  Book Now
                </PremiumButton>
              </Link>
            </div>

            {/* Mobile Right Side Actions */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Mobile Search Icon */}
              <motion.button
                className={`p-2 transition-colors ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-foreground'
                    : isHome ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>

              {/* Mobile Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 transition-colors ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-foreground'
                    : isHome ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-5 h-5" strokeWidth={1.5} />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className={`transition-colors ${
                  isScrolled ? 'text-foreground' : isHome ? 'text-white' : 'text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Top bar with close button */}
              <motion.div
                className="flex items-center justify-end mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Close Button */}
                <motion.button
                  className="p-2 text-foreground hover:text-[var(--gold)] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </motion.button>
              </motion.div>

              {/* Navigation items - centered */}
              <div className="flex-1 flex flex-col items-center justify-center gap-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      className="text-3xl"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}

                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <PremiumButton
                    variant="primary"
                    delay={0.7}
                    fullWidth
                    className="mt-8 px-10 py-4 rounded-xl"
                  >
                    Book Now
                  </PremiumButton>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsSearchOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Search Box */}
            <motion.div
              className="relative w-full max-w-3xl mx-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--gold)]" strokeWidth={1.5} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, portfolio, or content..."
                  autoFocus
                  className="w-full pl-16 pr-16 py-6 bg-card text-foreground rounded-2xl border-2 border-[var(--gold)]/30 focus:border-[var(--gold)] focus:outline-none text-lg shadow-2xl"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* Search Results Hint */}
              {searchQuery && (
                <motion.div
                  className="mt-4 p-6 bg-card rounded-2xl border border-border shadow-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-muted-foreground text-sm">
                    Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to search for "{searchQuery}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}