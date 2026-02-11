import { z } from "zod";

const PHONE = "2348136972328";

// ── Page Context Types ─────────────────────────────────────────────
export type InquiryType =
  | "product_inquiry"
  | "service_request"
  | "emergency"
  | "consultation"
  | "partnership"
  | "general_contact";

export type AnimalType =
  | "poultry"
  | "cattle"
  | "goats_sheep"
  | "dogs_cats"
  | "fish"
  | "other";

export interface PageContext {
  page: string;
  section?: string;
  inquiryType: InquiryType;
  productName?: string;
  productCategory?: string;
  serviceName?: string;
  urgency?: "normal" | "high" | "emergency";
}

// ── Zod Schemas for form validation ────────────────────────────────
export const baseInquirySchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Please enter your location (e.g. Lagos, Ibadan)"),
});

export const productInquirySchema = baseInquirySchema.extend({
  animalType: z.string().min(1, "Please select an animal type"),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

export const serviceInquirySchema = baseInquirySchema.extend({
  animalType: z.string().min(1, "Please select an animal type"),
  numberOfAnimals: z.string().optional(),
  issueDescription: z.string().min(10, "Please describe the issue briefly"),
});

export const emergencySchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Where are you located?"),
  animalType: z.string().min(1, "What type of animal?"),
  symptoms: z.string().min(5, "Briefly describe what's happening"),
  numberOfAffected: z.string().optional(),
});

export const consultationSchema = baseInquirySchema.extend({
  animalType: z.string().min(1, "Please select an animal type"),
  topic: z.string().min(1, "What do you need help with?"),
  preferredTime: z.string().optional(),
  details: z.string().optional(),
});

export const partnershipSchema = baseInquirySchema.extend({
  businessName: z.string().min(2, "Please enter your business name"),
  businessType: z.string().min(1, "Please select your business type"),
  message: z.string().optional(),
});

export const generalContactSchema = baseInquirySchema.extend({
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Please describe your inquiry"),
});

// ── Schema type exports ────────────────────────────────────────────
export type ProductInquiryData = z.infer<typeof productInquirySchema>;
export type ServiceInquiryData = z.infer<typeof serviceInquirySchema>;
export type EmergencyData = z.infer<typeof emergencySchema>;
export type ConsultationData = z.infer<typeof consultationSchema>;
export type PartnershipData = z.infer<typeof partnershipSchema>;
export type GeneralContactData = z.infer<typeof generalContactSchema>;

// ── Animal Types Options ───────────────────────────────────────────
export const animalTypeOptions: { value: AnimalType; label: string }[] = [
  { value: "poultry", label: "🐔 Poultry (Chicken, Turkey, etc.)" },
  { value: "cattle", label: "🐄 Cattle" },
  { value: "goats_sheep", label: "🐐 Goats & Sheep" },
  { value: "dogs_cats", label: "🐕 Dogs & Cats" },
  { value: "fish", label: "🐟 Fish / Aquaculture" },
  { value: "other", label: "🐾 Other" },
];

export const consultationTopics = [
  "Disease Diagnosis & Treatment",
  "Nutrition & Feed Management",
  "Vaccination Schedule",
  "Farm Management Advice",
  "Product Recommendation",
  "Dosage & Administration",
  "Preventive Health Program",
  "Other",
];

export const businessTypes = [
  "Veterinary Pharmacy / Agrovet Shop",
  "Poultry Farm",
  "Cattle Ranch",
  "Mixed Livestock Farm",
  "Veterinary Clinic / Hospital",
  "Agriculture Cooperative",
  "Wholesaler / Distributor",
  "Other",
];

// ── Context-Aware WhatsApp Message Builder ─────────────────────────
export function buildWhatsAppMessage(
  context: PageContext,
  formData: Record<string, unknown>
): string {
  const divider = "─────────────────";
  const timestamp = new Date().toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  let header = "";
  let body = "";

  switch (context.inquiryType) {
    case "product_inquiry":
      header = `📦 *PRODUCT INQUIRY*`;
      body = [
        `*Product:* ${context.productName || "General Products"}`,
        `*Category:* ${context.productCategory || "N/A"}`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        `*Animal Type:* ${formData.animalType}`,
        formData.quantity ? `*Quantity Needed:* ${formData.quantity}` : "",
        formData.message ? `*Additional Info:* ${formData.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      break;

    case "service_request":
      header = `🩺 *SERVICE REQUEST*`;
      body = [
        `*Service:* ${context.serviceName || "General Veterinary Service"}`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        `*Animal Type:* ${formData.animalType}`,
        formData.numberOfAnimals
          ? `*Number of Animals:* ${formData.numberOfAnimals}`
          : "",
        `*Issue:* ${formData.issueDescription}`,
      ]
        .filter(Boolean)
        .join("\n");
      break;

    case "emergency":
      header = `🚨 *VETERINARY EMERGENCY*`;
      body = [
        `*URGENT — Immediate Attention Required*`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        `*Animal Type:* ${formData.animalType}`,
        formData.numberOfAffected
          ? `*Animals Affected:* ${formData.numberOfAffected}`
          : "",
        `*Symptoms:* ${formData.symptoms}`,
      ]
        .filter(Boolean)
        .join("\n");
      break;

    case "consultation":
      header = `💬 *CONSULTATION REQUEST*`;
      body = [
        `*Topic:* ${formData.topic}`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        `*Animal Type:* ${formData.animalType}`,
        formData.preferredTime
          ? `*Preferred Time:* ${formData.preferredTime}`
          : "",
        formData.details ? `*Details:* ${formData.details}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      break;

    case "partnership":
      header = `🤝 *PARTNERSHIP INQUIRY*`;
      body = [
        `*Business:* ${formData.businessName}`,
        `*Business Type:* ${formData.businessType}`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        formData.message ? `*Message:* ${formData.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      break;

    case "general_contact":
    default:
      header = `📩 *GENERAL INQUIRY*`;
      body = [
        `*Subject:* ${formData.subject}`,
        divider,
        `*Name:* ${formData.fullName}`,
        `*Phone:* ${formData.phone}`,
        `*Location:* ${formData.location}`,
        `*Message:* ${formData.message}`,
      ]
        .filter(Boolean)
        .join("\n");
      break;
  }

  const footer = [
    divider,
    `📍 *Page:* ${context.page}${context.section ? ` → ${context.section}` : ""}`,
    `🕐 *Sent:* ${timestamp}`,
    `_via Divine Agvet Website_`,
  ].join("\n");

  const fullMessage = `${header}\n\n${body}\n\n${footer}`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(fullMessage)}`;
}

// ── Quick context builders for common use cases ────────────────────
export function productContext(
  productName: string,
  productCategory: string
): PageContext {
  return {
    page: "Products",
    section: productName,
    inquiryType: "product_inquiry",
    productName,
    productCategory,
  };
}

export function serviceContext(serviceName: string): PageContext {
  return {
    page: "Services",
    section: serviceName,
    inquiryType: "service_request",
    serviceName,
  };
}

export function emergencyContext(): PageContext {
  return {
    page: "Emergency",
    inquiryType: "emergency",
    urgency: "emergency",
  };
}

export function consultationContext(): PageContext {
  return {
    page: "Services",
    section: "Consultation",
    inquiryType: "consultation",
  };
}

export function partnershipContext(): PageContext {
  return {
    page: "Contact",
    section: "Partnership",
    inquiryType: "partnership",
  };
}

export function generalContactContext(): PageContext {
  return {
    page: "Contact",
    inquiryType: "general_contact",
  };
}
