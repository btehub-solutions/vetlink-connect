import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import InquiryFormModal from "./InquiryFormModal";
import { generalContactContext } from "@/lib/inquiry";

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  // Show tooltip once after 5s delay on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasHovered) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount. 'hasHovered' inside timeout will be stale (false), which is acceptable for this simple logic.

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip Bubble */}
        <AnimatePresence>
          {showTooltip && !showForm && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-slate-900 border border-emerald-500/20 text-white text-sm px-4 py-3 rounded-2xl rounded-br-sm shadow-xl max-w-[240px] backdrop-blur-md"
            >
              <p className="font-medium text-xs">
                👋 Need help? Click here to send us a
                <span className="text-emerald-400 font-bold"> structured inquiry</span> via
                WhatsApp
              </p>
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center"
              >
                <X size={10} className="text-slate-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => {
            setShowTooltip(false);
            setShowForm(true);
          }}
          onMouseEnter={() => {
            setHasHovered(true);
            setShowTooltip(true);
          }}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/40 relative group"
          aria-label="Send inquiry via WhatsApp"
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-60" />
          <div className="absolute inset-1 rounded-full bg-emerald-500/20 animate-pulse" />
          <MessageCircle size={28} fill="currentColor" className="relative z-10" />

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
        </motion.button>
      </div>

      {/* Inquiry Modal */}
      <InquiryFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        context={generalContactContext()}
        title="How Can We Help?"
        subtitle="Fill in your details and we'll respond via WhatsApp within minutes."
      />
    </>
  );
};

export default FloatingWhatsApp;
