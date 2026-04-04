import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { Eye } from 'lucide-react';
import { ImageLightbox } from '../components/ImageLightbox';
import { PageHero } from '../components/PageHero';

export function PortfolioPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filters = ['All', 'Weddings', 'Fashion', 'Lifestyle', 'Commercial'];

  const portfolioItems = [
    { 
      id: 1, 
      category: 'Weddings', 
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', 
      title: 'Elegant Garden Wedding', 
      location: 'Napa Valley, CA',
      description: 'A timeless celebration of love in a stunning vineyard setting',
      tall: true
    },
    { 
      id: 2, 
      category: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80', 
      title: 'Modern Editorial',
      location: 'New York, NY',
      description: 'High-fashion editorial for luxury lifestyle magazine'
    },
    { 
      id: 3, 
      category: 'Commercial', 
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80', 
      title: 'Luxury Brand Campaign',
      location: 'Los Angeles, CA',
      description: 'Commercial photography for premium jewelry brand'
    },
    { 
      id: 4, 
      category: 'Weddings', 
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80', 
      title: 'Intimate Destination Wedding',
      location: 'Santorini, Greece',
      description: 'Romantic destination wedding overlooking the Aegean Sea',
      wide: true
    },
    { 
      id: 5, 
      category: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80', 
      title: 'Haute Couture Portrait',
      location: 'Paris, France',
      description: 'Editorial fashion photography for couture designer',
      tall: true
    },
    { 
      id: 6, 
      category: 'Lifestyle', 
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80', 
      title: 'Family Heritage Session',
      location: 'San Francisco, CA',
      description: 'Multi-generational family portraits with timeless elegance'
    },
    { 
      id: 7, 
      category: 'Weddings', 
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80', 
      title: 'Classic Ballroom Wedding',
      location: 'Chicago, IL',
      description: 'Grand celebration in historic luxury venue'
    },
    { 
      id: 8, 
      category: 'Lifestyle', 
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80', 
      title: 'Urban Elegance',
      location: 'Manhattan, NY',
      description: 'Contemporary lifestyle photography in the city',
      tall: true
    },
    { 
      id: 9, 
      category: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80', 
      title: 'Minimalist Fashion',
      location: 'Milan, Italy',
      description: 'Clean, sophisticated editorial for luxury brand'
    },
    { 
      id: 10, 
      category: 'Commercial', 
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80', 
      title: 'Boutique Lifestyle',
      location: 'Beverly Hills, CA',
      description: 'Commercial photography for high-end retail brand'
    },
    { 
      id: 11, 
      category: 'Lifestyle', 
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80', 
      title: 'Maternity Elegance',
      location: 'Malibu, CA',
      description: 'Beautiful maternity session by the ocean',
      wide: true
    },
    { 
      id: 12, 
      category: 'Weddings', 
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80', 
      title: 'Rustic Countryside',
      location: 'Tuscany, Italy',
      description: 'Romantic countryside wedding in Italian villa'
    },
  ];

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our"
        titleGold="Portfolio"
        subtitle="A curated collection of our most cherished moments and creative endeavors"
        image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
        tag="Our Work"
      />

      {/* Portfolio Grid Section */}
      <section className="py-32 lg:py-48 bg-background" ref={ref}>
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[var(--gold)] text-white shadow-lg'
                    : 'bg-card border border-border hover:border-[var(--gold)]/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                // Determine size classes based on item properties
                let sizeClass = 'lg:row-span-1'; // default
                if (item.tall) {
                  sizeClass = 'lg:row-span-2';
                } else if (item.wide) {
                  sizeClass = 'lg:col-span-2 lg:row-span-1';
                }
                
                return (
                  <motion.div
                    key={item.id}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl ${sizeClass}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    layout
                    whileHover={{ y: -8 }}
                    onClick={() => {
                      setLightboxOpen(true);
                      setCurrentImageIndex(index);
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-full">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />

                      {/* Overlay with project info */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"
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
                        <p className="text-white/70 text-sm mb-2">{item.location}</p>
                        <p className="text-white/60 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-[var(--gold)] text-sm">
                          <span>View Project</span>
                          <Eye className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 shadow-[0_0_40px_rgba(184,152,111,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-32 grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '50+', label: 'Awards Won' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Countries Covered' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-2xl border border-border">
                <div 
                  className="text-4xl md:text-5xl mb-3 text-[var(--gold)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.number}
                </div>
                <div className="text-sm tracking-wide uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={filteredItems}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </div>
  );
}