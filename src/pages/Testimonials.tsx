import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "Outstanding emergency service! They responded within minutes when my cattle needed urgent care. Truly professional and caring team.", name: "Adewale Johnson", role: "Livestock Farmer, Ogun State" },
  { quote: "My dog was seriously ill and they guided me through WhatsApp at 2 AM. The care and expertise saved his life. Forever grateful!", name: "Sarah Okonkwo", role: "Pet Owner, Lagos" },
  { quote: "Reliable supplier of quality veterinary products. Their WhatsApp ordering system is so convenient for my practice.", name: "Dr. Ibrahim Musa", role: "Veterinarian, Kano" },
  { quote: "Fast delivery and genuine products. They understand the urgency of veterinary supply needs.", name: "Grace Eze", role: "Vet Clinic Owner, Enugu" },
  { quote: "Excellent poultry health advice and products. My farm productivity has improved significantly.", name: "Mohammed Bello", role: "Poultry Farmer, Kaduna" },
  { quote: "Available anytime, professional service. The best veterinary support I've found in Nigeria.", name: "Chioma Nwosu", role: "Pet Owner, Abuja" },
];

const TestimonialsPage = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  // Show 3 on desktop, 1 on mobile via CSS
  const visibleIndices = [current, (current + 1) % testimonials.length, (current + 2) % testimonials.length];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">What Our Clients Say</h1>
        <p className="text-muted-foreground text-lg">Trusted by farmers, pet owners, and veterinary professionals</p>
      </motion.div>

      <div
        className="relative max-w-5xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {visibleIndices.map((idx, i) => {
            const t = testimonials[idx];
            return (
              <motion.div
                key={`${idx}-${current}`}
                className={`glass-card flex flex-col ${i > 0 ? "hidden md:flex" : "flex"}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Quote size={28} className="text-primary/30 mb-3" />
                <p className="text-foreground/80 italic leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-emergency fill-emergency" />
                  ))}
                </div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
