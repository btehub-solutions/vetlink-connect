import { Link } from "react-router-dom";
import { MessageCircle, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="glass-dark mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Divine Agvet" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-lg font-bold text-white">Divine Agvet</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Premium veterinary care & supplies. Serving livestock owners, pet lovers, and professionals 24/7.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "Services", path: "/services" },
              { label: "Emergency", path: "/emergency" },
              { label: "Locations", path: "/locations" },
              { label: "Testimonials", path: "/testimonials" },
              { label: "FAQs", path: "/faqs" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-white/60 hover:text-white text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <a
            href="https://wa.me/2348136972328"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-whatsapp text-sm font-medium hover:underline"
          >
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
          <div className="flex items-center gap-2 mt-4 text-white/60 text-sm">
            <Clock size={16} className="text-emergency" />
            24/7 Emergency Support Available
          </div>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Divine Agvet. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
