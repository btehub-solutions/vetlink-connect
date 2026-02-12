
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronDown, Droplets, Scale, X } from "lucide-react";

const ANIMAL_TYPES = [
  { id: "poultry", label: "Poultry (Broilers/Layers)", icon: "🐔" },
  { id: "cattle", label: "Cattle", icon: "bm" },
  { id: "sheep_goat", label: "Sheep & Goats", icon: "" },
  { id: "pets", label: "Dogs & Cats", icon: "🐕" },
];

const MEDICATIONS = [
  {
    id: "viramax",
    name: "Viramax",
    concentration: "10%",
    dosage: {
      poultry: { amount: 1, per: 2, unit: "liters of water" }, // 1ml per 2 liters
      cattle: { amount: 5, per: 100, unit: "kg body weight" }, // 5ml per 100kg
      sheep_goat: { amount: 3, per: 50, unit: "kg body weight" },
      pets: { amount: 1, per: 10, unit: "kg body weight" },
    },
    unit: "ml",
    description: "Broad spectrum antiviral and immune booster.",
  },
  {
    id: "maxitet",
    name: "Maxitet Antibiotic",
    concentration: "20%",
    dosage: {
      poultry: { amount: 1, per: 4, unit: "liters of water" },
      cattle: { amount: 10, per: 100, unit: "kg body weight" },
      sheep_goat: { amount: 5, per: 50, unit: "kg body weight" },
      pets: { amount: 0.5, per: 10, unit: "kg body weight" },
    },
    unit: "ml",
    description: "Fast-acting antibiotic for bacterial infections.",
  },
  {
    id: "ectomax",
    name: "Ectomax Spray",
    concentration: "5%",
    dosage: {
      poultry: { amount: 2, per: 1, unit: "liter of water (Spray)" },
      cattle: { amount: 2, per: 1, unit: "liter of water (Spray)" },
      sheep_goat: { amount: 2, per: 1, unit: "liter of water (Spray)" },
      pets: { amount: 2, per: 1, unit: "liter of water (Spray)" },
    },
    unit: "ml",
    description: "External parasite control.",
  },
];

export const DosageCalculator = () => {
  const [animalType, setAnimalType] = useState(ANIMAL_TYPES[0].id);
  const [medication, setMedication] = useState(MEDICATIONS[0].id);
  const [inputValue, setInputValue] = useState(""); // Can be weight or water volume or number of animals depending on simplicity
  const [weight, setWeight] = useState("");
  const [waterVolume, setWaterVolume] = useState("");
  
  // Helper to determine input mode
  const currentMed = MEDICATIONS.find(m => m.id === medication);
  const currentDosage = currentMed?.dosage[animalType as keyof typeof currentMed.dosage];
  
  const calculateDosage = () => {
    if (!currentDosage || (!weight && !waterVolume)) return null;
    
    // Poultry usually calculated by water volume needed for the flock
    // Livestock usually by body weight
    
    let result = 0;
    
    if (animalType === "poultry") {
       // Input is water volume in liters
       // Dosage: amount (ml) per 'per' (liters)
       const liters = parseFloat(waterVolume);
       if(isNaN(liters)) return null;
       result = (liters / currentDosage.per) * currentDosage.amount;
    } else {
       // Input is body weight
       const kg = parseFloat(weight);
       if(isNaN(kg)) return null;
       result = (kg / currentDosage.per) * currentDosage.amount;
    }
    
    return result.toFixed(1);
  };

  const result = calculateDosage();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Calculator size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Smart Dosage Calculator</h2>
          <p className="text-slate-500 text-sm">Precision medicine for your farm.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-6">
          {/* 1. Select Animal */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">1. Select Animal</label>
            <div className="grid grid-cols-2 gap-3">
              {ANIMAL_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setAnimalType(type.id); setWeight(""); setWaterVolume(""); }}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    animalType === type.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-100 hover:border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-sm font-bold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Select Medication */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">2. Select Medication</label>
            <div className="relative">
              <select
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500/20 outline-none appearance-none"
              >
                {MEDICATIONS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.concentration})</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
            <p className="mt-2 text-xs text-slate-500 italic">
               {currentMed?.description}
            </p>
          </div>

          {/* 3. Input Parameters */}
          <div>
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
               3. Enter Details {animalType === 'poultry' ? '(Water)' : '(Weight)'}
             </label>
             
             {animalType === 'poultry' ? (
               <div className="relative">
                 <input
                   type="number"
                   value={waterVolume}
                   onChange={(e) => setWaterVolume(e.target.value)}
                   placeholder="Estimated daily water consumption (Liters)"
                   className="w-full p-4 pl-12 rounded-xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-lg"
                 />
                 <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={24} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Liters</span>
               </div>
             ) : (
                <div className="relative">
                 <input
                   type="number"
                   value={weight}
                   onChange={(e) => setWeight(e.target.value)}
                   placeholder="Total Body Weight (kg)"
                   className="w-full p-4 pl-12 rounded-xl bg-white border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-lg"
                 />
                 <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={24} />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">KG</span>
               </div>
             )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative flex flex-col justify-center overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10">
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 block">
                Recommended Dosage
              </span>
              
              {result ? (
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tight">{result}</span>
                    <span className="text-2xl font-medium text-slate-400">ml</span>
                  </div>
                  <p className="text-slate-400 mt-2 text-lg">
                    of {currentMed?.name} per day
                  </p>
                </div>
              ) : (
                <div className="mb-6 h-32 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-xl">
                   <span className="text-slate-500">Enter details to calculate</span>
                </div>
              )}

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                 <div className="flex items-start gap-3">
                    <AlertTriangleIcon className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">Vet Warning</p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        This is a guide only. Always read the label. For severe cases, consult a vet immediately.
                      </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon component for internal use
const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className}`}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
