import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";

const testimonials = [
  { quote: "Outstanding emergency service! They responded within minutes when my cattle needed urgent care. Truly professional and caring team.", name: "Adewale Johnson", role: "Livestock Farmer, Ogun State", rating: 5 },
  { quote: "My dog was seriously ill and they guided me through WhatsApp at 2 AM. The care and expertise saved his life. Forever grateful!", name: "Sarah Okonkwo", role: "Pet Owner, Lagos", rating: 5 },
  { quote: "Reliable supplier of quality veterinary products. Their WhatsApp ordering system is so convenient for my practice.", name: "Dr. Ibrahim Musa", role: "Veterinarian, Kano", rating: 5 },
  { quote: "Fast delivery and genuine products. They understand the urgency of veterinary supply needs.", name: "Grace Eze", role: "Vet Clinic Owner, Enugu", rating: 5 },
  { quote: "Excellent poultry health advice and products. My farm productivity has improved significantly.", name: "Mohammed Bello", role: "Poultry Farmer, Kaduna", rating: 5 },
  { quote: "Available anytime, professional service. The best veterinary support I've found in Nigeria.", name: "Chioma Nwosu", role: "Pet Owner, Abuja", rating: 5 },
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

  const visibleIndices = [current, (current + 1) % testimonials.length, (current + 2) % testimonials.length];

  const bgColors = [
    "from-emerald-800 to-emerald-900",
    "from-blue-800 to-blue-900",
    "from-amber-800 to-amber-900",
  ];

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Users size={12} className="inline mr-1.5 -mt-0.5" /> Client Stories
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
              What Our Clients{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Say
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Trusted by farmers, pet owners, and veterinary professionals across Nigeria
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial - Large */}
      <section className="container mx-auto px-6 -mt-8 mb-20 relative z-20">
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main Carousel Cards - Bento Style */}
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleIndices.map((idx, i) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`${i > 0 ? "hidden md:flex" : "flex"} flex-col relative overflow-hidden rounded-3xl bg-gradient-to-br ${bgColors[i]} p-8 border border-white/10 shadow-2xl group`}
                  >
                    {/* Decorative blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10 flex flex-col h-full">
                      <Quote size={36} className="text-white/20 mb-4" />
                      <p className="text-white/90 italic leading-relaxed flex-1 mb-6 text-lg font-light">
                        "{t.quote}"
                      </p>

                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, s) => (
                          <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-white/50 text-sm">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-emerald-500" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* All Testimonials - Masonry Gallery */}
      <section className="container mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-2 block">All Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Voices from the Field</h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="break-inside-avoid bg-slate-900/80 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 group"
            >
              <Quote size={24} className="text-emerald-500/30 mb-3" />
              <p className="text-slate-300 italic leading-relaxed mb-4 group-hover:text-white/90 transition-colors">
                "{t.quote}"
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="pt-3 border-t border-white/5">
                <p className="font-bold text-white text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
