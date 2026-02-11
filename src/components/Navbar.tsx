import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "About Us", path: "/about" },
  { label: "Locations", path: "/locations" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQs", path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll for glass intensity change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 glass-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group relative z-50">
          <motion.div
            className="relative logo-glow"
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logo}
              alt="Divine Agvet"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            {/* Subtle glow ring behind logo on hover */}
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 blur-xl transition-all duration-500 -z-10 scale-150" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300">
              Divine Agvet
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground/60 tracking-widest uppercase hidden sm:block">
              Livestock Solutions
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((l, i) => (
            <motion.div
              key={l.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
            >
              <Link
                to={l.path}
                className={`nav-link-hover px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === l.path
                    ? "active text-primary font-semibold bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-50/80"
                }`}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 24/7 Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emergency/8 border border-emergency/15 text-emergency text-xs font-semibold tracking-wide hover:bg-emergency/15 hover:border-emergency/25 transition-all duration-300 cursor-default"
          >
            <Clock size={12} className="animate-pulse" />
            <span>24/7</span>
          </motion.div>

          {/* CTA Button with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              to="/contact"
              className="hidden lg:flex items-center justify-center px-5 xl:px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-btn"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            className="lg:hidden relative p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-slate-100/80 transition-all duration-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 top-16 sm:top-20 z-40 overflow-hidden lg:hidden"
          >
            {/* Glass background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-2xl"
            />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />
            <div className="absolute top-20 right-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-8 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />

            <div className="relative container mx-auto px-6 py-8 flex flex-col h-full">
              {/* Nav links */}
              <div className="flex flex-col gap-1 flex-1">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Link
                      to={l.path}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium tracking-tight transition-all duration-300 ${
                        location.pathname === l.path
                          ? "text-primary bg-primary/5 border border-primary/10"
                          : "text-foreground/75 hover:text-primary hover:bg-primary/5 hover:pl-6"
                      }`}
                    >
                      <span>{l.label}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-all duration-300 ${
                          location.pathname === l.path
                            ? "text-primary opacity-100"
                            : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="pt-6 pb-8 border-t border-border/10"
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center px-6 py-4 rounded-2xl bg-primary text-primary-foreground text-lg font-medium glow-btn"
                >
                  Get in Touch
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-emergency text-sm font-medium">
                  <Clock size={14} className="animate-pulse" />
                  <span>24/7 Emergency Support Available</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
