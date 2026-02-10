import { motion } from "framer-motion";
import { AlertTriangle, Stethoscope, Truck, Tractor, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const services = [
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Care",
    desc: "Immediate response for critical situations. Our veterinarians are always on standby.",
    btn: "Get Emergency Help",
    msg: "EMERGENCY: I need urgent veterinary care.",
    highlight: true,
  },
  {
    icon: Stethoscope,
    title: "Expert Consultations",
    desc: "Professional advice on animal health, nutrition, and treatment plans.",
    btn: "Book Consultation",
    msg: "I'd like to schedule a veterinary consultation.",
  },
  {
    icon: Truck,
    title: "Veterinary Supply Distribution",
    desc: "Reliable delivery of medications and equipment to professionals.",
    btn: "Become a Partner",
    msg: "I'm interested in becoming a distribution partner.",
  },
  {
    icon: Tractor,
    title: "Livestock Health Programs",
    desc: "Herd health management, vaccination schedules, preventive care.",
    btn: "Learn More",
    msg: "I need livestock management support.",
  },
];

const ServicesPage = () => (
  <div className="container mx-auto px-4 py-12">
    <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-bold mb-3">Our Veterinary Services</h1>
      <p className="text-muted-foreground text-lg">Professional care whenever you need it</p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          className={`glass-card ${s.highlight ? "md:col-span-2 gradient-emergency text-white" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
            s.highlight ? "bg-white/20 pulse-emergency" : "bg-primary/10"
          }`}>
            <s.icon size={28} className={s.highlight ? "text-white" : "text-primary"} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">{s.title}</h3>
          <p className={`text-sm leading-relaxed mb-6 ${s.highlight ? "text-white/80" : "text-muted-foreground"}`}>
            {s.desc}
          </p>
          <a
            href={whatsappLink(s.msg)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
              s.highlight
                ? "bg-white text-emergency"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <MessageCircle size={16} /> {s.btn}
          </a>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ServicesPage;
