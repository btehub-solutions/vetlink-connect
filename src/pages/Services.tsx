import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Stethoscope, Truck, Tractor, MessageCircle, ArrowRight, ShieldCheck, Users, Zap, Send } from "lucide-react";
import InquiryFormModal from "@/components/InquiryFormModal";
import { DosageCalculator } from "@/components/tools/DosageCalculator";
import { serviceContext, consultationContext, partnershipContext } from "@/lib/inquiry";
import type { PageContext } from "@/lib/inquiry";

interface ServiceItem {
  icon: typeof AlertTriangle;
  title: string;
  desc: string;
  btn: string;
  highlight?: boolean;
  gradient: string;
  iconBg: string;
  features: string[];
  inquiryType: "service_request" | "consultation" | "partnership";
}

const services: ServiceItem[] = [
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Care",
    desc: "Immediate response for critical situations. Our veterinarians are always on standby with an average response time under 5 minutes.",
    btn: "Report Emergency",
    highlight: true,
    gradient: "from-red-600 to-orange-600",
    iconBg: "bg-white/20",
    features: ["Under 5min response", "24/7 availability", "Expert vets on call"],
    inquiryType: "service_request",
  },
  {
    icon: Stethoscope,
    title: "Expert Consultations",
    desc: "Professional advice on animal health, nutrition, and treatment plans. Get direct access to our veterinary consultants.",
    btn: "Book Consultation",
    gradient: "from-emerald-800 to-emerald-900",
    iconBg: "bg-emerald-500/20",
    features: ["Disease diagnosis", "Treatment plans", "Nutrition advice"],
    inquiryType: "consultation",
  },
  {
    icon: Truck,
    title: "Veterinary Supply Distribution",
    desc: "Reliable delivery of medications, feed additives, and equipment to veterinary professionals and farms across Nigeria.",
    btn: "Become a Partner",
    gradient: "from-blue-800 to-blue-900",
    iconBg: "bg-blue-500/20",
    features: ["Nationwide delivery", "Bulk pricing", "Genuine products"],
    inquiryType: "partnership",
  },
  {
    icon: Tractor,
    title: "Livestock Health Programs",
    desc: "Comprehensive herd health management, vaccination schedules, and preventive care programs tailored for Nigerian farms.",
    btn: "Request Support",
    gradient: "from-amber-800 to-amber-900",
    iconBg: "bg-amber-500/20",
    features: ["Vaccination schedules", "Preventive care", "Herd management"],
    inquiryType: "service_request",
  },
];

const stats = [
  { value: "2,500+", label: "Farmers Supported", icon: Users },
  { value: "<5min", label: "Avg Response Time", icon: Zap },
  { value: "17+", label: "Years Experience", icon: ShieldCheck },
];

const ServicesPage = () => {
  const [activeInquiry, setActiveInquiry] = useState<{ context: PageContext; title: string } | null>(null);

  const openInquiry = (service: ServiceItem) => {
    let ctx: PageContext;
    switch (service.inquiryType) {
      case "consultation":
        ctx = consultationContext();
        break;
      case "partnership":
        ctx = partnershipContext();
        break;
      default:
        ctx = serviceContext(service.title);
    }
    setActiveInquiry({ context: ctx, title: service.btn });
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
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
              Professional Veterinary Services
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
              Our Veterinary{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Services
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Professional care whenever you need it — backed by 17+ years of trusted veterinary excellence across Nigeria
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <stat.icon size={18} className="text-emerald-400" />
              </div>
              <div>
                <span className="text-2xl font-black text-white block leading-none">{stat.value}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Smart Tools Section */}
      <section className="container mx-auto px-6 py-24 relative">
         <div className="mb-16 text-center">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4 block">Self-Service Tools</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Smart Application Tools</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
               Use our digital tools to calculate precise dosages and manage your farm's health metrics independently.
            </p>
         </div>
         
         <DosageCalculator />
      </section>

      {/* Services Gallery */}
      <section className="container mx-auto px-6 pb-32 relative">
        <div className="space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl group ${
                s.highlight ? "md:col-span-2" : ""
              }`}
            >
              <div className={`bg-gradient-to-br ${s.gradient} p-8 md:p-12 relative overflow-hidden`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

                <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center relative z-10`}>
                  {/* Icon Side */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl ${s.iconBg} backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-2xl ${
                        s.highlight ? "animate-pulse" : ""
                      }`}
                    >
                      <s.icon size={48} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-lg border-l-2 border-white/20 pl-5">
                      {s.desc}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {s.features.map((feat, fi) => (
                        <span
                          key={fi}
                          className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-bold rounded-full border border-white/10"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => openInquiry(s)}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-xl"
                    >
                      <Send size={18} /> {s.btn} <ArrowRight size={16} />
                    </button>
                    <p className="text-white/40 text-xs mt-3 pl-1">
                      Fill a short form → We'll prepare your WhatsApp message
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry Form Modal */}
      {activeInquiry && (
        <InquiryFormModal
          isOpen={!!activeInquiry}
          onClose={() => setActiveInquiry(null)}
          context={activeInquiry.context}
          title={activeInquiry.title}
        />
      )}
    </div>
  );
};

export default ServicesPage;
