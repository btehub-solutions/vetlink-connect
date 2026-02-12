import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageCircle, ArrowRight, Navigation, Send, ExternalLink } from "lucide-react";
import InquiryFormModal from "@/components/InquiryFormModal";
import { generalContactContext } from "@/lib/inquiry";
import type { PageContext } from "@/lib/inquiry";

const locations = [
  {
    name: "Warehouse",
    address: "Oyediji Building, Opposite Sky Bank, Monatan, Ibadan, Oyo State, Nigeria",
    hours: "Open 24/7",
    phone: "+234 813 697 2328",
    waMsg: "Hello, I'd like to reach your Warehouse in Monatan, Ibadan.",
    gradient: "from-emerald-800 to-emerald-900",
    badge: "Warehouse",
    lat: 7.3590,
    lng: 3.8510,
    mapQuery: "Oyediji+Building+Monatan+Ibadan+Oyo+State+Nigeria",
  },
  {
    name: "Factory",
    address: "No. 6, Ikoyi-Ile, Osun State, Nigeria",
    hours: "Open 24/7",
    phone: "+234 813 697 2328",
    waMsg: "Hello, I'd like to reach your Factory in Ikoyi-Ile, Osun State.",
    gradient: "from-blue-800 to-blue-900",
    badge: "Factory",
    lat: 7.6506,
    lng: 4.2978,
    mapQuery: "Ikoyi-Ile+Osun+State+Nigeria",
  },
];

const LocationsPage = () => {
  const [activeInquiry, setActiveInquiry] = useState<{ context: PageContext; title?: string } | null>(null);

  const openInquiry = (locationName: string) => {
    setActiveInquiry({
      context: generalContactContext(),
      title: `Contact ${locationName}`,
    });
  };

  return (
  <div className="bg-slate-950 min-h-screen">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-900/10 rounded-full blur-[80px]" />
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
            <Navigation size={12} className="inline mr-1.5 -mt-0.5" /> Find Us
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Locations
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Find us near you — We're available 24/7 across Nigeria
          </p>
        </motion.div>
      </div>
    </section>

    {/* Location Cards */}
    <section className="container mx-auto px-6 pb-32 -mt-8 relative z-20">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Location Card */}
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${loc.gradient} border border-white/10 shadow-2xl group`}>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

              <div className="relative z-10 p-8 md:p-10">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider border border-white/10">
                    {loc.badge}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
                    <Clock size={10} className="animate-pulse" /> 24/7
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-2xl mb-6"
                >
                  <MapPin size={36} className="text-white" />
                </motion.div>

                {/* Details */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{loc.name}</h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin size={16} className="flex-shrink-0 text-white/40" />
                    <span className="text-sm">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Clock size={16} className="flex-shrink-0 text-white/40" />
                    <span className="text-sm">{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone size={16} className="flex-shrink-0 text-white/40" />
                    <span className="text-sm font-bold">{loc.phone}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => openInquiry(loc.name)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-xl"
                >
                  <Send size={18} /> Contact This Location <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-900/60 backdrop-blur-sm"
            >
              {/* Map Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    {loc.name} — Directions
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${loc.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-colors"
                >
                  Open in Google Maps <ExternalLink size={12} />
                </a>
              </div>

              {/* Map Embed */}
              <div className="relative w-full" style={{ height: "260px" }}>
                <iframe
                  title={`Map - ${loc.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
                  allowFullScreen
                />
              </div>

              {/* Get Directions Button */}
              <div className="p-4 bg-slate-900/80 border-t border-white/10">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-lg bg-gradient-to-r ${
                    loc.name === "Warehouse"
                      ? "from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
                      : "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                  } text-white`}
                >
                  <Navigation size={16} />
                  Get Directions
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Coverage Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto mt-12 bg-slate-900/80 border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-900/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Navigation size={20} className="text-emerald-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Nationwide Delivery Available</h3>
          <p className="text-slate-400 max-w-lg mx-auto">
            Even if you're not near our physical locations, we deliver veterinary products to most states across Nigeria. Contact us to confirm delivery to your area.
          </p>
        </div>
      </motion.div>
    </section>

    {/* Inquiry Form Modal */}
    {activeInquiry && (
      <InquiryFormModal
        isOpen={!!activeInquiry}
        onClose={() => setActiveInquiry(null)}
        context={activeInquiry.context}
        title={activeInquiry.title}
        subtitle="We'll direct your inquiry to this branch."
      />
    )}
  </div>
  );
};

export default LocationsPage;
