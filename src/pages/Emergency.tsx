import { motion } from "framer-motion";
import { AlertTriangle, MessageCircle, Clock } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const EmergencyPage = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
    {/* Dark background */}
    <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />

    {/* Subtle radial glow */}
    <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 40%, hsl(24 95% 53% / 0.3), transparent 60%)" }} />

    <div className="relative z-10 text-center px-4 max-w-xl">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center pulse-emergency"
        style={{ background: "hsl(24 95% 53% / 0.2)", border: "2px solid hsl(24 95% 53% / 0.4)" }}
      >
        <AlertTriangle size={48} className="text-emergency" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-4"
      >
        24/7 Emergency Veterinary Support
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-white/60 text-lg mb-10"
      >
        We're here when every second counts
      </motion.p>

      <motion.a
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        href={whatsappLink("URGENT: I have a veterinary emergency and need immediate help.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-emergency text-xl"
      >
        <MessageCircle size={24} fill="currentColor" /> Chat Now on WhatsApp
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-2 mt-8 text-white/40 text-sm"
      >
        <Clock size={14} />
        Average response time: Under 5 minutes
      </motion.div>
    </div>
  </div>
);

export default EmergencyPage;
