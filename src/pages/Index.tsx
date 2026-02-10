import { motion } from "framer-motion";
import { Beef, Cat, Stethoscope, Clock, ShieldCheck, Zap, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: Beef,
    title: "Livestock Veterinary Care",
    desc: "Expert care for cattle, poultry, goats, and all farm animals",
    msg: "I'm interested in livestock veterinary services.",
    btn: "Learn More",
  },
  {
    icon: Cat,
    title: "Pet Health & Wellness",
    desc: "Compassionate care for your beloved pets, day or night",
    msg: "I need pet care services.",
    btn: "Learn More",
  },
  {
    icon: Stethoscope,
    title: "Professional Vet Supplies",
    desc: "Premium medications, equipment, and supplies",
    msg: "I'd like to inquire about veterinary supplies.",
    btn: "Shop Now",
  },
];

const testimonials = [
  { quote: "Divine Agvet saved my herd during a sudden outbreak. Their 24/7 response is truly lifesaving.", name: "Alhaji Musa", role: "Livestock Farmer" },
  { quote: "My dog received the best care here. The team is caring, knowledgeable, and always available.", name: "Ada Okonkwo", role: "Pet Owner" },
  { quote: "Reliable supply chain for all our clinic needs. They deliver quality products consistently.", name: "Dr. Emeka", role: "Veterinary Professional" },
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emergency/20 text-emergency border border-emergency/30 text-sm font-semibold mb-6">
              <Clock size={16} className="animate-pulse" />
              24/7 Available
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Premium Veterinary Care & Supplies — Available 24/7
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/70 mb-8 max-w-lg">
              Serving livestock owners, pet lovers, and veterinary professionals across Nigeria with excellence.
            </motion.p>
            <motion.a
              variants={fadeUp}
              custom={3}
              href={whatsappLink("Hello, I'd like to inquire about your veterinary services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base"
            >
              💬 Chat with Us on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{f.desc}</p>
              <a
                href={whatsappLink(f.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {f.btn} →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="gradient-emergency rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center pulse-emergency shrink-0">
            <AlertTriangle size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Emergency Veterinary Support?</h2>
            <p className="text-white/80">We're Here 24/7 — every second counts.</p>
          </div>
          <a
            href={whatsappLink("EMERGENCY: I need immediate veterinary assistance.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3 bg-white text-emergency font-bold rounded-full hover:scale-105 transition-transform"
          >
            Get Help Now
          </a>
        </motion.div>
      </section>

      {/* Trust / Testimonials */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Trusted by Thousands</h2>
          <p className="text-muted-foreground">Hear from livestock farmers, pet owners, and professionals.</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="glass-card text-center min-h-[180px] flex flex-col justify-center">
            <p className="text-lg italic text-foreground/80 mb-4">"{testimonials[currentTestimonial].quote}"</p>
            <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
          </div>
          <button
            onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentTestimonial ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Trust icons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Clock, label: "24/7 Availability" },
            { icon: ShieldCheck, label: "Licensed Veterinarians" },
            { icon: Zap, label: "Fast Response" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 glass-card text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={22} className="text-primary" />
              </div>
              <span className="font-semibold text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
