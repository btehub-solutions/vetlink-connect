import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  MessageCircle,
  Send,
  User,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  PageContext,
  buildWhatsAppMessage,
  animalTypeOptions,
  consultationTopics,
  businessTypes,
  productInquirySchema,
  serviceInquirySchema,
  consultationSchema,
  partnershipSchema,
  generalContactSchema,
} from "@/lib/inquiry";
import type {
  ProductInquiryData,
  ServiceInquiryData,
  ConsultationData,
  PartnershipData,
  GeneralContactData,
} from "@/lib/inquiry";

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: PageContext;
  /** Custom title override */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
}

// ── Heading config per inquiry type ────────────────────────────────
const headingConfig: Record<
  string,
  { title: string; subtitle: string; gradient: string; icon: string }
> = {
  product_inquiry: {
    title: "Inquire About This Product",
    subtitle: "Fill in your details and we'll respond with pricing & availability.",
    gradient: "from-emerald-600 to-cyan-600",
    icon: "📦",
  },
  service_request: {
    title: "Request Veterinary Support",
    subtitle: "Describe your needs and our team will get back to you promptly.",
    gradient: "from-blue-600 to-emerald-600",
    icon: "🩺",
  },
  consultation: {
    title: "Book a Consultation",
    subtitle: "Get expert veterinary advice directly from our team.",
    gradient: "from-purple-600 to-blue-600",
    icon: "💬",
  },
  partnership: {
    title: "Become a Partner",
    subtitle: "Let's explore distribution and business opportunities together.",
    gradient: "from-amber-600 to-emerald-600",
    icon: "🤝",
  },
  general_contact: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you. Send us a message.",
    gradient: "from-slate-600 to-emerald-600",
    icon: "📩",
  },
  emergency: {
    title: "Emergency Support",
    subtitle: "Fill these details quickly so we can help you faster.",
    gradient: "from-red-600 to-orange-600",
    icon: "🚨",
  },
};

// ── Styled Form Field ──────────────────────────────────────────────
function FormField({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-red-400 text-xs font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm";

const selectClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm appearance-none cursor-pointer";

// ── The Modal Component ────────────────────────────────────────────
export default function InquiryFormModal({
  isOpen,
  onClose,
  context,
  title: titleOverride,
  subtitle: subtitleOverride,
}: InquiryFormModalProps) {
  const [step, setStep] = useState<"form" | "sending" | "success">("form");
  const config = headingConfig[context.inquiryType] || headingConfig.general_contact;

  const displayTitle = titleOverride || config.title;
  const displaySubtitle = subtitleOverride || config.subtitle;

  // Reset on close
  const handleClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Panel */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900/95 border border-white/10 shadow-2xl shadow-black/50"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div
              className={`bg-gradient-to-br ${config.gradient} px-8 pt-8 pb-6 rounded-t-3xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
              <div className="relative z-10">
                <span className="text-3xl mb-2 block">{config.icon}</span>
                <h2 className="text-2xl font-black text-white mb-1">
                  {displayTitle}
                </h2>
                <p className="text-white/70 text-sm">{displaySubtitle}</p>
                {context.productName && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-white text-xs font-bold backdrop-blur-sm border border-white/10">
                    <CheckCircle2 size={12} /> {context.productName}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === "form" && (
                  <FormBody
                    key="form"
                    context={context}
                    onSubmit={() => setStep("sending")}
                    onRedirect={() => setStep("success")}
                  />
                )}
                {step === "sending" && <SendingState key="sending" />}
                {step === "success" && (
                  <SuccessState key="success" onClose={handleClose} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Form Body with dynamic fields ──────────────────────────────────
function FormBody({
  context,
  onSubmit,
  onRedirect,
}: {
  context: PageContext;
  onSubmit: () => void;
  onRedirect: () => void;
}) {
  const getSchema = () => {
    switch (context.inquiryType) {
      case "product_inquiry":
        return productInquirySchema;
      case "service_request":
        return serviceInquirySchema;
      case "consultation":
        return consultationSchema;
      case "partnership":
        return partnershipSchema;
      case "general_contact":
      default:
        return generalContactSchema;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  const handleFormSubmit = (data: Record<string, unknown>) => {
    onSubmit(); // Show sending state briefly

    const whatsappUrl = buildWhatsAppMessage(context, data);

    // Brief delay for UX, then redirect
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      onRedirect();
    }, 1200);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
      {/* ── Common Fields ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Full Name"
          error={errors.fullName?.message as string}
          icon={<User size={10} />}
        >
          <input
            {...register("fullName")}
            className={inputClass}
            placeholder="Your full name"
          />
        </FormField>

        <FormField
          label="Phone Number"
          error={errors.phone?.message as string}
          icon={<Phone size={10} />}
        >
          <input
            {...register("phone")}
            className={inputClass}
            placeholder="e.g. 08012345678"
            type="tel"
          />
        </FormField>
      </div>

      <FormField
        label="Location"
        error={errors.location?.message as string}
        icon={<MapPin size={10} />}
      >
        <input
          {...register("location")}
          className={inputClass}
          placeholder="City / State (e.g. Lagos, Ibadan)"
        />
      </FormField>

      {/* ── Dynamic Fields based on inquiry type ── */}
      {(context.inquiryType === "product_inquiry" ||
        context.inquiryType === "service_request" ||
        context.inquiryType === "consultation") && (
        <FormField
          label="Animal Type"
          error={errors.animalType?.message as string}
        >
          <select {...register("animalType")} className={selectClass}>
            <option value="" className="bg-slate-900">
              Select animal type...
            </option>
            {animalTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
      )}

      {/* Product-specific */}
      {context.inquiryType === "product_inquiry" && (
        <>
          <FormField label="Quantity Needed" error={errors.quantity?.message as string}>
            <input
              {...register("quantity")}
              className={inputClass}
              placeholder="e.g. 10 bottles, 5 sachets (optional)"
            />
          </FormField>
          <FormField
            label="Additional Information"
            error={errors.message?.message as string}
          >
            <textarea
              {...register("message")}
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Any additional details... (optional)"
            />
          </FormField>
        </>
      )}

      {/* Service-specific */}
      {context.inquiryType === "service_request" && (
        <>
          <FormField
            label="Number of Animals"
            error={errors.numberOfAnimals?.message as string}
          >
            <input
              {...register("numberOfAnimals")}
              className={inputClass}
              placeholder="Approximate number (optional)"
            />
          </FormField>
          <FormField
            label="Describe the Issue"
            error={errors.issueDescription?.message as string}
          >
            <textarea
              {...register("issueDescription")}
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Briefly describe the problem or what you need help with..."
            />
          </FormField>
        </>
      )}

      {/* Consultation-specific */}
      {context.inquiryType === "consultation" && (
        <>
          <FormField label="Consultation Topic" error={errors.topic?.message as string}>
            <select {...register("topic")} className={selectClass}>
              <option value="" className="bg-slate-900">
                Select topic...
              </option>
              {consultationTopics.map((t) => (
                <option key={t} value={t} className="bg-slate-900">
                  {t}
                </option>
              ))}
            </select>
          </FormField>
          <FormField
            label="Preferred Time"
            error={errors.preferredTime?.message as string}
          >
            <input
              {...register("preferredTime")}
              className={inputClass}
              placeholder="e.g. Morning, Afternoon (optional)"
            />
          </FormField>
          <FormField
            label="Additional Details"
            error={errors.details?.message as string}
          >
            <textarea
              {...register("details")}
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Anything else we should know... (optional)"
            />
          </FormField>
        </>
      )}

      {/* Partnership-specific */}
      {context.inquiryType === "partnership" && (
        <>
          <FormField
            label="Business Name"
            error={errors.businessName?.message as string}
          >
            <input
              {...register("businessName")}
              className={inputClass}
              placeholder="Your business or farm name"
            />
          </FormField>
          <FormField
            label="Business Type"
            error={errors.businessType?.message as string}
          >
            <select {...register("businessType")} className={selectClass}>
              <option value="" className="bg-slate-900">
                Select business type...
              </option>
              {businessTypes.map((t) => (
                <option key={t} value={t} className="bg-slate-900">
                  {t}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Message" error={errors.message?.message as string}>
            <textarea
              {...register("message")}
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Tell us about your interest... (optional)"
            />
          </FormField>
        </>
      )}

      {/* General contact */}
      {context.inquiryType === "general_contact" && (
        <>
          <FormField label="Subject" error={errors.subject?.message as string}>
            <input
              {...register("subject")}
              className={inputClass}
              placeholder="What is this about?"
            />
          </FormField>
          <FormField label="Message" error={errors.message?.message as string}>
            <textarea
              {...register("message")}
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Your message..."
            />
          </FormField>
        </>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-base hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/30 mt-6 group"
      >
        <MessageCircle size={18} />
        Submit & Continue to WhatsApp
        <ChevronRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </motion.button>

      <p className="text-center text-slate-500 text-[11px] mt-3">
        Your details will be sent as a formatted message on WhatsApp for faster response.
      </p>
    </motion.form>
  );
}

// ── Sending State ──────────────────────────────────────────────────
function SendingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Loader2 size={32} className="text-emerald-400 animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        Preparing Your Message...
      </h3>
      <p className="text-slate-400 text-sm">
        Opening WhatsApp with your inquiry details
      </p>
    </motion.div>
  );
}

// ── Success State ──────────────────────────────────────────────────
function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
      >
        <CheckCircle2 size={40} className="text-emerald-400" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">
        You're All Set! 🎉
      </h3>
      <p className="text-slate-400 text-sm max-w-xs mb-8">
        Your inquiry has been prepared on WhatsApp. Just hit send and our team will
        respond within minutes.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all text-sm"
        >
          Close
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all text-sm flex items-center gap-2"
        >
          <Send size={14} /> Done
        </button>
      </div>
    </motion.div>
  );
}
