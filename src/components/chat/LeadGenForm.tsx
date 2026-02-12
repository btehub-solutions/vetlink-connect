import React, { useState } from 'react';
import { LeadGenFormData } from '../../lib/chatLogic';
import { Send, User, MapPin, Briefcase } from 'lucide-react';

interface LeadGenFormProps {
  data: LeadGenFormData;
  onSubmit?: () => void;
}

export const LeadGenForm: React.FC<LeadGenFormProps> = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct WhatsApp Message
    const text = `*New Quote Request from Website*\n\n` +
                 `*Context:* ${data.context}\n` +
                 `------------------\n` +
                 Object.entries(formData).map(([key, value]) => `*${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value}`).join('\n');

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/2348136972328?text=${encodedText}`;

    // Simulate small delay for UX
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSubmitting(false);
        setIsSubmitted(true);
        if (onSubmit) onSubmit();
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="mt-3 p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center animate-in fade-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-3">
            <Send className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-emerald-400">Request Sent!</h3>
        <p className="text-sm opacity-80 mt-1">Our team will reply to you on WhatsApp shortly.</p>
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="font-bold text-base mb-1 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        {data.title}
      </h3>
      <p className="text-xs opacity-60 mb-4">Fill this form to connect directly with our sales team.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {data.fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-xs uppercase tracking-wider opacity-70 ml-1">{field.label}</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none opacity-50 group-focus-within:opacity-100 group-focus-within:text-emerald-400 transition-colors">
                {field.name.includes('name') && <User className="w-4 h-4" />}
                {field.name.includes('location') && <MapPin className="w-4 h-4" />}
                {field.name.includes('animal') && <Briefcase className="w-4 h-4" />}
              </div>
              
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  required
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer hover:bg-black/60"
                >
                    <option value="" disabled selected>Select an option...</option>
                    {field.options?.map(opt => (
                        <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
                    ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required
                  onChange={handleChange}
                  placeholder={`Enter your ${field.name}...`}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20 hover:bg-black/60"
                />
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
            </span>
          ) : (
            <>
              {data.submitLabel}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
