import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, FlaskConical, Award, MapPin, Handshake, ThumbsUp, Wallet, ArrowRight, MessageCircle, CheckCircle2, Send } from "lucide-react";
import InquiryFormModal from "@/components/InquiryFormModal";
import { generalContactContext, partnershipContext } from "@/lib/inquiry";
import type { PageContext } from "@/lib/inquiry";

import imgVet from "@/assets/generated/pets-care.jpg";
import imgPoultry from "@/assets/generated/poultry-farm.jpg";
import imgLivestock from "@/assets/generated/pets-livestock.jpg";

const stats = [
  { value: "17+", label: "Years of Experience", icon: Award, color: "from-emerald-600 to-emerald-700" },
  { value: "2,500+", label: "Farmers Supported", icon: Users, color: "from-blue-600 to-blue-700" },
  { value: "150+", label: "Product Formulations", icon: FlaskConical, color: "from-amber-600 to-amber-700" },
  { value: "12", label: "States Covered", icon: MapPin, color: "from-purple-600 to-purple-700" },
];

const values = [
  {
    icon: Handshake,
    title: "Support Services",
    desc: "We have highly qualified professionals in every state of Nigeria providing technical support and veterinary services to help you succeed in business.",
    color: "bg-red-500",
    shadow: "shadow-red-900/20",
  },
  {
    icon: ThumbsUp,
    title: "High Quality Products",
    desc: "We have over 17 years experience providing standard brands of agro-allied products and services, standing out as a leader in quality.",
    color: "bg-emerald-500",
    shadow: "shadow-emerald-900/20",
  },
  {
    icon: Wallet,
    title: "Help You Save Money",
    desc: "With our effective brands of products and professional services, we prevent losses and maximize your farm's profitability.",
    color: "bg-blue-500",
    shadow: "shadow-blue-900/20",
  },
  {
    icon: ShieldCheck,
    title: "NAFDAC Approved",
    desc: "All our products are manufactured locally under strict NAFDAC regulations, guaranteeing purity and potency in every formulation.",
    color: "bg-amber-500",
    shadow: "shadow-amber-900/20",
  },
];

const milestones = [
  { year: "2008", event: "Divine Agvet Limited founded in Osun State, Nigeria" },
  { year: "2012", event: "Expanded product line to over 50 veterinary formulations" },
  { year: "2016", event: "Reached 1,000+ active farmers across 6 states" },
  { year: "2020", event: "Launched digital WhatsApp ordering system nationwide" },
  { year: "2024", event: "Serving 2,500+ farmers with 150+ product formulations across 12 states" },
];

const AboutUsPage = () => {
  const [activeInquiry, setActiveInquiry] = useState<{ context: PageContext; title?: string; subtitle?: string } | null>(null);

  return (
  <div className="bg-slate-950 min-h-screen">
    {/* Hero Section */}
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
            <ShieldCheck size={12} className="inline mr-1.5 -mt-0.5" /> Est. 2008 · Osun State, Nigeria
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Divine Agvet
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Proudly Nigerian. Over 17 years of manufacturing trusted veterinary products and providing expert agricultural solutions for farmers across the nation.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats Bar */}
    <div className="container mx-auto px-6 -mt-8 relative z-20 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-3xl p-6 text-center relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <stat.icon size={22} className="text-white" />
              </div>
              <span className="text-3xl md:text-4xl font-black text-white block mb-1">{stat.value}</span>
              <span className="text-xs font-bold text-white/70 uppercase tracking-wide">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    {/* Our Story Section */}
    <section className="container mx-auto px-6 pb-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row gap-12 md:gap-20 items-center"
      >
        {/* Image Side */}
        <div className="w-full md:w-1/2 relative group">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img
              src="/images/VETDOCS.jpg"
              alt="Divine Agvet Team"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Trusted Quality</p>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-emerald-500" />
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Our Story</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Homegrown Solutions for <span className="text-emerald-400">Nigerian Farms</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            <p className="border-l-2 border-emerald-500/30 pl-5">
              Divine Agvet Limited was founded with a single mission: to provide Nigerian farmers with veterinary products that actually work in our unique tropical environment.
            </p>
            <p>
              For over 17 years, we've been manufacturing NAFDAC-approved veterinary drugs, feed additives, and animal health products right here in Osun State. We understand the challenges our farmers face — from fake imports to products not designed for our climate.
            </p>
            <p>
              Today, we serve over 2,500 farmers across 12 states with more than 150 product formulations, backed by a team of qualified veterinary professionals providing 24/7 support.
            </p>
          </div>
        </div>
      </motion.div>
    </section>

    {/* Gallery Images Row */}
    <section className="container mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { img: imgPoultry, label: "Poultry Solutions", caption: "Supporting poultry farmers across Nigeria" },
          { img: imgVet, label: "Expert Care", caption: "Licensed veterinary professionals" },
          { img: imgLivestock, label: "Livestock Health", caption: "Comprehensive herd management" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer border border-white/5"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Category Label */}
            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/80 border border-white/10">
              {item.label}
            </div>
            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-bold text-white">{item.label}</h3>
              <p className="text-white/60 text-sm">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why Choose Us — Values */}
    <section className="container mx-auto px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-3 block">Why Choose Us</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          The Divine Agvet <span className="text-emerald-400">Promise</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {values.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/80 border border-white/5 rounded-3xl p-8 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl" />

            <div className="relative z-10 flex gap-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-2xl ${val.color} flex items-center justify-center shadow-lg ${val.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <val.icon size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {val.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">{val.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="container mx-auto px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm mb-3 block">Our Journey</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Key <span className="text-emerald-400">Milestones</span>
        </h2>
      </motion.div>

      <div className="max-w-2xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-emerald-500/20 -translate-x-1/2" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-colors">
                  <span className="text-emerald-400 font-black text-lg">{m.year}</span>
                  <p className="text-slate-400 text-sm mt-1">{m.event}</p>
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0 hidden md:block">
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-950 shadow-lg shadow-emerald-500/30" />
              </div>
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="container mx-auto px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-200">Divine Agvet?</span>
          </h2>
          <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed">
            Whether you're a farmer, distributor, or veterinary professional, we're here to support your growth with world-class products and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveInquiry({ context: generalContactContext(), title: "Learn More About Us", subtitle: "Tell us about your needs and we'll get back to you." })}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg hover:scale-105"
            >
              <Send size={18} /> Chat with Us <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveInquiry({ context: partnershipContext() })}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Become a Partner <ArrowRight size={16} />
            </button>
          </div>
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
        subtitle={activeInquiry.subtitle}
      />
    )}
  </div>
  );
};

export default AboutUsPage;
