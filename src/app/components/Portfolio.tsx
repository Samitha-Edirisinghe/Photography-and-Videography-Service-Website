import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { ImageLightbox } from './ImageLightbox';
import { Link } from 'react-router';
import { Eye, ArrowRight } from 'lucide-react';
import { PremiumButton } from './PremiumButton';

export function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ['All', 'Weddings', 'Fashion', 'Lifestyle', 'Commercial'];

  const portfolioItems = [
    { id: 1, category: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', title: 'Elegant Celebration', location: 'Napa Valley, CA', description: 'A timeless celebration of love in a stunning vineyard setting' },
    { id: 2, category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80', title: 'Modern Editorial', location: 'New York, NY', description: 'High-fashion editorial for luxury lifestyle magazine' },
    { id: 3, category: 'Commercial', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80', title: 'Brand Story', location: 'Los Angeles, CA', description: 'Commercial photography for premium jewelry brand' },
    { id: 4, category: 'Weddings', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80', title: 'Intimate Moments', location: 'Santorini, Greece', description: 'Romantic destination wedding overlooking the Aegean Sea' },
    { id: 5, category: 'Fashion', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80', title: 'Style Portrait', location: 'Paris, France', description: 'Editorial fashion photography for couture designer' },
    { id: 6, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80', title: 'Natural Beauty', location: 'San Francisco, CA', description: 'Multi-generational family portraits with timeless elegance' },
    { id: 7, category: 'Weddings', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80', title: 'Romantic Journey', location: 'Chicago, IL', description: 'Grand celebration in historic luxury venue' },
    { id: 8, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80', title: 'Urban Elegance', location: 'Manhattan, NY', description: 'Contemporary lifestyle photography in the city' },
  ];

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="py-32 lg:py-48 bg-secondary/30 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Our <span className="text-[var(--gold)]">Finest Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated collection of our most cherished moments and creative endeavors
          </p>
        </motion.div>

        {/* Filters - pill style buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-[var(--gold)] text-white shadow-lg shadow-[var(--gold)]/30'
                  : 'bg-card border border-border hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid - Premium masonry layout */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Create varied sizes for visual interest
              // Pattern: large, regular, regular, large, regular, large, regular, regular
              const isLarge = index === 0 || index === 3 || index === 5;
              
              return (
                <motion.div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl ${
                    isLarge ? 'lg:col-span-2 lg:row-span-2' : 'lg:row-span-1'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  layout
                  whileHover={{ y: -8 }}
                  onClick={() => openLightbox(index)}
                >
                  {/* Image with hover zoom */}
                  <div className="relative overflow-hidden h-full">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View Icon */}
                    <motion.div
                      className="absolute top-6 right-6 w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Content overlay */}
                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <div className="inline-block px-3 py-1 bg-[var(--gold)]/20 backdrop-blur-sm rounded-full mb-3 self-start">
                        <span className="text-xs tracking-wider uppercase text-[var(--gold)]">
                          {item.category}
                        </span>
                      </div>
                      <h3 
                        className="text-2xl text-white mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm">{item.location}</p>
                    </motion.div>
                  </div>

                  {/* Premium border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl shadow-[0_0_50px_rgba(198,151,53,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/portfolio">
            <PremiumButton
              variant="primary"
              className="px-12 py-5 rounded-xl"
              delay={0.5}
            >
              View Full Gallery
            </PremiumButton>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={filteredItems}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </section>
  );
}