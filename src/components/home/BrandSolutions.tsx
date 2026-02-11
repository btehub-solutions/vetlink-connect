import { motion } from "framer-motion";
import { ShieldCheck, ThermometerSun, Stethoscope } from "lucide-react";

export const BrandSolutions = () => {
    const solutions = [
        {
            title: "100% Authentic & Verified",
            desc: "Stop gambling with fake imports. Our products are manufactured locally under strict NAFDAC regulations, guaranteeing purity and potency in every bottle.",
            icon: ShieldCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50/50",
            border: "border-emerald-100",
            iconBg: "bg-emerald-100"
        },
        {
            title: "Tropical-Optimized Formulas",
            desc: "European drugs often fail in our heat. We formulate specifically for the Nigerian climate, ensuring stability and maximum efficacy for local breeds.",
            icon: ThermometerSun,
            color: "text-amber-600",
            bg: "bg-amber-50/50",
            border: "border-amber-100",
            iconBg: "bg-amber-100"
        },
        {
            title: "Expert Support & ROI",
            desc: "We don't just sell products; we sell results. Get direct access to our veterinary consultants for diagnosis and dosage aimed at maximizing your profits.",
            icon: Stethoscope,
            color: "text-blue-600",
            bg: "bg-blue-50/50",
            border: "border-blue-100",
            iconBg: "bg-blue-100"
        },
    ];

    return (
        <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-3 block"
                >
                    The Divine Agvet Promise
                </motion.span>
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-slate-900"
                >
                    Solutions You Can Trust
                </motion.h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {solutions.map((sol, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative p-8 rounded-3xl border ${sol.border} ${sol.bg} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                    >
                        {/* Decorative background blob */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl ${sol.iconBg}`} />
                        
                        <div className={`w-14 h-14 rounded-2xl ${sol.iconBg} mb-6 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <sol.icon size={28} className={sol.color} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                            {sol.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-sm font-medium">
                            {sol.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
