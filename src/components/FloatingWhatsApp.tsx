import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348136972328?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20your%20veterinary%20services.";

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
    style={{ boxShadow: "0 4px 24px hsl(142 70% 45% / 0.4)" }}
  >
    <MessageCircle size={28} fill="currentColor" />
  </a>
);

export default FloatingWhatsApp;
