
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Stethoscope, Thermometer, Activity, Syringe, Phone } from "lucide-react";

// Triage Data Structure
interface TriageOption {
  id: string;
  label: string;
  next?: string;
  outcome?: TriageOutcome;
}

interface TriageOutcome {
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  action: "consult" | "emergency" | "product";
  recommendedProduct?: string;
}

const TRIAGE_FLOW: Record<string, { question: string; options: TriageOption[] }> = {
  // Level 1: Species
  start: {
    question: "Which animal is affected?",
    options: [
      { id: "poultry", label: "Poultry (Chickens/Turkeys)", next: "poultry_symptoms" },
      { id: "livestock", label: "Livestock (Cattle/Goats)", next: "livestock_symptoms" },
      { id: "pets", label: "Pets (Dogs/Cats)", next: "pet_symptoms" },
    ],
  },

  // Level 2: Poultry Symptoms
  poultry_symptoms: {
    question: "What is the primary symptom?",
    options: [
      { id: "mortality", label: "Sudden High Mortality", next: "mortality_check" },
      { id: "respiratory", label: "Coughing / Sneezing / Gasping", outcome: { severity: "medium", title: "Respiratory Infection", description: "Likely CRD or Infectious Bronchitis.", action: "product", recommendedProduct: "Maxitet Antibiotic" } },
      { id: "droppings", label: "Bloody or Wet Droppings", outcome: { severity: "high", title: "Coccidiosis Risk", description: "Bloody droppings often indicate Coccidiosis, which spreads fast.", action: "product", recommendedProduct: "Maxicocc" } },
      { id: "growth", label: "Poor Growth / Weight Loss", outcome: { severity: "low", title: "Nutritional Deficiency", description: "Consider deworming and multivitamins.", action: "product", recommendedProduct: "Maxiyield Premium" } },
    ],
  },
  
  // Level 2: Livestock Symptoms
  livestock_symptoms: {
    question: "What is the primary symptom?",
    options: [
      { id: "skin", label: "Skin Lesions / Ticks", outcome: { severity: "low", title: "Parasitic Infestation", description: "Ticks can cause tick-borne fever.", action: "product", recommendedProduct: "Ectomax Spray" } },
      { id: "activity", label: "Lethargy / Not Eating", next: "livestock_temp" },
      { id: "mouth", label: "Drooling / Mouth Sores", outcome: { severity: "critical", title: "FMD Risk", description: "Mouth sores could indicate Foot & Mouth Disease. Isolate immediately.", action: "emergency" } },
    ],
  },

  // Level 3: Drill Downs
  mortality_check: {
    question: "How many have died in the last 24h?",
    options: [
      { id: "few", label: "Less than 1%", outcome: { severity: "medium", title: "Monitor Closely", description: "Isolate sick birds. Start generic antibiotic.", action: "consult" } },
      { id: "many", label: "More than 5%", outcome: { severity: "critical", title: "Outbreak Alert", description: "High mortality suggests a viral outbreak (Newcastle/Gumboro).", action: "emergency" } },
    ],
  },
  
  livestock_temp: {
    question: "Does the animal have a fever?",
    options: [
      { id: "yes", label: "Yes (Hot ears/nose)", outcome: { severity: "high", title: "General Infection", description: "Fever indicates active infection.", action: "product", recommendedProduct: "Viramax" } },
      { id: "no", label: "No / Unsure", outcome: { severity: "medium", title: "Digestive Issue", description: "Could be bloat or ingestion of toxins.", action: "consult" } },
    ],
  },

  // Placeholder for Pets for now
  pet_symptoms: {
    question: "What's wrong with your pet?",
    options: [
      { id: "vomit", label: "Vomiting / Diarrhea", outcome: { severity: "high", title: "Parvo/Gastro Risk", description: "Dehydration kills quickly in pets.", action: "emergency" } },
      { id: "skin", label: "Itching / Hair Loss", outcome: { severity: "low", title: "Skin Allergies/Mange", description: "Likely specialized mange or allergy.", action: "consult" } },
    ],
  },
};

export const SymptomTriage = ({ onEmergency, onComplete }: { onEmergency?: () => void; onComplete?: (outcome: any) => void }) => {
  const [history, setHistory] = useState<string[]>(["start"]);
  const [outcome, setOutcome] = useState<TriageOutcome | null>(null);

  const currentStepId = history[history.length - 1];
  const currentStep = TRIAGE_FLOW[currentStepId];

  const handleSelect = (option: TriageOption) => {
    if (option.outcome) {
      setOutcome(option.outcome);
      if (onComplete) onComplete(option.outcome);
      if (option.outcome.action === "emergency" && onEmergency) {
          // Optional: auto-trigger emergency actions
      }
    } else if (option.next) {
      setHistory([...history, option.next]);
    }
  };

  const reset = () => {
    setHistory(["start"]);
    setOutcome(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="bg-slate-800/50 p-6 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Activity className="text-emerald-400" size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Symptom Check</h3>
            <p className="text-slate-400 text-xs">Digital Triage Assistant</p>
          </div>
        </div>
        {history.length > 1 && !outcome && (
          <button onClick={() => setHistory(history.slice(0, -1))} className="text-slate-400 hover:text-white text-sm">
            Back
          </button>
        )}
        {outcome && (
            <button onClick={reset} className="text-slate-400 hover:text-white text-sm">
            Start Over
          </button>
        )}
      </div>

      <div className="p-6 md:p-8 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!outcome ? (
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white leading-tight">
                {currentStep.question}
              </h2>

              <div className="grid gap-4">
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className="group flex items-center justify-between p-5 rounded-xl bg-slate-800 hover:bg-emerald-600/20 hover:border-emerald-500/50 border border-slate-700 transition-all text-left"
                  >
                    <span className="text-lg font-medium text-slate-200 group-hover:text-emerald-400">{option.label}</span>
                    <ChevronRight className="text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                outcome.severity === 'critical' ? 'bg-red-500/20 text-red-500' : 
                outcome.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                'bg-emerald-500/20 text-emerald-500'
              }`}>
                {outcome.severity === 'critical' ? <AlertCircle size={40} /> : <Stethoscope size={40} />}
              </div>

              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
                 outcome.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {outcome.severity} Severity
              </span>

              <h2 className="text-3xl font-bold text-white mb-4">{outcome.title}</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                {outcome.description}
              </p>

              {outcome.action === 'emergency' && (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mb-8 animate-pulse">
                    <p className="text-red-400 font-bold mb-2">Immediate Action Required</p>
                    <button onClick={onEmergency} className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                        <Phone size={20} /> Contact Emergency Vet
                    </button>
                </div>
              )}

              {outcome.action === 'product' && outcome.recommendedProduct && (
                <div className="bg-slate-800 p-6 rounded-2xl mb-8 border border-white/5">
                    <p className="text-slate-400 text-sm mb-3">Recommended Treatment</p>
                    <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <Syringe className="text-emerald-400" size={20} />
                            </div>
                            <span className="text-white font-bold">{outcome.recommendedProduct}</span>
                        </div>
                        <CheckCircle2 className="text-emerald-500" />
                    </div>
                </div>
              )}
                
               {outcome.action === 'consult' && (
                   <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                       <Stethoscope size={20} /> Book Consultation
                   </button>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
