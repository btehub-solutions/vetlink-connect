import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const locations = [
  {
    name: "Main Veterinary Center",
    address: "123 Veterinary Road, Lagos, Nigeria",
    hours: "Open 24/7",
    phone: "+234 813 697 2328",
    waMsg: "Hello, I'd like to reach your Main Veterinary Center in Lagos.",
  },
  {
    name: "Northern Branch",
    address: "456 Animal Care Street, Abuja, Nigeria",
    hours: "Open 24/7",
    phone: "+234 813 697 2328",
    waMsg: "Hello, I'd like to reach your Northern Branch in Abuja.",
  },
];

const LocationsPage = () => (
  <div className="container mx-auto px-4 py-12">
    <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-bold mb-3">Our Locations</h1>
      <p className="text-muted-foreground text-lg">Find us near you — We're available 24/7</p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {locations.map((loc, i) => (
        <motion.div
          key={loc.name}
          className="glass-card text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin size={28} className="text-primary" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-primary/10 text-primary">
            <Clock size={12} className="animate-pulse" /> 24/7
          </span>
          <h3 className="text-xl font-bold mb-2">{loc.name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{loc.address}</p>
          <p className="text-muted-foreground text-sm mb-1">{loc.hours}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium mb-5">
            <Phone size={14} /> {loc.phone}
          </div>
          <a
            href={whatsappLink(loc.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm w-full justify-center"
          >
            <MessageCircle size={16} /> Contact This Location
          </a>
        </motion.div>
      ))}
    </div>
  </div>
);

export default LocationsPage;
