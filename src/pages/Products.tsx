import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

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
}

const products: Product[] = [
  { name: "Viramax 150ml", category: "Livestock", desc: "Vitamin K and Iodine supplement for veterinary use.", fullDesc: "Viramax contains Vitamin K and Iodine, manufactured by Divine Agvet Limited. For use in cattle, poultry, goats, and other farm animals. NAFDAC: A10-0093. 150ml bottle.", image: imgViramax150 },
  { name: "Maxitet Antibiotic", category: "Vet Supplies", desc: "Oxytetracycline Hydrochloride broad-spectrum antibiotic.", fullDesc: "Maxitet is a soluble powder containing Oxytetracycline Hydrochloride BP (Vet). Broad-spectrum antibiotic for veterinary use only. 100g net weight. NAFDAC: A18-0517.", image: imgMaxitet },
  { name: "Viramax 150ml (Large)", category: "Livestock", desc: "Larger format Vitamin K and Iodine for herds.", fullDesc: "Viramax Vitamin K and Iodine in larger bottle format for managing bigger herds. Manufactured by Divine Agvet Limited. NAFDAC: A10-0093.", image: imgViramaxLg },
  { name: "Maxiceryl", category: "Vet Supplies", desc: "Antibiotics + Multivitamin combination for animals.", fullDesc: "Maxiceryl combines antibiotics with multivitamins for comprehensive veterinary care. 100g net weight. For veterinary use only. Manufactured by Divine Agvet Limited.", image: imgMaxiceryl },
  { name: "Maxi Vitaconc", category: "Livestock", desc: "Concentrated hydrosoluble vitamin and amino acid.", fullDesc: "Maxi Vitaconc is a highly concentrated hydrosoluble vitamin and amino acid supplement for veterinary use. 100g net weight. Manufactured by Divine Agvet Limited.", image: imgVitaconc },
  { name: "Enrocoli-Max", category: "Vet Supplies", desc: "Enrofloxacin + Colistin broad spectrum antibiotics.", fullDesc: "Enrocoli-Max contains Enrofloxacin (100mg/g) and Colistin Sulphate (1.2 million IU/g). Broad spectrum antibiotics for veterinary use. 100g net weight.", image: imgEnrocoli },
  { name: "Ectomax Spray", category: "Pet", desc: "Tick & lice spray — kills fleas, ticks, and repels mosquitoes.", fullDesc: "Ectomax Tick & Lice Spray kills fleas, ticks, flea eggs, flea larvae and repels mosquitoes. Breaks flea life cycle for up to 2 months. NAFDAC Reg. No. A-9672. By Divine Agvet Limited.", image: imgEctomax },
  { name: "Maxiyield Dog Food", category: "Pet", desc: "Premium dog food with zinc, selenium, chicken & fish.", fullDesc: "Maxiyield Dog Food with Zinc & Selenium, Chicken & Fish flavour with Omega H3. 5kg pack for complete canine nutrition.", image: imgMaxiyield },
  { name: "Maxicocc", category: "Livestock", desc: "Anticoccidials + Antibiotics for poultry and livestock.", fullDesc: "Maxicocc combines anticoccidials and antibiotics for effective prevention and treatment. 80g net weight. For veterinary use only. Manufactured by Divine Agvet Limited.", image: imgMaxicocc },
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
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Veterinary Products & Supplies</h1>
        <p className="text-muted-foreground text-lg">Browse our range — order via WhatsApp</p>
      </motion.div>

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
            <div className="h-48 bg-muted rounded-xl mb-4 overflow-hidden flex items-center justify-center">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" loading="lazy" />
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
              <div className="h-56 bg-muted rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-contain p-4" />
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
