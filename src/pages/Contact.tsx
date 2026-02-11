import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, AlertTriangle, Phone, Facebook, Instagram, Twitter, Linkedin, Clock, MapPin, Mail, ArrowRight, Send, Handshake, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import InquiryFormModal from "@/components/InquiryFormModal";
import { generalContactContext, partnershipContext } from "@/lib/inquiry";
import type { PageContext } from "@/lib/inquiry";

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: "General Inquiry",
    desc: "Questions about our products, services, or company",
    color: "emerald",
    gradient: "from-emerald-800 to-emerald-900",
    inquiryType: "general" as const,
  },
  {
    icon: Handshake,
    title: "Partnership & Distribution",
    desc: "Become a distribution partner or business collaborator",
    color: "blue",
    gradient: "from-blue-800 to-blue-900",
    inquiryType: "partnership" as const,
  },
  {
    icon: HelpCircle,
    title: "Product Support",
    desc: "Get help with dosage, usage, or product recommendations",
    color: "amber",
    gradient: "from-amber-800 to-amber-900",
    inquiryType: "general" as const,
  },
];

const ContactPage = () => {
  const [activeInquiry, setActiveInquiry] = useState<{ context: PageContext; title?: string; subtitle?: string } | null>(null);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-900/10 rounded-full blur-[80px]" />
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
              <Phone size={12} className="inline mr-1.5 -mt-0.5" /> Always Available
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Touch
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Choose how you'd like to reach us — we'll prepare your WhatsApp message with all the right context
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options Grid */}
      <section className="container mx-auto px-6 pb-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {contactOptions.map((opt, i) => (
            <motion.button
              key={opt.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              onClick={() =>
                setActiveInquiry({
                  context:
                    opt.inquiryType === "partnership"
                      ? partnershipContext()
                      : generalContactContext(),
                  title: opt.title,
                  subtitle: opt.desc,
                })
              }
              className={`bg-gradient-to-br ${opt.gradient} rounded-3xl p-8 relative overflow-hidden text-left group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform">
                  <opt.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{opt.title}</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">{opt.desc}</p>
                <span className="inline-flex items-center gap-2 text-white/80 text-xs font-bold group-hover:text-white transition-colors">
                  <Send size={12} /> Start Inquiry <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Contact Details Grid */}
      <section className="container mx-auto px-6 pb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Emergency Card */}
          <motion.div
            className="col-span-1 row-span-1 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 animate-pulse border border-white/10">
                <AlertTriangle size={32} className="text-white" />
              </div>
              <p className="font-bold text-xl text-white mb-3">🚨 Emergency Line</p>
              <p className="text-red-100/70 text-sm mb-6">
                For emergencies, use our dedicated emergency page for structured reporting
              </p>
            </div>

            <Link
              to="/emergency"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-700 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg w-full justify-center"
            >
              <AlertTriangle size={16} /> Go to Emergency Page <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            className="col-span-1 md:col-span-1 lg:col-span-2 bg-slate-900/80 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-900/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, label, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-colors backdrop-blur-sm"
                    aria-label={label}
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">Follow us for tips, updates, and special offers</p>
            </div>
          </motion.div>

          {/* Office Info Card - Full width */}
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-900/80 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-900/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-emerald-400" />
                </div>
                <div>
                  <span className="text-white font-bold block">WhatsApp Support</span>
                  <span className="text-emerald-400 text-sm font-bold">Available 24/7</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-blue-400" />
                </div>
                <div>
                  <span className="text-white font-bold block">Physical Locations</span>
                  <Link to="/locations" className="text-blue-400 text-sm font-bold hover:underline">
                    See our Locations page →
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-amber-400" />
                </div>
                <div>
                  <span className="text-white font-bold block">Response Time</span>
                  <span className="text-slate-400 text-sm font-bold">Under 5 minutes on WhatsApp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form Modal */}
      {activeInquiry && (
        <InquiryFormModal
          isOpen={!!activeInquiry}
          onClose={() => setActiveInquiry(null)}
          context={activeInquiry.context}
          title={activeInquiry.title}
          subtitle={activeInquiry.subtitle}
        />
      )}
    </div>
  );
};

export default ContactPage;
