import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Filter, ArrowRight, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import InquiryFormModal from "@/components/InquiryFormModal";
import { productContext } from "@/lib/inquiry";

import imgViramax150 from "@/assets/products/viramax-150ml.png";
import imgMaxitet from "@/assets/products/maxitet.png";
import imgViramaxLg from "@/assets/products/viramax-large.png";
import imgMaxiceryl from "@/assets/products/maxiceryl.png";
import imgVitaconc from "@/assets/products/maxi-vitaconc.png";
import imgEnrocoli from "@/assets/products/enrocoli-max.png";
import imgEctomax from "@/assets/products/ectomax.png";
import imgMaxiyield from "@/assets/products/maxiyield-dogfood.png";
import imgMaxicocc from "@/assets/products/maxicocc.png";

type Category = "All" | "Livestock" | "Pet" | "Vet Supplies";

interface Product {
  name: string;
  category: "Livestock" | "Pet" | "Vet Supplies";
  desc: string;
  fullDesc: string;
  image: string;
  targetAnimals: string;
  commonProblems: string;
  usage: string;
}

const products: Product[] = [
  {
    name: "Viramax 150ml",
    category: "Livestock",
    desc: "Vitamin K and Iodine supplement for veterinary use.",
    fullDesc: "Viramax contains Vitamin K and Iodine, manufactured by Divine Agvet Limited. For use in cattle, poultry, goats, and other farm animals. NAFDAC: A10-0093. 150ml bottle.",
    image: imgViramax150,
    targetAnimals: "Cattle, Poultry, Goats",
    commonProblems: "Vitamin deficiency, low immunity, poor growth",
    usage: "Oral administration as directed by veterinarian",
  },
  {
    name: "Maxitet Antibiotic",
    category: "Vet Supplies",
    desc: "Oxytetracycline Hydrochloride broad-spectrum antibiotic.",
    fullDesc: "Maxitet is a soluble powder containing Oxytetracycline Hydrochloride BP (Vet). Broad-spectrum antibiotic for veterinary use only. 100g net weight. NAFDAC: A18-0517.",
    image: imgMaxitet,
    targetAnimals: "All livestock & poultry",
    commonProblems: "Bacterial infections, respiratory disease, enteritis",
    usage: "Dissolve in drinking water as per dosage chart",
  },
  {
    name: "Viramax 150ml (Large)",
    category: "Livestock",
    desc: "Larger format Vitamin K and Iodine for herds.",
    fullDesc: "Viramax Vitamin K and Iodine in larger bottle format for managing bigger herds. Manufactured by Divine Agvet Limited. NAFDAC: A10-0093.",
    image: imgViramaxLg,
    targetAnimals: "Cattle, Poultry, Goats",
    commonProblems: "Vitamin deficiency, low immunity in large herds",
    usage: "Oral administration for large-scale operations",
  },
  {
    name: "Maxiceryl",
    category: "Vet Supplies",
    desc: "Antibiotics + Multivitamin combination for animals.",
    fullDesc: "Maxiceryl combines antibiotics with multivitamins for comprehensive veterinary care. 100g net weight. For veterinary use only. Manufactured by Divine Agvet Limited.",
    image: imgMaxiceryl,
    targetAnimals: "Poultry, Cattle, Goats",
    commonProblems: "Recovery support, immune boosting, infection control",
    usage: "Mix with feed or water as directed",
  },
  {
    name: "Maxi Vitaconc",
    category: "Livestock",
    desc: "Concentrated hydrosoluble vitamin and amino acid.",
    fullDesc: "Maxi Vitaconc is a highly concentrated hydrosoluble vitamin and amino acid supplement for veterinary use. 100g net weight. Manufactured by Divine Agvet Limited.",
    image: imgVitaconc,
    targetAnimals: "Poultry, Cattle, Goats & Sheep",
    commonProblems: "Stress recovery, poor egg production, slow growth",
    usage: "Dissolve in drinking water during stress periods",
  },
  {
    name: "Enrocoli-Max",
    category: "Vet Supplies",
    desc: "Enrofloxacin + Colistin broad spectrum antibiotics.",
    fullDesc: "Enrocoli-Max contains Enrofloxacin (100mg/g) and Colistin Sulphate (1.2 million IU/g). Broad spectrum antibiotics for veterinary use. 100g net weight.",
    image: imgEnrocoli,
    targetAnimals: "Poultry, Livestock",
    commonProblems: "CRD, E. coli, Salmonella, respiratory infections",
    usage: "Dissolve in drinking water as per veterinary guidance",
  },
  {
    name: "Ectomax Spray",
    category: "Pet",
    desc: "Tick & lice spray — kills fleas, ticks, and repels mosquitoes.",
    fullDesc: "Ectomax Tick & Lice Spray kills fleas, ticks, flea eggs, flea larvae and repels mosquitoes. Breaks flea life cycle for up to 2 months. NAFDAC Reg. No. A-9672. By Divine Agvet Limited.",
    image: imgEctomax,
    targetAnimals: "Dogs, Cats, Pets",
    commonProblems: "Ticks, fleas, lice, mosquito-borne diseases",
    usage: "Spray directly on pet's coat, avoid eyes and mouth",
  },
  {
    name: "Maxiyield Dog Food",
    category: "Pet",
    desc: "Premium dog food with zinc, selenium, chicken & fish.",
    fullDesc: "Maxiyield Dog Food with Zinc & Selenium, Chicken & Fish flavour with Omega H3. 5kg pack for complete canine nutrition.",
    image: imgMaxiyield,
    targetAnimals: "Dogs",
    commonProblems: "Nutritional deficiency, dull coat, low energy",
    usage: "Serve as main daily meal per weight guidelines",
  },
  {
    name: "Maxicocc",
    category: "Livestock",
    desc: "Anticoccidials + Antibiotics for poultry and livestock.",
    fullDesc: "Maxicocc combines anticoccidials and antibiotics for effective prevention and treatment. 80g net weight. For veterinary use only. Manufactured by Divine Agvet Limited.",
    image: imgMaxicocc,
    targetAnimals: "Poultry (Broilers & Layers)",
    commonProblems: "Coccidiosis, bloody droppings, mortality in chicks",
    usage: "Dissolve in drinking water during outbreak or as preventive",
  },
];

const categories: Category[] = ["All", "Livestock", "Pet", "Vet Supplies"];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Livestock: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Pet: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  "Vet Supplies": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

const ProductsPage = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  const openInquiry = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setInquiryProduct(product);
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />
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
              <ShieldCheck size={12} className="inline mr-1.5 -mt-0.5" /> NAFDAC Approved Products
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
              Veterinary Products{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                & Supplies
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Browse our complete range of locally manufactured, NAFDAC-approved veterinary products — inquire with your details for personalized support
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                filter === c
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-900/30"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              }`}
            >
              <Filter size={14} className={`inline mr-2 -mt-0.5 ${filter === c ? "text-white" : "text-slate-500"}`} />
              {c}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Product Gallery - Masonry Style */}
      <section className="container mx-auto px-6 pb-32 relative">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const colors = categoryColors[p.category];
              return (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-900/80 border border-white/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500"
                  onClick={() => setSelected(p)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center p-8">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-500/20 backdrop-blur-sm">
                        Original
                      </span>
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="flex items-center gap-2 text-white font-bold text-sm">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {p.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">{p.desc}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-500" /> In Stock
                      </span>
                      <button
                        onClick={(e) => openInquiry(p, e)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-emerald-500/20"
                      >
                        <Send size={12} /> Inquire
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelected(null)} />
            <motion.div
              className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="h-64 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-8 border border-white/5">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-contain drop-shadow-2xl" />
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${categoryColors[selected.category].bg} ${categoryColors[selected.category].text} border ${categoryColors[selected.category].border}`}>
                {selected.category}
              </span>

              <h2 className="text-2xl font-bold text-white mb-4">{selected.name}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-emerald-500/30 pl-4">
                {selected.fullDesc}
              </p>

              {/* Product Intelligence Layer */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <span className="text-lg">🎯</span>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Target Animals</span>
                    <span className="text-sm text-slate-300">{selected.targetAnimals}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <span className="text-lg">💊</span>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Common Problems Addressed</span>
                    <span className="text-sm text-slate-300">{selected.commonProblems}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <span className="text-lg">📋</span>
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Usage</span>
                    <span className="text-sm text-slate-300">{selected.usage}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelected(null);
                  setInquiryProduct(selected);
                }}
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/30"
              >
                <MessageCircle size={18} /> Inquire About This Product
              </button>
              <p className="text-center text-slate-500 text-[10px] mt-3">
                We'll collect your details and send a structured inquiry via WhatsApp
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Form Modal */}
      <InquiryFormModal
        isOpen={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        context={productContext(
          inquiryProduct?.name || "",
          inquiryProduct?.category || ""
        )}
      />
    </div>
  );
};

export default ProductsPage;
