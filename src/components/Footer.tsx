import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Clock, Facebook, Instagram, Twitter, ArrowUpRight, Heart, Send } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import InquiryFormModal from "@/components/InquiryFormModal";
import { generalContactContext } from "@/lib/inquiry";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Our Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "Locations", path: "/locations" },
  { label: "FAQs", path: "/faqs" },
];

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-[#1877F2]" },
  { Icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]" },
  { Icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const Footer = () => {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <footer className="glass-footer text-white relative overflow-hidden">
      {/* Animated shimmer top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] shimmer-line z-10" />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Giant subtle glow orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/[0.03] rounded-full blur-3xl" />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 relative z-[1]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* ── Brand Column ── */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-5 flex flex-col gap-6"
          >
            <Link to="/" className="group flex items-center gap-3 w-fit">
              {/* Logo container with glass effect */}
              <div className="relative">
                <div className="relative bg-white/95 rounded-xl p-1.5 shadow-lg shadow-primary/5 group-hover:shadow-primary/15 transition-all duration-500 group-hover:scale-105 overflow-hidden">
                  <img
                    src={logo}
                    alt="Divine Agvet"
                    className="h-11 sm:h-12 w-auto object-contain relative z-[1]"
                  />
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 rounded-xl" />
                </div>
                {/* Outer glow ring */}
                <div className="absolute -inset-1 bg-primary/0 group-hover:bg-primary/10 rounded-2xl blur-md transition-all duration-500 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-primary/90 transition-colors duration-300">
                  Divine Agvet
                </span>
                <span className="text-[10px] text-slate-500 tracking-[0.15em] uppercase">
                  Since 2012
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Your trusted partner in modern agriculture and pet care. Providing
              premium veterinary products, supplies, and consultancy across Nigeria.
            </p>

            {/* Social icons with glow */}
            <div className="flex gap-3 mt-1">
              {socialLinks.map(({ Icon, href, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`social-icon-glow w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-transparent ${color} transition-all duration-300`}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 flex flex-col gap-5"
          >
            <h4 className="text-white font-semibold tracking-wide text-xs uppercase flex items-center gap-2">
              <span className="inline-block w-5 h-[2px] bg-primary/60 rounded-full" />
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={l.path}
                    className="footer-link group flex items-center gap-1 text-slate-400 hover:text-primary text-sm py-1 transition-all duration-300"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Get in Touch ── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            <h4 className="text-white font-semibold tracking-wide text-xs uppercase flex items-center gap-2">
              <span className="inline-block w-5 h-[2px] bg-primary/60 rounded-full" />
              Get in Touch
            </h4>

            <div className="flex flex-col gap-3">
              {/* WhatsApp CTA with glow */}
              <button
                onClick={() => setShowInquiry(true)}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all duration-400 w-full text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Send size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    Chat on WhatsApp
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Quick response guaranteed
                  </span>
                </div>
              </button>

              {/* Emergency support */}
              <Link to="/emergency" className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-400">
                <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                  <Clock size={16} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    24/7 Emergency Support
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Always here when you need us
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 relative"
        >
          {/* Divider with glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Divine Agvet Limited. Built with
              <Heart size={11} className="text-primary/60 fill-primary/40 animate-pulse" />
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Inquiry Modal */}
      <InquiryFormModal
        isOpen={showInquiry}
        onClose={() => setShowInquiry(false)}
        context={generalContactContext()}
        title="Chat with Us"
        subtitle="How can we help you today?"
      />
    </footer>
  );
};

export default Footer;
