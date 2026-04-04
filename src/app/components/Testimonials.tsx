import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Absolutely breathtaking work. They captured our wedding day with such elegance and artistry. Every photo feels like a work of art, and we'll treasure these memories forever.",
      name: "Sarah & Michael",
      role: "Wedding Clients",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      quote: "Working with this team was a dream. Their attention to detail and creative vision brought our brand story to life in ways we never imagined. Truly world-class talent.",
      name: "Emma Richardson",
      role: "Fashion Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
    {
      quote: "The level of professionalism and artistry is unmatched. They made us feel comfortable and captured our family's genuine moments beautifully. We couldn't be happier.",
      name: "The Anderson Family",
      role: "Lifestyle Session",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
  ];

  // Auto slideshow - changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 lg:py-48 bg-secondary/30" ref={ref}>
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-[var(--gold)]/10 rounded-full mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            Kind Words from <span className="text-[var(--gold)]">Clients</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-card rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-20 h-20 text-[var(--gold)]" fill="currentColor" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Quote */}
              <motion.p
                key={currentIndex}
                className="text-2xl md:text-3xl mb-12 leading-relaxed italic"
                style={{ fontFamily: 'var(--font-heading)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                "{testimonials[currentIndex].quote}"
              </motion.p>

              {/* Client info */}
              <motion.div
                key={`client-${currentIndex}`}
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Client image - circular, elegant */}
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--gold)]/30"
                  />
                </div>

                <div>
                  <h4 className="font-medium text-lg mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 to-transparent pointer-events-none" />
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center border-2 border-border rounded-full hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-[var(--gold)]'
                      : 'w-2 h-2 bg-border hover:bg-[var(--gold)]/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center border-2 border-border rounded-full hover:border-[var(--gold)] hover:bg-[var(--gold)]/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}