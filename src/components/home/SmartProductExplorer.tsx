import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Sparkles, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

interface Product {
  name: string;
  category: string;
  img: string;
  price: string;
}

interface SmartProductExplorerProps {
  products: Product[];
  onInquiry: (product: Product) => void;
  onEmergency?: () => void;
}

const EMERGENCY_KEYWORDS = ["sick", "died", "dead", "blood", "emergency", "help", "dying", "urgent"];

export const SmartProductExplorer = ({ products, onInquiry, onEmergency }: SmartProductExplorerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Level 3: Persistence - Load from localStorage if available
  const [activeCategory, setActiveCategory] = useState(() => {
    return localStorage.getItem("failed_vet_pref_category") || "All";
  });

  // Level 3: Persistence - Save to localStorage
  useMemo(() => {
    localStorage.setItem("failed_vet_pref_category", activeCategory);
  }, [activeCategory]);
  
  // Level 4: Predictive - Detect Emergency Intent
  useMemo(() => {
    if (!onEmergency || !searchQuery) return;
    
    // Check if query contains any emergency keywords
    const isEmergency = EMERGENCY_KEYWORDS.some(keyword => 
      searchQuery.toLowerCase().includes(keyword)
    );

    if (isEmergency) {
      onEmergency();
      setSearchQuery(""); // Clear it so it doesn't loop
    }
  }, [searchQuery, onEmergency]);

  // Derive categories
  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], [products]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  // "Smart" Related Suggestions Logic
  const suggestion = useMemo(() => {
    if (activeCategory === "Poultry") {
      return {
        text: "Poultry farmers often add a Multivitamin to aid recovery after treatment.",
        relatedCategory: "Nutrition"
      };
    }
    if (activeCategory === "Livestock") {
      return {
        text: "For optimal livestock health, consider regular deworming alongside nutrition.",
        relatedCategory: "Vet Supplies"
      };
    }
    if (activeCategory === "Pet Care") {
        return {
          text: "Ensure your pets are protected from ticks and fleas year-round.",
          relatedCategory: "Vet Supplies"
        };
      }
    return null;
  }, [activeCategory]);

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200" id="product-explorer">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
           <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">
             Smart Catalogue
           </span>
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
             Find What You Need
           </h2>
           <p className="text-slate-600">
             Search by name, filter by category, or explore our range.
           </p>
        </div>

        {/* Controls */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 sticky top-20 z-30">
           
           {/* Search */}
           <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
           </div>

           {/* Categories */}
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar snap-x">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all snap-center ${
                    activeCategory === cat 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Smart Suggestion Banner */}
        <AnimatePresence mode="wait">
          {suggestion && (
            <motion.div
               key={activeCategory}
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: "auto" }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-8"
            >
              <div onClick={() => setActiveCategory(suggestion.relatedCategory)} className="cursor-pointer bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                 <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Sparkles size={18} />
                 </div>
                 <div>
                    <h4 className="font-bold text-amber-900 text-sm mb-1">Pro Tip</h4>
                    <p className="text-amber-800 text-sm">
                      {suggestion.text} <span className="underline font-bold">View {suggestion.relatedCategory}</span>
                    </p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
                {filteredProducts.map((p) => (
                    <motion.div 
                        layout
                        key={p.name} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="group bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                        onClick={() => onInquiry(p)}
                    >
                        <div className="aspect-square bg-slate-50 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-6">
                            <img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-white/90 backdrop-blur text-emerald-600 p-1.5 rounded-full shadow-sm flex">
                                    <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-auto">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 block bg-emerald-50 w-fit px-2 py-0.5 rounded">
                                {p.category}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{p.name}</h3>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-3">
                                <span className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-emerald-500" /> In Stock
                                </span>
                                <span className="text-emerald-600 text-xs font-bold group-hover:underline">
                                    Inquire
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            </motion.div>
        ) : (
            <div className="text-center py-20 text-slate-400">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p>No products found matching "{searchQuery}".</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="mt-4 text-emerald-600 font-bold hover:underline"
                >
                    Clear Filter
                </button>
            </div>
        )}

      </div>
    </section>
  );
};
