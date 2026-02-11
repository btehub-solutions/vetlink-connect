import { motion } from "framer-motion";
import { AlertTriangle, Phone, ShieldCheck, Clock } from "lucide-react";
import EmergencyForm from "@/components/EmergencyForm";

const EmergencyPage = () => (
  <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-16">
    {/* Decorative Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[100px]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, hsl(24 95% 53% / 0.3), transparent 60%)",
        }}
      />
    </div>

    <div className="relative z-10 text-center px-6 max-w-2xl w-full">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-8"
      >
        <div className="w-28 h-28 rounded-3xl mx-auto flex items-center justify-center relative">
          {/* Pulsating rings */}
          <div className="absolute inset-0 rounded-3xl bg-red-500/10 animate-ping" />
          <div className="absolute inset-2 rounded-3xl bg-red-500/15 animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-red-600/30 to-orange-600/20 border-2 border-red-500/30 flex items-center justify-center backdrop-blur-sm">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>
      </motion.div>

      {/* Badge */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest mb-6"
      >
        <ShieldCheck size={12} className="inline mr-1.5 -mt-0.5" /> 24/7 Emergency Line
      </motion.span>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-[1.05]"
      >
        Emergency{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
          Veterinary Support
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-lg text-slate-400 mb-4 leading-relaxed max-w-lg mx-auto"
      >
        We're here when every second counts. Fill the form below so our team can prepare to help.
      </motion.p>

      {/* Quick Call Option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
      >
        <a
          href="tel:+2348136972328"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
        >
          <Phone size={16} /> Call Directly: +234 813 697 2328
        </a>
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Clock size={12} className="text-emerald-400" />
          Avg response: <span className="text-white font-bold">Under 5 minutes</span>
        </div>
      </motion.div>

      {/* ── Embedded Emergency Form ── */}
      <EmergencyForm />
    </div>
  </div>
);

export default EmergencyPage;
