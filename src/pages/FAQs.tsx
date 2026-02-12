import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, ArrowRight, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InquiryFormModal from "@/components/InquiryFormModal";
import { generalContactContext } from "@/lib/inquiry";

const faqs = [
  { q: "How do I place an order?", a: "Simply click any \"Order\" or \"Inquire\" button on our website, and you'll be directed to WhatsApp. Send us a message with the product or service you need, and our team will respond promptly with availability and pricing.", icon: "🛒" },
  { q: "Do you offer emergency services?", a: "Yes! We provide 24/7 emergency veterinary support. Click the \"Emergency\" page or contact us immediately via WhatsApp for urgent situations. Our average response time is under 5 minutes.", icon: "🚨" },
  { q: "What areas do you serve?", a: "We operate from our Warehouse in Monatan, Ibadan (Oyo State) and our Factory in Ikoyi-Ile (Osun State). We can arrange product delivery to most locations across Nigeria. Contact us via WhatsApp to confirm delivery to your area.", icon: "📍" },
  { q: "How quickly can I get products?", a: "Delivery times vary by location. For areas close to Ibadan and Osun State, most orders are fulfilled within 24-48 hours. For other areas, please allow 3-5 business days. Emergency supplies are prioritized.", icon: "🚚" },
  { q: "Are your products genuine?", a: "Absolutely. We manufacture our products locally under strict NAFDAC regulations, guaranteeing purity and potency in every bottle. Product authenticity is our top priority.", icon: "✅" },
  { q: "Can I get veterinary advice via WhatsApp?", a: "Yes! Our licensed veterinarians are available for consultations via WhatsApp. Contact us to schedule a consultation or get quick advice for non-emergency situations.", icon: "💬" },
  { q: "Do you work with veterinary clinics and distributors?", a: "Yes, we supply veterinary clinics, practices, and distributors. We offer competitive pricing for bulk orders. Message us on WhatsApp to discuss partnership opportunities.", icon: "🤝" },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, mobile money, and other secure payment methods. Payment details will be shared via WhatsApp after order confirmation.", icon: "💳" },
];

const FAQsPage = () => {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
  <div className="bg-slate-950 min-h-screen">
    {/* Hero */}
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
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
            <HelpCircle size={12} className="inline mr-1.5 -mt-0.5" /> FAQ
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05]">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Questions
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our products and services
          </p>
        </motion.div>
      </div>
    </section>

    {/* FAQ Content */}
    <section className="container mx-auto px-6 pb-32 -mt-8 relative z-20">
      <motion.div
        className="max-w-3xl mx-auto bg-slate-900/80 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-900/10 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-white/5 rounded-2xl px-6 overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors data-[state=open]:border-emerald-500/20 data-[state=open]:bg-emerald-500/5"
                >
                  <AccordionTrigger className="text-left font-bold text-base text-slate-200 hover:text-emerald-400 hover:no-underline py-5 transition-colors">
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{faq.icon}</span>
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 leading-relaxed pb-5 pl-9">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.div>

      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-8 bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-emerald-100/70">
              Reach out on WhatsApp — our team is available 24/7 to help you.
            </p>
          </div>
          <button
            onClick={() => setShowInquiry(true)}
            className="flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg hover:scale-105 whitespace-nowrap"
          >
            <Send size={18} /> Ask Us <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </section>

    {/* Inquiry Form Modal */}
    <InquiryFormModal
      isOpen={showInquiry}
      onClose={() => setShowInquiry(false)}
      context={generalContactContext()}
      title="Ask Us Anything"
      subtitle="Have a question? Fill in your details and we'll respond via WhatsApp."
    />
  </div>
  );
};

export default FAQsPage;
