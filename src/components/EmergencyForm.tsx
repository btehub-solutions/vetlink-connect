import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  MessageCircle,
  Phone,
  MapPin,
  User,
  Loader2,
  CheckCircle2,
  Send,
  Zap,
} from "lucide-react";
import {
  emergencySchema,
  emergencyContext,
  buildWhatsAppMessage,
  animalTypeOptions,
} from "@/lib/inquiry";
import type { EmergencyData } from "@/lib/inquiry";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-red-500/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition-all text-sm";

const selectClass =
  "w-full px-4 py-3 bg-white/5 border border-red-500/20 rounded-xl text-white focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition-all text-sm appearance-none cursor-pointer";

export default function EmergencyForm() {
  const [step, setStep] = useState<"form" | "sending" | "done">("form");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmergencyData>({
    resolver: zodResolver(emergencySchema),
  });

  const onSubmit = (data: EmergencyData) => {
    setStep("sending");
    const url = buildWhatsAppMessage(emergencyContext(), data as Record<string, unknown>);
    setTimeout(() => {
      window.open(url, "_blank");
      setStep("done");
    }, 800);
  };

  if (step === "sending") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <Loader2 size={28} className="text-red-400 animate-spin" />
          </div>
        </div>
        <p className="text-white font-bold">Opening WhatsApp...</p>
        <p className="text-slate-400 text-sm">Sending your emergency details</p>
      </motion.div>
    );
  }

  if (step === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 size={28} className="text-emerald-400" />
        </div>
        <p className="text-white font-bold mb-1">Emergency Report Sent!</p>
        <p className="text-slate-400 text-sm mb-6">
          Our team will respond within minutes. Stay by your phone.
        </p>
        <button
          onClick={() => setStep("form")}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-all text-sm flex items-center gap-2"
        >
          <Send size={14} /> Send Another Report
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto mt-8"
    >
      {/* Form Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Zap size={12} /> Quick Emergency Report
        </div>
        <p className="text-slate-400 text-sm">
          Fill these details so our vets can prepare to help you
        </p>
      </div>

      <div className="space-y-3 bg-white/[0.03] border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
              <User size={8} className="inline mr-1" />
              Your Name
            </label>
            <input
              {...register("fullName")}
              className={inputClass}
              placeholder="Full name"
            />
            {errors.fullName && (
              <p className="text-red-400 text-[10px] mt-0.5">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
              <Phone size={8} className="inline mr-1" />
              Phone
            </label>
            <input
              {...register("phone")}
              className={inputClass}
              placeholder="08012345678"
              type="tel"
            />
            {errors.phone && (
              <p className="text-red-400 text-[10px] mt-0.5">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Location & Animal */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
              <MapPin size={8} className="inline mr-1" />
              Location
            </label>
            <input
              {...register("location")}
              className={inputClass}
              placeholder="City / Area"
            />
            {errors.location && (
              <p className="text-red-400 text-[10px] mt-0.5">{errors.location.message}</p>
            )}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
              Animal Type
            </label>
            <select {...register("animalType")} className={selectClass}>
              <option value="" className="bg-slate-900">Select...</option>
              {animalTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.label} className="bg-slate-900">
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.animalType && (
              <p className="text-red-400 text-[10px] mt-0.5">{errors.animalType.message}</p>
            )}
          </div>
        </div>

        {/* Number affected */}
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
            How many animals affected? (optional)
          </label>
          <input
            {...register("numberOfAffected")}
            className={inputClass}
            placeholder="e.g. 5 birds, 2 goats"
          />
        </div>

        {/* Symptoms */}
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">
            <AlertTriangle size={8} className="inline mr-1 text-red-400" />
            Describe Symptoms
          </label>
          <textarea
            {...register("symptoms")}
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="What's happening? (e.g. sudden death, not eating, swelling...)"
          />
          {errors.symptoms && (
            <p className="text-red-400 text-[10px] mt-0.5">{errors.symptoms.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl font-bold text-base hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-900/30 mt-2"
        >
          <MessageCircle size={20} fill="currentColor" />
          Send Emergency Report via WhatsApp
        </motion.button>
      </div>

      <p className="text-center text-slate-500 text-[10px] mt-4">
        Your details will be formatted and sent via WhatsApp for immediate response.
      </p>
    </motion.form>
  );
}
