import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

type Category = "All" | "Livestock" | "Pet" | "Vet Supplies";

interface Product {
  name: string;
  category: "Livestock" | "Pet" | "Vet Supplies";
  desc: string;
  fullDesc: string;
}

const products: Product[] = [
  { name: "Livestock Vaccines", category: "Livestock", desc: "High-quality vaccines for cattle, poultry, and farm animals.", fullDesc: "Comprehensive range of livestock vaccines including those for foot-and-mouth disease, brucellosis, and Newcastle disease. Properly stored and handled for maximum efficacy." },
  { name: "Pet Supplements", category: "Pet", desc: "Nutritional supplements for optimal pet health.", fullDesc: "Premium vitamins, minerals, and nutritional supplements formulated for dogs, cats, and other companion animals. Supports immune health, joint care, and coat quality." },
  { name: "Surgical Instruments", category: "Vet Supplies", desc: "Professional-grade surgical tools for veterinarians.", fullDesc: "Stainless steel surgical instruments including scalpels, forceps, hemostats, and suture kits. Designed for durability and precision in veterinary procedures." },
  { name: "Animal Feed Additives", category: "Livestock", desc: "Boost nutrition and growth in livestock.", fullDesc: "Scientifically formulated feed additives that enhance nutrient absorption, promote growth, and improve overall animal health and productivity." },
  { name: "Diagnostic Equipment", category: "Vet Supplies", desc: "Modern diagnostic tools for accurate results.", fullDesc: "State-of-the-art diagnostic equipment including rapid test kits, thermometers, stethoscopes, and portable ultrasound devices for field and clinic use." },
  { name: "Pet Grooming Supplies", category: "Pet", desc: "Everything needed for professional pet grooming.", fullDesc: "Complete grooming toolkit including shampoos, conditioners, brushes, nail clippers, and ear cleaning solutions. Suitable for all breeds and coat types." },
  { name: "Livestock Dewormers", category: "Livestock", desc: "Effective deworming solutions for all farm animals.", fullDesc: "Broad-spectrum and targeted deworming medications for cattle, sheep, goats, and poultry. Available in oral, injectable, and pour-on formulations." },
  { name: "Veterinary Syringes", category: "Vet Supplies", desc: "Sterile, reliable syringes for all applications.", fullDesc: "Disposable and reusable syringes in various sizes (1ml to 60ml). Includes automatic syringes for mass vaccination programs and precision dosing." },
  { name: "Animal Antibiotics", category: "Pet", desc: "Trusted antibiotics for treating infections.", fullDesc: "Prescription-grade antibiotics for bacterial infections in companion and farm animals. Includes both broad-spectrum and targeted formulations." },
];

const categories: Category[] = ["All", "Livestock", "Pet", "Vet Supplies"];

const categoryClass: Record<string, string> = {
  Livestock: "category-livestock",
  Pet: "category-pet",
  "Vet Supplies": "category-supplies",
};

const ProductsPage = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Veterinary Products & Supplies</h1>
        <p className="text-muted-foreground text-lg">Browse our range — order via WhatsApp</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === c ? "bg-primary text-primary-foreground" : "glass hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p.name}
            className="glass-card cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(p)}
          >
            <div className="h-40 bg-muted rounded-xl mb-4 flex items-center justify-center text-muted-foreground/40 text-5xl">
              🏥
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryClass[p.category]}`}>
              {p.category}
            </span>
            <h3 className="text-lg font-bold mb-2">{p.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{p.desc}</p>
            <a
              href={whatsappLink(`Hello, I'm interested in the product: ${p.name}. Please share availability and pricing.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-whatsapp text-sm w-full justify-center"
            >
              <MessageCircle size={16} /> Inquire on WhatsApp
            </a>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              className="relative glass rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="h-48 bg-muted rounded-xl mb-6 flex items-center justify-center text-6xl text-muted-foreground/40">
                🏥
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryClass[selected.category]}`}>
                {selected.category}
              </span>
              <h2 className="text-2xl font-bold mb-3">{selected.name}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{selected.fullDesc}</p>
              <a
                href={whatsappLink(`Hello, I'm interested in the product: ${selected.name}. Please share availability and pricing.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base w-full justify-center"
              >
                <MessageCircle size={18} /> Order via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
