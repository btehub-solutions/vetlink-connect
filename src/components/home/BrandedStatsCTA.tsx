import { motion } from "framer-motion";
import { ArrowRight, Users, FlaskConical, Award, Map, Phone, Send } from "lucide-react";

import imgVet from "@/assets/generated/pets-care.jpg";

export const BrandedStatsCTA = ({ onInquiry }: { onInquiry?: (type: string) => void }) => {
  const handleInquiry = (type: string) => {
    if (onInquiry) {
      onInquiry(type);
    } else {
      // Fallback: dispatch custom event for parent to handle
      window.dispatchEvent(new CustomEvent('divine-inquiry', { detail: { type } }));
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header / Intro */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-3 block">Nationwide Impact</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Our Footprint in <span className="text-emerald-600">Nigerian Agriculture</span>
            </h2>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            
            {/* 1. MAIN HERO TEXT CARD (Large: 2x2) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-emerald-900 rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group"
            >
                {/* Abstract Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] drop-shadow-sm">
                        Partner with the Best in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-200">Agro-Allied Solutions</span>
                    </h3>
                    <p className="text-emerald-100/80 text-lg mb-8 leading-relaxed max-w-md">
                        Whether you are a commercial farm, a feed mill, or a veterinary outlet, Divine Agvet has the supply chain capacity to support your growth.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button 
                             onClick={() => handleInquiry('partnership')}
                             className="px-6 py-3 bg-white text-emerald-950 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Start Partnership <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* 2. STAT CARD: Farmers (1x1) - Light */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-1 bg-white rounded-[2rem] p-6 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <Users size={24} />
                </div>
                <div>
                    <span className="text-4xl font-black text-slate-900 block mb-1">2,500+</span>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Farmers Supported</span>
                </div>
            </motion.div>

            {/* 3. IMAGE CARD (Vertical 1x2) - Visual */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-1 row-span-2 relative rounded-[2rem] overflow-hidden group min-h-[300px]"
            >
                <img 
                    src={imgVet}
                    alt="Nigerian Veterinarian" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase">Trusted</span>
                    </div>
                    <p className="text-white font-bold leading-tight">Empowering local agriculture with world-class veterinary standards.</p>
                </div>
            </motion.div>

            {/* 4. STAT CARD: Products (1x1) - Green */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="col-span-1 bg-emerald-600 rounded-[2rem] p-6 flex flex-col justify-between text-white shadow-lg"
            >
                 <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mb-4 backdrop-blur-sm">
                    <FlaskConical size={24} />
                </div>
                <div>
                    <span className="text-4xl font-black block mb-1">150+</span>
                    <span className="text-sm font-bold text-emerald-100 uppercase tracking-wide">Formulations</span>
                </div>
            </motion.div>

            {/* 5. STAT CARD: Experience (1x1) - Dark Slate */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="col-span-1 bg-slate-900 rounded-[2rem] p-6 flex flex-col justify-between text-white border border-slate-800"
            >
                 <div className="w-12 h-12 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center mb-4">
                    <Award size={24} />
                </div>
                <div>
                    <span className="text-4xl font-black block mb-1">17+</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Years of Trust</span>
                </div>
            </motion.div>

            {/* 6. CTA / CONTACT CARD (2x1) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10 flex-1">
                    <h4 className="text-2xl font-bold text-white mb-2">Ready to scale your farm?</h4>
                    <p className="text-blue-100 text-sm">Get direct access to our premium feed additives and medicines.</p>
                </div>
                
                <button 
                     onClick={() => handleInquiry('product_order')}
                     className="relative z-10 px-6 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg"
                >
                    <Send className="w-4 h-4" /> Order Now
                </button>
            </motion.div>

            {/* 7. STAT CARD: Coverage (1x1) - Image Context */}
            <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.6 }}
                 className="col-span-1 rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden group min-h-[180px]"
            >
                <img 
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600&auto=format&fit=crop" 
                    alt="Nigerian Map Context" 
                    className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-50 bg-slate-200 group-hover:scale-110 transition-transform duration-700" 
                />
                 <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
                 
                 <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mb-2 shadow-lg">
                        <Map size={18} />
                    </div>
                    <span className="text-4xl font-black text-slate-900 block mb-1 group-hover:text-emerald-800 transition-colors">12</span>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">States Covered</span>
                 </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
};
