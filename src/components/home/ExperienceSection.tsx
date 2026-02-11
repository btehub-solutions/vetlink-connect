import { Handshake, ThumbsUp, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 md:mb-20">
            <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-2 block relative pl-10 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-8 before:h-0.5 before:bg-red-500">
                Why Choose Us
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 max-w-3xl leading-[1.1]">
                We have over <span className="text-emerald-600">17 Years</span> of Experience
            </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center relative">
            {/* Image Section - Spans 7 cols */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 relative"
            >
                <div className="relative rounded-l-3xl overflow-hidden min-h-[500px] h-full shadow-2xl">
                    <img 
                        src="/images/VETDOCS.jpg" 
                        alt="Veterinary Team with Golden Retriever" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    {/* Floating Badge (optional based on image vibe) */}
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl border-l-4 border-emerald-500 shadow-lg">
                        <p className="text-3xl font-black text-slate-900">100%</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trusted Quality</p>
                    </div>
                </div>
            </motion.div>

            {/* Content Card - Overlaps Image - Spans 6 cols (5+overlap) */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:col-span-5 md:-ml-24 z-10"
            >
                <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden group">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="space-y-10 relative z-10">
                        
                        {/* Item 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-900/20 group-hover:scale-110 transition-transform duration-300">
                                    <Handshake className="text-white w-8 h-8" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-white">Support Services</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    We have highly qualified professionals in every state of Nigeria providing technical support and veterinary services to help you succeed in business.
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300 delay-75">
                                    <ThumbsUp className="text-white w-8 h-8" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-white">High Quality Products</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    We have over 17 years experience providing standard brands of agro-allied products and services, standing out as a leader in quality.
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-300 delay-150">
                                    <Wallet className="text-white w-8 h-8" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-white">Help You Save Money</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    With our effective brands of products and professional services, we prevent losses and maximize your farm's profitability.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};
