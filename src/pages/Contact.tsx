import { motion } from "framer-motion";
import { MessageCircle, AlertTriangle, Phone, Facebook, Instagram, Twitter, Linkedin, Clock, MapPin } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { Link } from "react-router-dom";

const ContactPage = () => (
  <div className="container mx-auto px-4 py-12">
    <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-bold mb-3">Get in Touch</h1>
      <p className="text-muted-foreground text-lg">We're always here to help — 24/7</p>
    </motion.div>

    <div className="max-w-2xl mx-auto space-y-8">
      {/* Primary Contact */}
      <motion.div
        className="glass-card text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-16 h-16 rounded-full bg-whatsapp/10 flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={32} className="text-whatsapp" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Chat with Us on WhatsApp</h2>
        <p className="text-muted-foreground mb-6">Fastest way to reach us for orders, emergencies, or inquiries</p>
        <a
          href={whatsappLink("Hello, I'd like to get in touch with your team.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp text-base justify-center w-full sm:w-auto"
        >
          <MessageCircle size={18} /> Start Chat
        </a>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium">
          <Phone size={14} /> +234 813 697 2328
        </div>
      </motion.div>

      {/* Emergency */}
      <motion.div
        className="gradient-emergency rounded-2xl p-6 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 pulse-emergency">
          <AlertTriangle size={24} />
        </div>
        <p className="font-bold text-lg mb-3">🚨 For emergencies, click here or call immediately</p>
        <a
          href={whatsappLink("URGENT: I have a veterinary emergency.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emergency font-bold rounded-full hover:scale-105 transition-transform"
        >
          <MessageCircle size={16} /> Emergency Contact
        </a>
      </motion.div>

      {/* Social Media */}
      <motion.div
        className="glass-card text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-center gap-4 mb-3">
          {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Follow us for tips, updates, and special offers</p>
      </motion.div>

      {/* Office Hours */}
      <motion.div
        className="glass-card text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <Clock size={14} className="text-primary" />
          <span className="font-medium">WhatsApp Support: Available 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>Physical Locations: <Link to="/locations" className="text-primary hover:underline">See our Locations page</Link></span>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ContactPage;
