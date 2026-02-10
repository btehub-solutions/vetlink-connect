const PHONE = "2348136972328";

export const whatsappLink = (message: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
