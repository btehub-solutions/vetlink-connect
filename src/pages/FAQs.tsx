import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I place an order?", a: "Simply click any \"Order\" or \"Inquire\" button on our website, and you'll be directed to WhatsApp. Send us a message with the product or service you need, and our team will respond promptly with availability and pricing." },
  { q: "Do you offer emergency services?", a: "Yes! We provide 24/7 emergency veterinary support. Click the \"Emergency\" page or contact us immediately via WhatsApp for urgent situations. Our average response time is under 5 minutes." },
  { q: "What areas do you serve?", a: "We currently operate in Lagos and Abuja, with plans to expand. However, we can arrange product delivery to most locations across Nigeria. Contact us via WhatsApp to confirm delivery to your area." },
  { q: "How quickly can I get products?", a: "Delivery times vary by location. For Lagos and Abuja, most orders are fulfilled within 24-48 hours. For other areas, please allow 3-5 business days. Emergency supplies are prioritized." },
  { q: "Are your products genuine?", a: "Absolutely. We source all veterinary products from certified manufacturers and licensed distributors. Product authenticity is our top priority." },
  { q: "Can I get veterinary advice via WhatsApp?", a: "Yes! Our licensed veterinarians are available for consultations via WhatsApp. Contact us to schedule a consultation or get quick advice for non-emergency situations." },
  { q: "Do you work with veterinary clinics and distributors?", a: "Yes, we supply veterinary clinics, practices, and distributors. We offer competitive pricing for bulk orders. Message us on WhatsApp to discuss partnership opportunities." },
  { q: "What payment methods do you accept?", a: "We accept bank transfers, mobile money, and other secure payment methods. Payment details will be shared via WhatsApp after order confirmation." },
];

const FAQsPage = () => (
  <div className="container mx-auto px-4 py-12">
    <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl md:text-5xl font-bold mb-3">Frequently Asked Questions</h1>
      <p className="text-muted-foreground text-lg">Everything you need to know about our services</p>
    </motion.div>

    <motion.div
      className="max-w-3xl mx-auto glass rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/50">
            <AccordionTrigger className="text-left font-semibold text-base hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  </div>
);

export default FAQsPage;
