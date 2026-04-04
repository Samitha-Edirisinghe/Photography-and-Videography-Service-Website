import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ImageLightboxProps {
  images: Array<{
    id: number;
    image: string;
    title: string;
    category?: string;
    location?: string;
    description?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setZoom(1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      setZoom(1);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Top Bar - Controls */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Info */}
            <div className="flex-1">
              <h3 className="text-white text-xl md:text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {currentImage.title}
              </h3>
              {currentImage.location && (
                <p className="text-white/70 text-sm">{currentImage.location}</p>
              )}
            </div>

            {/* Counter */}
            <div className="text-white/80 text-sm font-medium mx-6">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Zoom & Close */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </motion.div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                className="relative max-w-7xl max-h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: zoom }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={currentImage.image}
                  alt={currentImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Bar - Description & Navigation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Description */}
              {currentImage.description && (
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-[var(--gold)]/20 backdrop-blur-sm rounded-full mb-3">
                    <span className="text-xs tracking-wider uppercase text-[var(--gold)]">
                      {currentImage.category}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm md:text-base">
                    {currentImage.description}
                  </p>
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto max-w-md scrollbar-hide">
                  {images.map((img, idx) => (
                    <motion.button
                      key={img.id}
                      onClick={() => {
                        onNavigate(idx);
                        setZoom(1);
                      }}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        idx === currentIndex
                          ? 'border-[var(--gold)] scale-110'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                      whileHover={{ scale: idx === currentIndex ? 1.1 : 1.05 }}
                    >
                      <img
                        src={img.image}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={handleNext}
                  disabled={currentIndex === images.length - 1}
                  className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
