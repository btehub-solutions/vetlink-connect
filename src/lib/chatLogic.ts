
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isError?: boolean;
  link?: string;
  linkText?: string;
  card?: DiagnosticCardData;
  form?: LeadGenFormData;
  isEmergency?: boolean;
}

export interface DiagnosticCardData {
  type: 'diagnostic';
  title: string;
  symptom: string;
  probableCause: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  recommendations: Array<{ product: string; action: string }>;
}

export interface LeadGenFormData {
  type: 'lead_capture';
  title: string;
  fields: Array<{ name: string; label: string; type: 'text' | 'tel' | 'select'; options?: string[] }>;
  submitLabel: string;
  context: string;
}

export interface ChatContext {
  page: string;
  conversationHistory?: Array<{ role: 'user' | 'bot'; text: string }>;
}

// ── Intent Classification ──────────────────────────────────────────

interface Intent {
  name: string;
  patterns: string[][];  // each inner array is a set of words that together indicate this intent
  synonyms?: Record<string, string[]>; // word → synonyms mapping
  priority: number; // higher = more specific, wins ties
}

const INTENTS: Intent[] = [
  {
    name: 'greeting',
    patterns: [['hello'], ['hi'], ['hey'], ['greetings'], ['good morning'], ['good afternoon'], ['good evening'], ['howdy'], ['sup'], ['yo'], ['whats up'], ['how are you']],
    priority: 1
  },
  {
    name: 'farewell',
    patterns: [['bye'], ['goodbye'], ['see you'], ['take care'], ['later'], ['goodnight'], ['thanks bye']],
    priority: 1
  },
  {
    name: 'gratitude',
    patterns: [['thank'], ['thanks'], ['appreciate'], ['grateful'], ['awesome'], ['great job'], ['well done'], ['perfect'], ['excellent']],
    priority: 1
  },
  {
    name: 'about_company',
    patterns: [['who are you'], ['about'], ['company'], ['history'], ['founded'], ['divine agvet'], ['your story'], ['tell me about'], ['what do you do'], ['what is divine'], ['what is agvet']],
    priority: 3
  },
  {
    name: 'farm_help',
    patterns: [['help', 'farm'], ['need help'], ['assist'], ['support', 'farm'], ['help', 'animal'], ['help', 'livestock'], ['help', 'poultry'], ['my farm'], ['our farm'], ['farm problem'], ['farming'], ['farm advice'], ['farm management']],
    priority: 5
  },
  {
    name: 'products_general',
    patterns: [['product'], ['medicine'], ['drug'], ['supplies'], ['catalogue'], ['catalog'], ['list'], ['inventory'], ['what do you sell'], ['what do you have'], ['available products'], ['show me']],
    priority: 4
  },
  {
    name: 'product_viramax',
    patterns: [['viramax'], ['vitamin k'], ['growth booster'], ['immunity booster'], ['immune booster']],
    priority: 6
  },
  {
    name: 'product_maxitet',
    patterns: [['maxitet'], ['oxytetracycline'], ['antibiotic powder']],
    priority: 6
  },
  {
    name: 'product_ectomax',
    patterns: [['ectomax'], ['tick spray'], ['flea spray'], ['lice treatment']],
    priority: 6
  },
  {
    name: 'product_maxicocc',
    patterns: [['maxicocc'], ['coccidiosis treatment'], ['cocci']],
    priority: 6
  },
  {
    name: 'product_vitaconc',
    patterns: [['vitaconc'], ['maxi vitaconc'], ['vitamin supplement'], ['vitamin concentrate']],
    priority: 6
  },
  {
    name: 'emergency',
    patterns: [['emergency'], ['urgent'], ['dying'], ['sick now'], ['help fast'], ['critical'], ['bleeding'], ['not eating'], ['collapse'], ['sudden death'], ['mass death'], ['many dying'], ['outbreak']],
    priority: 10
  },
  {
    name: 'pricing',
    patterns: [['price'], ['cost'], ['how much'], ['quote'], ['bulk'], ['wholesale'], ['discount'], ['afford'], ['budget'], ['rate'], ['charges']],
    priority: 5
  },
  {
    name: 'ordering',
    patterns: [['order'], ['buy'], ['purchase'], ['get'], ['delivery'], ['shipping'], ['how to order'], ['place order'], ['want to buy']],
    priority: 5
  },
  {
    name: 'location',
    patterns: [['location'], ['office'], ['where'], ['address'], ['branch'], ['near me'], ['closest'], ['abuja'], ['lagos'], ['find you'], ['visit']],
    priority: 4
  },
  {
    name: 'poultry',
    patterns: [['poultry'], ['chicken'], ['layer'], ['broiler'], ['egg production'], ['chick'], ['hen'], ['rooster'], ['birds'], ['flock'], ['hatchery']],
    priority: 5
  },
  {
    name: 'cattle',
    patterns: [['cattle'], ['cow'], ['bull'], ['calf'], ['beef'], ['dairy cow'], ['milking']],
    priority: 5
  },
  {
    name: 'goat_sheep',
    patterns: [['goat'], ['sheep'], ['ram'], ['ewe'], ['lamb'], ['small ruminant']],
    priority: 5
  },
  {
    name: 'pig',
    patterns: [['pig'], ['swine'], ['piglet'], ['sow'], ['boar'], ['piggery']],
    priority: 5
  },
  {
    name: 'pet',
    patterns: [['dog'], ['cat'], ['puppy'], ['kitten'], ['pet'], ['companion animal']],
    priority: 5
  },
  {
    name: 'fish',
    patterns: [['fish'], ['catfish'], ['tilapia'], ['aquaculture'], ['pond'], ['fingerling']],
    priority: 5
  },
  {
    name: 'disease_respiratory',
    patterns: [['cough'], ['sneez'], ['breathing'], ['respiratory'], ['nasal discharge'], ['wheezing'], ['gasping'], ['crd']],
    priority: 7
  },
  {
    name: 'disease_diarrhea',
    patterns: [['diarrhea'], ['diarrhoea'], ['watery stool'], ['runny stool'], ['scour'], ['loose stool'], ['bloody stool']],
    priority: 7
  },
  {
    name: 'disease_skin',
    patterns: [['tick'], ['flea'], ['lice'], ['mange'], ['skin'], ['itching'], ['scratching'], ['rash'], ['wound'], ['sore'], ['abscess']],
    priority: 7
  },
  {
    name: 'disease_general',
    patterns: [['sick'], ['ill'], ['disease'], ['symptom'], ['infection'], ['fever'], ['weak'], ['letharg'], ['not well'], ['problem'], ['treatment'], ['medicine for'], ['cure'], ['remedy']],
    priority: 5
  },
  {
    name: 'feeding',
    patterns: [['feed'], ['feeding'], ['nutrition'], ['diet'], ['supplement'], ['fodder'], ['hay'], ['grain'], ['ration'], ['how to feed'], ['what to feed'], ['not eating'], ['loss of appetite']],
    priority: 5
  },
  {
    name: 'vaccination',
    patterns: [['vaccine'], ['vaccination'], ['immuniz'], ['deworming'], ['deworm'], ['prophylax'], ['prevention'], ['prevent disease']],
    priority: 6
  },
  {
    name: 'breeding',
    patterns: [['breed'], ['breeding'], ['pregnant'], ['gestation'], ['mating'], ['artificial insemination'], ['fertility'], ['calving'], ['lambing']],
    priority: 5
  },
  {
    name: 'consultation',
    patterns: [['talk to a vet'], ['consult'], ['expert'], ['advice'], ['diagnosis'], ['vet doctor'], ['veterinarian'], ['professional'], ['specialist']],
    priority: 5
  },
  {
    name: 'partnership',
    patterns: [['partnership'], ['distributor'], ['partner'], ['supply'], ['clinic'], ['dealer'], ['dealership'], ['franchise'], ['wholesale'], ['resell']],
    priority: 5
  },
  {
    name: 'nafdac',
    patterns: [['nafdac'], ['approve'], ['certif'], ['regulat'], ['genuine'], ['authentic'], ['fake'], ['counterfeit'], ['original']],
    priority: 6
  },
  {
    name: 'contact',
    patterns: [['contact'], ['reach'], ['call'], ['phone'], ['whatsapp'], ['email'], ['message you'], ['get in touch']],
    priority: 4
  },
  {
    name: 'services',
    patterns: [['service'], ['what services'], ['offering'], ['what can you do'], ['capabilities']],
    priority: 4
  },
  {
    name: 'water_management',
    patterns: [['water'], ['dehydrat'], ['drinking water'], ['water quality'], ['water treatment']],
    priority: 4
  },
  {
    name: 'housing_management',
    patterns: [['housing'], ['shelter'], ['pen'], ['coop'], ['barn'], ['ventilation'], ['space'], ['overcrowding']],
    priority: 4
  },
  {
    name: 'mortality',
    patterns: [['dying'], ['death'], ['dead'], ['mortality'], ['losing'], ['lost', 'bird'], ['lost', 'chicken'], ['lost', 'animal']],
    priority: 8
  }
];

// ── Knowledge Responses ────────────────────────────────────────────

interface KnowledgeResponse {
  intent: string;
  responses: Array<{
    text: string;
    link?: string;
    linkText?: string;
    followUp?: string;
  }>;
}

const KNOWLEDGE_RESPONSES: KnowledgeResponse[] = [
  {
    intent: 'greeting',
    responses: [
      { text: "Hello! 👋 Welcome to Divine Agvet. I'm your AI veterinary assistant, trained on 17+ years of field experience across Nigeria. I can help with:\n\n🐔 Poultry management & diseases\n🐄 Livestock health programs\n💊 Product recommendations\n🚨 Emergency vet support\n📦 Orders & delivery info\n\nWhat would you like help with today?", followUp: "What type of animals do you keep?" },
      { text: "Hi there! 😊 I'm your Agvet AI — your 24/7 virtual veterinary consultant. Whether you're a large-scale farmer or just starting out, I'm here to guide you.\n\nTell me — what animals are you raising, and how can I help today?" }
    ]
  },
  {
    intent: 'farewell',
    responses: [
      { text: "Thanks for chatting! 🙏 Remember, Divine Agvet is here for you 24/7. Whether it's products, advice, or emergency help — we're just a message away. Good luck with your farm! 🌿" },
      { text: "Goodbye! Feel free to come back anytime. Your animals' health is our priority. Take care! 👋" }
    ]
  },
  {
    intent: 'gratitude',
    responses: [
      { text: "You're most welcome! 🙏 At Divine Agvet, your farm's success is our success. If you need anything else — product info, expert advice, or emergency help — I'm always here.\n\nIs there anything else I can help with?" },
      { text: "Happy to help! That's what I'm here for. Don't hesitate to reach out whenever you need guidance. Your animals are in good hands with Divine Agvet! 🐾" }
    ]
  },
  {
    intent: 'about_company',
    responses: [
      { text: "🏭 **Divine Agvet Limited** — Founded in 2008 in Osun State, Nigeria.\n\n📌 What we do:\n• Manufacture NAFDAC-approved veterinary products\n• Deliver directly to farms across 12+ states\n• Provide 24/7 veterinary consultation\n\n📊 Our impact:\n• 2,500+ farmers supported\n• 17+ years of trusted expertise\n• Under 5-minute average response time\n\nWe started with a single mission: *bring authentic, affordable vet medicines to Nigerian farmers* — cutting out the middlemen and fake products.", link: '/about', linkText: "Read Our Full Story" }
    ]
  },
  {
    intent: 'farm_help',
    responses: [
      { text: "I'd love to help with your farm! 🌿 To give you the best guidance, let me understand your situation:\n\n1️⃣ **What animals do you keep?**\n   (Poultry, cattle, goats, sheep, pigs, fish, pets?)\n\n2️⃣ **What's the main challenge?**\n   • Animals are sick or showing symptoms\n   • Need product recommendations\n   • Looking for feeding/nutrition advice\n   • Want a vaccination schedule\n   • General farm management tips\n\nJust describe your situation and I'll guide you step by step!", followUp: "Tell me more about what's happening on your farm." },
      { text: "Absolutely, I'm here to help! 💪 With 17 years of expertise supporting Nigerian farmers, we've seen it all.\n\nCould you tell me:\n• What type of animals are you raising?\n• How many do you have?\n• What specific issue or question do you have?\n\nThe more detail you give me, the better I can assist!" }
    ]
  },
  {
    intent: 'products_general',
    responses: [
      { text: "📦 **Our Product Range** — All NAFDAC-approved, factory-direct:\n\n💊 **Antibiotics:**\n• Maxitet (Oxytetracycline HCl) — broad-spectrum for infections\n• Maxi Neomycin — for gut infections & diarrhea\n\n🛡️ **Immunity & Growth:**\n• Viramax — Vitamin K + Iodine immunity booster\n• Maxi Vitaconc — Complete vitamin supplement\n\n🐛 **Parasite Control:**\n• Ectomax Spray — Ticks, fleas, lice treatment\n• Maxicocc — Anti-coccidiosis solution\n\n🧪 **Specialty:**\n• Wound care products\n• Water sanitizers\n• Feed additives\n\nWant details on any specific product? Just ask!", link: '/products', linkText: "View Full Catalog" }
    ]
  },
  {
    intent: 'product_viramax',
    responses: [
      { text: "💊 **Viramax** (NAFDAC: A10-0093)\n\n📋 **What it is:** Premium growth & immunity supplement containing Vitamin K and Iodine.\n\n✅ **Benefits:**\n• Boosts immune system in poultry & livestock\n• Prevents bleeding disorders (Vitamin K deficiency)\n• Supports thyroid function and metabolism (Iodine)\n• Improves feed conversion ratio in broilers\n• Reduces mortality in young chicks\n\n📏 **Dosage:** Mix as directed — typically 1g per liter of drinking water\n\n💡 *Pro tip: Farmers who combine Viramax with Maxitet report 40% fewer disease outbreaks!*\n\nWant to order or need dosage guidance for your specific flock size?", link: '/products', linkText: "Order Viramax" }
    ]
  },
  {
    intent: 'product_maxitet',
    responses: [
      { text: "💊 **Maxitet** (Oxytetracycline HCl)\n\n📋 **What it is:** Broad-spectrum antibiotic powder for bacterial infections.\n\n✅ **Treats:**\n• Chronic Respiratory Disease (CRD)\n• Enteritis & gut infections\n• Fowl cholera\n• Pneumonia\n• Infectious sinusitis\n• General bacterial infections\n\n🐔 **For:** Poultry, cattle, goats, sheep, pigs\n\n📏 **Dosage:** Typically 1g per liter of drinking water for 3-5 days\n\n⚠️ **Important:** Complete the full course even if symptoms improve. Withdraw from laying birds and dairy as directed.\n\nWould you like help with dosage for your specific animals?", link: '/products', linkText: "Order Maxitet" }
    ]
  },
  {
    intent: 'product_ectomax',
    responses: [
      { text: "🛡️ **Ectomax Spray**\n\n📋 **What it is:** Premium tick, flea & lice control spray.\n\n✅ **Benefits:**\n• Kills ticks, fleas, lice on contact\n• Repels mosquitoes for up to 2 months\n• Safe for dogs, cats, cattle, goats\n• Easy spray-on application\n• Long-lasting protection\n\n📏 **Usage:** Spray directly on the animal's body, focusing on ears, underbelly, and leg joints.\n\n💡 *Pro tip: During rainy season (tick season in Nigeria), apply every 2 weeks for maximum protection.*\n\nNeed help with application or ordering?", link: '/products', linkText: "Order Ectomax" }
    ]
  },
  {
    intent: 'product_maxicocc',
    responses: [
      { text: "💊 **Maxicocc** — Anti-Coccidiosis Solution\n\n📋 **What it is:** Targeted treatment for coccidiosis — one of the deadliest poultry diseases in Nigeria.\n\n✅ **Benefits:**\n• Fast-acting against all Eimeria species\n• Stops bloody droppings within 24-48 hours\n• Prevents weight loss and mortality\n• Safe for broilers, layers, and breeders\n\n📏 **Dosage:** As directed on label, typically via drinking water for 3-5 days\n\n⚠️ **Signs your birds need Maxicocc:** Bloody droppings, hunched posture, ruffled feathers, reduced feed intake.\n\nWould you like to order or need advice on coccidiosis prevention?", link: '/products', linkText: "Order Maxicocc" }
    ]
  },
  {
    intent: 'product_vitaconc',
    responses: [
      { text: "💊 **Maxi Vitaconc** — Complete Vitamin Supplement\n\n📋 **What it is:** Concentrated multivitamin solution for poultry and livestock.\n\n✅ **Benefits:**\n• Boosts egg production in layers\n• Reduces stress during transport, vaccination, or weather changes\n• Improves growth rate in broilers\n• Strengthens immunity after disease recovery\n\n📏 **Best used:**\n• Before and after vaccination\n• During extreme heat or cold\n• After antibiotic treatment\n• During peak laying periods\n\nWant to add this to your order?", link: '/products', linkText: "Order Maxi Vitaconc" }
    ]
  },
  {
    intent: 'emergency',
    responses: [
      { text: "🚨 **EMERGENCY RESPONSE ACTIVATED**\n\nOur veterinary team is on standby 24/7. Here's what to do RIGHT NOW:\n\n1️⃣ **Isolate** sick animals from healthy ones immediately\n2️⃣ **Observe** and note: symptoms, how many affected, when it started\n3️⃣ **Contact us** — average response time is under 5 minutes\n\n📞 **Call/WhatsApp:** +234 813 697 2328\n\n⚠️ **Do NOT** self-medicate without proper diagnosis — wrong treatment can make things worse.\n\nDescribe what's happening and I'll provide immediate first-aid guidance while our vet team prepares to assist.", link: '/contact', linkText: "GET EMERGENCY HELP NOW" }
    ]
  },
  {
    intent: 'pricing',
    responses: [
      { text: "💰 **Pricing & Orders**\n\nWe offer **factory-direct pricing** — no middlemen, no inflated costs!\n\n🏷️ **Pricing tiers:**\n• Retail (single units) — Standard pricing\n• Bulk orders (10+ units) — 10-15% discount\n• Wholesale/Dealers — Special partnership pricing\n• Agrovets & Clinics — Dedicated dealer rates\n\n📦 **Minimum order:** No minimum for retail\n\nFor specific product prices, just name the product and I'll give you details. Or for a full quote, our sales team can help:", link: 'https://wa.me/2348136972328', linkText: "Get a Price Quote" }
    ]
  },
  {
    intent: 'ordering',
    responses: [
      { text: "🛒 **How to Order from Divine Agvet:**\n\n1️⃣ Browse our products on this website\n2️⃣ Click \"Inquire\" on any product\n3️⃣ Fill the short form with your details\n4️⃣ We'll prepare your order and contact you\n\n🚚 **Delivery Times:**\n• Ibadan & Osun State: 24-48 hours\n• Other states: 3-5 business days\n• Express delivery available for emergencies\n\n💳 **Payment:** Bank transfer, mobile money, or pay-on-delivery\n\nWhat products would you like to order?", link: '/products', linkText: "Browse & Order Products" }
    ]
  },
  {
    intent: 'location',
    responses: [
      { text: "📍 **Find Us:**\n\n🏢 **Warehouse:** Oyediji Building, Opposite Sky Bank, Monatan, Ibadan, Oyo State, Nigeria\n• Open 24/7\n• Full product showroom available\n\n🏢 **Factory:** No. 6, Ikoyi-Ile, Osun State, Nigeria\n• Open 24/7\n• Manufacturing and distribution center\n\n🗺️ **Coverage:** Technical representatives in 12+ states across Nigeria.\n\nWe also deliver nationwide — so even if you're not near our facilities, we can get products to your doorstep!\n\nWant directions to our locations?", link: '/locations', linkText: "View Locations & Directions" }
    ]
  },
  {
    intent: 'poultry',
    responses: [
      { text: "🐔 **Poultry Solutions from Divine Agvet:**\n\nWhether you're raising broilers, layers, or breeders, we've got you covered!\n\n📋 **Common Poultry Issues We Solve:**\n• CRD / Respiratory infections → **Maxitet**\n• Coccidiosis (bloody droppings) → **Maxicocc**\n• Low egg production → **Maxi Vitaconc**\n• Poor growth rate → **Viramax**\n• Ticks & external parasites → **Ectomax**\n\n🎯 **Recommended Routine:**\n• Day 1-3: Vitamins (Maxi Vitaconc)\n• Day 5-7: Vaccination\n• Day 8-10: Post-vaccine vitamins\n• Weekly: Water sanitizer\n\nWhat specific poultry challenge are you facing? I can give you a tailored recommendation!" }
    ]
  },
  {
    intent: 'cattle',
    responses: [
      { text: "🐄 **Cattle & Dairy Solutions:**\n\nManaging cattle in Nigeria's tropical climate requires expert care. Here's how we help:\n\n💊 **Key Products for Cattle:**\n• **Maxitet** — For bacterial infections, pneumonia\n• **Ectomax** — Tick control (critical in rainy season!)\n• **Viramax** — Immune system support\n\n📋 **Our Cattle Services:**\n• Herd health program design\n• Custom vaccination schedules\n• Deworming protocols\n• Nutrition planning\n\n⚠️ **Common issues in Nigerian herds:**\n• Tick-borne diseases\n• Foot-and-mouth disease\n• Internal parasites\n• Heat stress\n\nWhich of these challenges are you dealing with?", link: '/services', linkText: "Cattle Health Programs" }
    ]
  },
  {
    intent: 'goat_sheep',
    responses: [
      { text: "🐐 **Goat & Sheep Solutions:**\n\nSmall ruminants are a major part of Nigerian agriculture. Here's how Divine Agvet supports your flock:\n\n💊 **Recommended Products:**\n• **Maxitet** — For infections (pneumonia, enteritis)\n• **Ectomax** — Mange, ticks, and lice treatment\n• **Viramax** — Growth and immunity boost\n\n📋 **Key Management Tips:**\n• Deworm every 3 months\n• Vaccinate against PPR annually\n• Provide mineral supplements\n• Keep housing dry and well-ventilated\n\n⚠️ **Watch for:** Nasal discharge, diarrhea, loss of appetite, or skin lesions.\n\nWhat specific issue are you having with your goats or sheep?" }
    ]
  },
  {
    intent: 'pig',
    responses: [
      { text: "🐷 **Pig & Swine Solutions:**\n\nPiggery is growing rapidly in Nigeria. Divine Agvet can help you maximize returns:\n\n💊 **Products for Pigs:**\n• **Maxitet** — Treats bacterial infections\n• **Viramax** — Supports growth and immunity\n• **Deworming solutions** available\n\n📋 **Pig Health Tips:**\n• Deworm every 6-8 weeks\n• Maintain clean, dry pens\n• Provide proper ventilation\n• Feed balanced rations with protein and minerals\n\nTell me more about your piggery — how many pigs do you have and what challenges are you facing?" }
    ]
  },
  {
    intent: 'pet',
    responses: [
      { text: "🐾 **Pet Care Solutions:**\n\n💊 **For Dogs & Cats:**\n• **Ectomax Spray** — Kills ticks, fleas, lice; repels mosquitoes for up to 2 months\n• **Deworming solutions** — For intestinal parasites\n• **Wound care** products\n\n📋 **Routine Pet Care:**\n• Deworm every 3 months\n• Annual vaccinations (Rabies, Distemper, Parvo)\n• Monthly tick/flea prevention\n• Regular vet checkups\n\nWhat's going on with your pet? I can recommend the right treatment!" }
    ]
  },
  {
    intent: 'fish',
    responses: [
      { text: "🐟 **Aquaculture Solutions:**\n\nFish farming (especially catfish and tilapia) is booming in Nigeria!\n\n📋 **Key Areas We Support:**\n• Water quality management\n• Disease prevention\n• Feed optimization\n• Fingerling health management\n\n💡 **Tips for Success:**\n• Monitor pH and dissolved oxygen regularly\n• Avoid overcrowding (affects growth and disease risk)\n• Use quality feed with right protein levels\n• Maintain clean water with partial changes\n\nFor specific aquaculture advice, I'd recommend speaking with our experts:", link: '/services', linkText: "Consult a Fish Expert" }
    ]
  },
  {
    intent: 'disease_respiratory',
    responses: [
      { text: "🫁 **Respiratory Issues — Quick Assessment:**\n\nRespiratory problems are one of the top killers in Nigerian poultry and livestock.\n\n🔍 **Symptoms you might see:**\n• Coughing, sneezing, wheezing\n• Nasal discharge (clear or mucus)\n• Difficulty breathing / gasping\n• Swollen face or eyes\n• Reduced feed intake\n\n💊 **Recommended Treatment:**\n• **Maxitet** (Oxytetracycline) — First-line antibiotic\n• **Maxi Vitaconc** — Support recovery with vitamins\n• Improve ventilation in housing\n• Isolate affected animals\n\n⚠️ **If many animals are affected quickly**, this could be an outbreak. Consider:", link: '/contact', linkText: "Contact Our Vet Team" }
    ]
  },
  {
    intent: 'disease_diarrhea',
    responses: [
      { text: "💧 **Diarrhea/Scours — Quick Assessment:**\n\nDiarrhea can rapidly dehydrate and kill animals, especially young ones.\n\n🔍 **Key Questions:**\n• Is the stool watery, mucusy, or bloody?\n• How many animals are affected?\n• Are they still eating?\n\n💊 **Immediate Actions:**\n1. **Rehydrate** — Provide oral rehydration salts in water\n2. **Treat** — Maxitet or targeted antibiotic\n3. **Vitamins** — Maxi Vitaconc to support recovery\n4. **Isolate** affected animals\n\n⚠️ **Bloody diarrhea in poultry** = likely coccidiosis → Use **Maxicocc**\n⚠️ **Watery diarrhea in calves** = could be E. coli → needs antibiotic treatment\n\nTell me which animals are affected and I can narrow down the cause!" }
    ]
  },
  {
    intent: 'disease_skin',
    responses: [
      { text: "🐛 **Skin & Parasite Issues:**\n\n🔍 **Common Skin Problems in Nigerian Farms:**\n• **Ticks** — Most common in cattle/goats, especially in rainy season\n• **Fleas/Lice** — Common in dogs, cats, poultry\n• **Mange** — Causes hair loss, intense itching\n• **Wounds/Sores** — Secondary infections common in tropical heat\n\n💊 **Treatment:**\n• **Ectomax Spray** — Ticks, fleas, lice (single application protection for weeks)\n• **Wound care products** — For open sores\n• **Maxitet** — If bacterial secondary infection is present\n\n💡 **Prevention tip:** Regular Ectomax application every 2-4 weeks during rainy season prevents most external parasite problems.\n\nWhich animals are affected and what symptoms are you seeing?" }
    ]
  },
  {
    intent: 'disease_general',
    responses: [
      { text: "🏥 **Let me help diagnose the issue!**\n\nTo give you the best advice, please tell me:\n\n1️⃣ **What animal?** (chicken, cow, goat, dog, etc.)\n2️⃣ **Main symptoms?** Examples:\n   • Not eating / loss of appetite\n   • Diarrhea (watery, bloody?)\n   • Coughing / nasal discharge\n   • Skin issues / scratching\n   • Weakness / lethargy\n   • Sudden deaths\n\n3️⃣ **How many affected?** (1 animal or multiple?)\n4️⃣ **When did it start?**\n\nWith this information, I can recommend the right Divine Agvet product and treatment plan. Don't worry — with 17+ years of experience, we've helped thousands of farmers overcome these challenges!" }
    ]
  },
  {
    intent: 'feeding',
    responses: [
      { text: "🌾 **Feeding & Nutrition Advice:**\n\nProper nutrition is the foundation of profitable farming!\n\n🐔 **Poultry Feed Guide:**\n• Chick starter: 0-4 weeks (22-24% protein)\n• Grower: 4-8 weeks (20% protein)\n• Finisher/Layer: 8+ weeks (16-18% protein)\n\n🐄 **Cattle/Goat Feed:**\n• Quality roughage (hay, silage)\n• Concentrate feed with minerals\n• Clean water access at all times\n\n💊 **Supplements We Recommend:**\n• **Maxi Vitaconc** — Essential vitamins\n• **Viramax** — Growth & immunity boost\n\n💡 **Key tip:** Poor nutrition is the #1 cause of low productivity and disease susceptibility on Nigerian farms.\n\nWhat animals are you feeding and at what stage?" }
    ]
  },
  {
    intent: 'vaccination',
    responses: [
      { text: "💉 **Vaccination & Disease Prevention:**\n\nPrevention is always cheaper than treatment!\n\n🐔 **Poultry Vaccination Schedule:**\n• Day 1: Marek's disease\n• Day 7: Newcastle (La Sota) + IBV\n• Day 14: Gumboro (IBD)\n• Day 21: Newcastle booster\n• Week 6: Fowl pox\n• Week 8: Newcastle (Komarov) for layers\n\n🐄 **Cattle Essentials:**\n• FMD vaccine\n• Brucellosis\n• Black quarter\n• Annual deworming\n\n🐐 **Goat/Sheep:**\n• PPR vaccine (annually)\n• Deworming (every 3 months)\n\n💊 **Pro tip:** Always give **Maxi Vitaconc** 2 days before and after vaccination to reduce stress and improve immune response!\n\nWhat animals need their vaccination schedule planned?" }
    ]
  },
  {
    intent: 'breeding',
    responses: [
      { text: "🧬 **Breeding & Reproduction Advice:**\n\n📋 **Key Tips for Success:**\n\n🐔 **Poultry Breeding:**\n• Cock:Hen ratio — 1:10 for light breeds, 1:8 for heavy breeds\n• Egg collection: minimum 3x daily\n• Incubation: 21 days for chickens\n\n🐄 **Cattle:**\n• Gestation: ~283 days\n• Watch for heat signs every 21 days\n• Nutrition is critical in last trimester\n\n🐐 **Goats:**\n• Gestation: ~150 days\n• Flush feeding before breeding improves conception\n\n💊 **Supplements for breeding stock:**\n• **Maxi Vitaconc** — Improves fertility\n• **Viramax** — Supports immune health\n\nWhat type of animals are you breeding?" }
    ]
  },
  {
    intent: 'consultation',
    responses: [
      { text: "👨‍⚕️ **Expert Veterinary Consultation:**\n\nOur licensed veterinarians have 17+ years of field experience across Nigeria.\n\n📋 **We Can Help With:**\n• Disease diagnosis & treatment plans\n• Custom vaccination schedules\n• Nutrition & feed formulation\n• Farm layout & management\n• Pre-purchase animal inspection\n• Outbreak investigation\n\n⏰ **Response Time:** Average under 5 minutes\n📱 **Available:** 24/7\n\nYou can describe your issue here and I'll provide initial guidance, or connect directly with our vet team:", link: '/contact', linkText: "Speak to a Vet Now" }
    ]
  },
  {
    intent: 'partnership',
    responses: [
      { text: "🤝 **Partnership Opportunities with Divine Agvet:**\n\nJoin our growing network of 2,500+ satisfied partners!\n\n📋 **Partnership Options:**\n• **Agrovet/Vet Store Owner** — Stock our products at competitive wholesale rates\n• **Distributor** — Exclusive territory distribution rights\n• **Veterinary Clinic** — Preferred supplier arrangement\n• **Farm Cooperative** — Group buying discounts\n\n✅ **Why Partner With Us:**\n• Factory-direct pricing (highest margins for you)\n• All products NAFDAC-approved\n• Marketing support & training\n• Dedicated account manager\n• Reliable delivery network\n\nInterested? Let's discuss the details:", link: '/contact', linkText: "Apply for Partnership" }
    ]
  },
  {
    intent: 'nafdac',
    responses: [
      { text: "✅ **Quality & Authenticity — NAFDAC Approved:**\n\nAt Divine Agvet, EVERY product is **NAFDAC-approved**. Here's what that means for you:\n\n🛡️ **Our Quality Guarantee:**\n• Each product carries a valid NAFDAC registration number\n• Manufactured under strict quality control\n• Properly stored and handled throughout the supply chain\n• Clear labeling with expiry dates and batch numbers\n\n⚠️ **Beware of Fake Products:**\nFake veterinary medicines are a massive problem in Nigeria. They can:\n• Be completely ineffective\n• Cause toxic reactions\n• Lead to antimicrobial resistance\n\n**Always buy from trusted suppliers like Divine Agvet!**\n\nYou can verify our NAFDAC numbers on any product packaging.", link: '/products', linkText: "View Verified Products" }
    ]
  },
  {
    intent: 'contact',
    responses: [
      { text: "📞 **Contact Divine Agvet:**\n\n📱 **WhatsApp/Call:** +234 813 697 2328\n⏰ **Available:** 24/7 — Even holidays!\n🏢 **Locations:** Warehouse (Monatan, Ibadan) & Factory (Ikoyi-Ile, Osun State)\n\n💬 **Fastest Way:** Click below to start a WhatsApp conversation with our team. We'll respond in under 5 minutes!\n\nOr feel free to keep chatting with me — I can help with most questions right here!", link: 'https://wa.me/2348136972328', linkText: "Chat on WhatsApp" }
    ]
  },
  {
    intent: 'services',
    responses: [
      { text: "🩺 **Our Professional Services:**\n\n1️⃣ **Veterinary Consultation** — 24/7 expert advice\n2️⃣ **Farm Health Programs** — Custom plans for your operation\n3️⃣ **Disease Outbreak Response** — Rapid investigation & treatment\n4️⃣ **Vaccination Programs** — Scheduled preventive care\n5️⃣ **Nutrition Planning** — Optimize feed for maximum output\n6️⃣ **Product Supply** — Factory-direct NAFDAC-approved medicines\n\n💡 All services backed by 17+ years of experience serving Nigerian farmers.\n\nWhich service interests you most?", link: '/services', linkText: "Explore All Services" }
    ]
  },
  {
    intent: 'water_management',
    responses: [
      { text: "💧 **Water Management Tips:**\n\nClean water is critical — poor water quality causes more disease than most farmers realize!\n\n📋 **Best Practices:**\n• Change water daily\n• Clean drinkers/troughs at least twice weekly\n• Test water pH periodically (ideal: 6.5-7.5)\n• In rainy season, protect water sources from contamination\n\n💊 **Our Solutions:**\n• Water sanitizers to keep drinking water clean\n• **Maxi Vitaconc** added to water for vitamin supplementation\n\n⚠️ **Dehydration signs:** Reduced feed intake, dry skin/comb, sunken eyes, lethargy.\n\nWhat water challenge are you dealing with?" }
    ]
  },
  {
    intent: 'housing_management',
    responses: [
      { text: "🏠 **Animal Housing Best Practices:**\n\n🐔 **Poultry Housing:**\n• 1 sq ft per broiler, 2 sq ft per layer\n• Good cross-ventilation (but avoid direct drafts)\n• Use clean, dry litter (wood shavings)\n• Proper lighting: 16 hours light for layers\n\n🐄 **Cattle/Goat Housing:**\n• Dry, shaded area with good drainage\n• Adequate space to prevent overcrowding\n• Easy-to-clean flooring\n• Proper feeding and watering stations\n\n💡 **Key tip:** 80% of disease problems can be traced to poor housing and ventilation. Invest in good housing = save on treatment costs!\n\nNeed specific housing advice for your setup?" }
    ]
  },
  {
    intent: 'mortality',
    responses: [
      { text: "🚨 **Animal Mortality — Urgent Assessment:**\n\nI take this very seriously. Let me help:\n\n🔍 **Tell me right now:**\n1. What animals are dying?\n2. How many have died and over what period?\n3. Any visible symptoms before death?\n4. Did you introduce new animals recently?\n5. Any changes in feed or water source?\n\n⚡ **Immediate Actions:**\n• **Isolate** remaining sick animals from healthy ones\n• **Stop** any medications you're not sure about\n• **Collect** a fresh dead specimen if possible (for examination)\n• **Don't eat** meat from dead animals\n\nThis could be an outbreak. I strongly recommend contacting our emergency vet team:", link: '/contact', linkText: "EMERGENCY VET CONTACT" }
    ]
  }
];

// ── Conversation Memory & Context ──────────────────────────────────

interface ConversationState {
  lastIntent: string | null;
  mentionedAnimals: string[];
  mentionedSymptoms: string[];
  messageCount: number;
  topicsDiscussed: string[];
}

let conversationState: ConversationState = {
  lastIntent: null,
  mentionedAnimals: [],
  mentionedSymptoms: [],
  messageCount: 0,
  topicsDiscussed: []
};

const ANIMAL_KEYWORDS: Record<string, string[]> = {
  'poultry': ['chicken', 'bird', 'broiler', 'layer', 'chick', 'hen', 'rooster', 'poultry', 'birds', 'fowl', 'turkey'],
  'cattle': ['cow', 'cattle', 'bull', 'calf', 'beef', 'dairy', 'heifer'],
  'goat': ['goat', 'kid', 'doe', 'buck'],
  'sheep': ['sheep', 'ram', 'ewe', 'lamb'],
  'pig': ['pig', 'swine', 'piglet', 'sow', 'boar'],
  'dog': ['dog', 'puppy', 'pup'],
  'cat': ['cat', 'kitten'],
  'fish': ['fish', 'catfish', 'tilapia', 'fingerling']
};

const SYMPTOM_KEYWORDS = [
  'sick', 'ill', 'dying', 'dead', 'cough', 'sneez', 'diarrhea', 'diarrhoea',
  'not eating', 'weak', 'letharg', 'bleeding', 'bloody', 'swollen', 'limp',
  'scratch', 'itch', 'rash', 'fever', 'hot', 'discharge', 'mucus', 'vomit',
  'wound', 'sore', 'abscess', 'lameness', 'paralys', 'convuls', 'tremor',
  'loss of appetite', 'weight loss', 'thin', 'emaciated', 'drop in production'
];

function extractAnimals(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [animal, keywords] of Object.entries(ANIMAL_KEYWORDS)) {
    if (keywords.some(k => lower.includes(k))) {
      found.push(animal);
    }
  }
  return found;
}

function extractSymptoms(text: string): string[] {
  const lower = text.toLowerCase();
  return SYMPTOM_KEYWORDS.filter(s => lower.includes(s));
}

// ── Intent Classification Engine ───────────────────────────────────

function classifyIntent(message: string): { intent: string; confidence: number } {
  const lower = message.toLowerCase().trim();
  
  let bestIntent = '';
  let bestScore = 0;
  let bestPriority = 0;

  for (const intent of INTENTS) {
    let intentScore = 0;
    
    for (const pattern of intent.patterns) {
      const patternStr = pattern.join(' ');
      
      // Exact phrase match (highest value)
      if (lower.includes(patternStr)) {
        intentScore += pattern.length * 3;
        continue;
      }
      
      // Individual word matches
      let wordMatches = 0;
      for (const word of pattern) {
        // Check for word stem matching (partial match at start)
        const words = lower.split(/\s+/);
        if (words.some(w => w.startsWith(word) || word.startsWith(w)) || lower.includes(word)) {
          wordMatches++;
        }
      }
      
      if (pattern.length === 1 && wordMatches === 1) {
        intentScore += 2;
      } else if (wordMatches === pattern.length && pattern.length > 1) {
        // All words in a multi-word pattern matched
        intentScore += pattern.length * 2.5;
      } else if (wordMatches > 0) {
        intentScore += wordMatches * 0.5;
      }
    }

    // Weighted by priority to prefer specific intents
    const finalScore = intentScore + (intent.priority * 0.1);

    if (intentScore > 0 && (finalScore > bestScore || (finalScore === bestScore && intent.priority > bestPriority))) {
      bestScore = finalScore;
      bestIntent = intent.name;
      bestPriority = intent.priority;
    }
  }

  // Context from conversation state can boost intents
  if (bestScore === 0 && conversationState.lastIntent) {
    // If no intent found, check if this looks like a follow-up to the previous topic
    const followUpPatterns = [
      'yes', 'yeah', 'sure', 'ok', 'okay', 'tell me more', 'go on',
      'what else', 'more info', 'continue', 'and', 'also', 'what about',
      'how about', 'any other', 'please', 'more'
    ];
    if (followUpPatterns.some(p => lower.includes(p))) {
      return { intent: conversationState.lastIntent, confidence: 0.5 };
    }
  }

  return { intent: bestIntent || 'unknown', confidence: bestScore > 0 ? Math.min(bestScore / 10, 1) : 0 };
}

// ── Smart Context-Aware Response ───────────────────────────────────

function buildContextualResponse(
  message: string,
  intent: string,
  context: ChatContext
): { text: string; link?: string; linkText?: string; card?: DiagnosticCardData; form?: LeadGenFormData; isEmergency?: boolean } {
  
  // Extract entities from this message
  const animals = extractAnimals(message);
  const symptoms = extractSymptoms(message);
  
  // Update conversation state
  conversationState.messageCount++;
  if (animals.length > 0) {
    conversationState.mentionedAnimals = [...new Set([...conversationState.mentionedAnimals, ...animals])];
  }
  if (symptoms.length > 0) {
    conversationState.mentionedSymptoms = [...new Set([...conversationState.mentionedSymptoms, ...symptoms])];
  }
  if (intent !== 'unknown') {
    conversationState.lastIntent = intent;
    if (!conversationState.topicsDiscussed.includes(intent)) {
      conversationState.topicsDiscussed.push(intent);
    }
  }

  // SALES TRAP: If user shows high buying intent (Price/Ordering/Bulk), trigger Lead Gen Form
  if (['pricing', 'ordering', 'partnership', 'product_viramax', 'product_maxitet'].includes(intent) && conversationState.messageCount > 1) {
    // 30% chance or if specific high-intent keywords
    const isHighIntent = message.toLowerCase().includes('how much') || message.toLowerCase().includes('buy') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('order');
    
    if (isHighIntent) {
         return {
             text: "I can definitely help you with that! As an AI agent, I can connect you directly with our sales team for the best factory rates.\n\nCould you fill these quick details so they can contact you immediately with a quote?",
             form: {
                 type: 'lead_capture',
                 title: 'Get Immediate Price Quote',
                 submitLabel: 'Get Quote via WhatsApp',
                 context: `Quote Request for ${intent}`,
                 fields: [
                     { name: 'name', label: 'Your Name', type: 'text' },
                     { name: 'location', label: 'Your Location (State)', type: 'text' },
                     { name: 'animal', label: 'Animal Type', type: 'select', options: ['Poultry', 'Cattle', 'Goats/Sheep', 'Pigs', 'Pets', 'Other'] }
                 ]
             }
         };
    }
  }

  // Handle follow-up conversation with context
  if (intent !== 'unknown' && conversationState.messageCount > 1) {
    // If user mentions animals + symptoms together, give targeted advice
    if (animals.length > 0 && symptoms.length > 0) {
      return buildDiagnosticResponse(animals, symptoms);
    }
    
    // If user just mentions animals after a general question
    if (animals.length > 0 && conversationState.lastIntent === 'farm_help') {
      return buildAnimalSpecificFollowUp(animals);
    }
  }

  // Get response from knowledge base
  const knowledgeEntry = KNOWLEDGE_RESPONSES.find(k => k.intent === intent);
  
  if (knowledgeEntry) {
    const responseIdx = Math.floor(Math.random() * knowledgeEntry.responses.length);
    const response = knowledgeEntry.responses[responseIdx];
    
    let text = response.text;
    
    // Add contextual enhancement based on page
    if (context.page.includes('products') && !intent.startsWith('product_')) {
      text += "\n\n💡 *I see you're browsing our products. Want me to recommend something specific for your needs?*";
    } else if (context.page.includes('emergency') && intent !== 'emergency') {
      text += "\n\n🚨 *If this is an emergency, don't hesitate — our vets are available 24/7 for immediate assistance.*";
    } else if (intent === 'emergency' || context.page.includes('emergency')) {
        return {
            text,
            link: response.link,
            linkText: response.linkText,
            isEmergency: true
        };
    }
    
    // Add insight based on mentioned animals
    if (conversationState.mentionedAnimals.length > 0 && !intent.includes('poultry') && !intent.includes('cattle') && !intent.includes('goat')) {
      const animalStr = conversationState.mentionedAnimals.join(', ');
      text += `\n\n💡 *Since you mentioned ${animalStr}, I can provide specific advice tailored to those animals anytime!*`;
    }
    
    return {
      text,
      link: response.link,
      linkText: response.linkText
    };
  }

  // Smart fallback with conversation context
  return buildSmartFallback(message, context);
}

function buildDiagnosticResponse(
  animals: string[],
  symptoms: string[]
): { text: string; link?: string; linkText?: string; card?: DiagnosticCardData } {
  const animalStr = animals.join(' and ');
  const symptomStr = symptoms.join(', ');
  
  let text = `🔍 **Quick Assessment for your ${animalStr}:**\n\nI've analyzed the symptoms: *${symptomStr}*.`;
  let card: DiagnosticCardData | undefined;

  // Targeted recommendations with Cards
  if (symptoms.some(s => ['cough', 'sneez', 'breathing', 'respiratory', 'discharge', 'mucus'].includes(s))) {
    text += "\n\nBased on these signs, I suspect a **Respiratory Infection**.";
    card = {
      type: 'diagnostic',
      title: 'Respiratory Health Alert',
      symptom: 'Respiratory Distress',
      probableCause: 'CRD or Pneumonia',
      severity: 'high',
      confidence: 0.89,
      recommendations: [
        { product: 'Maxitet', action: 'Treats bacterial infection' },
        { product: 'Maxi Vitaconc', action: 'Boosts immunity recovery' }
      ]
    };
  }
  
  else if (symptoms.some(s => ['diarrhea', 'diarrhoea', 'bloody', 'bleeding'].includes(s))) {
    if (animals.includes('poultry') && (symptoms.includes('bloody') || symptoms.includes('bleeding'))) {
         text += "\n\n⚠️ **Bloody diarrhea is a classic sign of Coccidiosis.** This requires immediate attention.";
         card = {
            type: 'diagnostic',
            title: 'Coccidiosis Warning',
            symptom: 'Bloody Diarrhea',
            probableCause: 'Eimeria (Coccidia)',
            severity: 'critical',
            confidence: 0.95,
            recommendations: [
                { product: 'Maxicocc', action: 'Stops bleeding fast' },
                { product: 'Maxi Vitaconc', action: 'Restores lost vitamins' }
            ]
         };
    } else {
        text += "\n\nDigestive issues can dehydrate animals quickly.";
        card = {
            type: 'diagnostic',
            title: 'Digestive Disturbance',
            symptom: 'Diarrhea / Scours',
            probableCause: 'Bacterial Enteritis',
            severity: 'medium',
            confidence: 0.75,
            recommendations: [
                { product: 'Maxitet', action: 'Broad spectrum antibiotic' },
                { product: 'Multi-Vitamins', action: 'Rehydration support' }
            ]
        };
    }
  }
  
  else if (symptoms.some(s => ['scratch', 'itch', 'rash', 'tick', 'lice', 'flea'].includes(s))) {
    text += "\n\nParasites are likely the cause.";
    card = {
        type: 'diagnostic',
        title: 'Parasite Detected',
        symptom: 'Skin / External Parasites',
        probableCause: 'Ticks, Lice, or Mites',
        severity: 'medium',
        confidence: 0.92,
        recommendations: [
            { product: 'Ectomax Spray', action: 'Kills parasites on contact' }
        ]
    };
  }

  else if (symptoms.some(s => ['not eating', 'weak', 'letharg', 'loss of appetite'].includes(s))) {
    text += "\n\nGeneral weakness is a warning sign of many potential issues.";
    card = {
        type: 'diagnostic',
        title: 'General Malaise',
        symptom: 'Loss of Appetite / Weakness',
        probableCause: 'Stress or Early Infection',
        severity: 'medium',
        confidence: 0.65,
        recommendations: [
            { product: 'Maxi Vitaconc', action: 'Immediate energy boost' },
            { product: 'Viramax', action: 'Immune system support' }
        ]
    };
  }

  text += "\n\n⚠️ *This AI assessment is for guidance only. For critical cases, consult a vet.*";

  return { text, link: '/contact', linkText: "Consult a Vet", card };
}

function buildAnimalSpecificFollowUp(animals: string[]): { text: string; link?: string; linkText?: string } {
  const animal = animals[0];
  const responses: Record<string, string> = {
    'poultry': "Great, you're keeping poultry! 🐔 Here's what I can help with:\n\n• **Disease treatment** — Tell me the symptoms\n• **Vaccination schedule** — I'll create one for you\n• **Feeding plans** — Broilers, layers, or breeders\n• **Product recommendations** — Targeted solutions\n\nWhat's the main challenge you're facing with your birds?",
    'cattle': "You have cattle! 🐄 I can assist with:\n\n• **Health programs** — Vaccination & deworming schedules\n• **Disease diagnosis** — Describe symptoms\n• **Tick control** — Essential in Nigeria's climate\n• **Nutrition advice** — For dairy or beef production\n\nWhat do you need help with?",
    'goat': "Goat farming! 🐐 I can help with:\n\n• **Disease treatment** — Tell me what's wrong\n• **Deworming schedules** — Critical for goats\n• **Feeding optimization** — For growth or breeding\n• **PPR vaccination** — Annual protection\n\nWhat's going on with your goats?",
    'sheep': "Sheep farming! 🐑 I can assist with:\n\n• **Health management** — Vaccination & deworming\n• **Parasite control** — Internal and external\n• **Breeding advice** — Optimize your flock\n\nWhat specific help do you need?",
    'pig': "Piggery! 🐷 I can help with:\n\n• **Health management** — Disease prevention\n• **Feeding programs** — For optimal growth\n• **Housing advice** — Best practices\n\nWhat's happening with your pigs?",
    'dog': "Pet care! 🐕 I can help with:\n\n• **Tick & flea treatment** — Ectomax Spray\n• **Deworming** — Regular schedules\n• **Vaccination** — Annual boosters\n\nWhat's going on with your dog?",
    'cat': "Cat care! 🐱 I can assist with:\n\n• **Parasite treatment** — Fleas, ticks, worms\n• **Vaccination** — Core vaccines\n• **General health** — Nutrition and wellness\n\nWhat do you need help with?",
    'fish': "Fish farming! 🐟 I can help with:\n\n• **Water quality** — pH, dissolved oxygen\n• **Disease prevention** — Common fish diseases\n• **Feed optimization** — Growth rates\n\nWhat's your main concern?"
  };

  return {
    text: responses[animal] || `I see you're keeping ${animal}! Tell me more about the challenge you're facing, and I'll provide specific advice.`,
    link: '/services',
    linkText: 'Browse Expert Services'
  };
}

function buildSmartFallback(
  message: string,
  context: ChatContext
): { text: string; link?: string; linkText?: string } {
  const lower = message.toLowerCase();
  
  // Try to understand the nature of the question
  const isQuestion = lower.includes('?') || lower.startsWith('how') || lower.startsWith('what') || 
    lower.startsWith('why') || lower.startsWith('when') || lower.startsWith('where') || lower.startsWith('can') || 
    lower.startsWith('do') || lower.startsWith('is') || lower.startsWith('should');
  
  const hasAnimalContext = conversationState.mentionedAnimals.length > 0;
  
  if (isQuestion && hasAnimalContext) {
    const animalStr = conversationState.mentionedAnimals.join(' and ');
    return {
      text: `That's a great question about your ${animalStr}! While I may not have the exact answer, our veterinary team with 17+ years of experience can definitely help.\n\nHere's what I suggest:\n• **Ask me simpler questions** — like "What products do you recommend for ${conversationState.mentionedAnimals[0]}?"\n• **Describe symptoms** — and I'll try to recommend treatments\n• **Contact our experts** — for detailed, personalized advice\n\nOr try asking about: products, vaccination schedules, feeding plans, or disease symptoms!`,
      link: '/contact',
      linkText: 'Speak to an Expert'
    };
  }

  if (isQuestion) {
    return {
      text: `That's a good question! Let me help you find the right answer. I'm best at helping with:\n\n🐔 **Animal health** — Describe symptoms and I'll recommend treatments\n💊 **Products** — Ask about any of our NAFDAC-approved medicines\n📋 **Farm management** — Feeding, vaccination, housing advice\n🚨 **Emergencies** — Immediate vet support\n📦 **Orders & pricing** — How to buy our products\n\nCould you rephrase your question or tell me which of these areas you need help with?`,
      link: '/services',
      linkText: 'Browse Our Services'
    };
  }

  // General conversational response
  const contextResponses = [
    `I hear you! To give you the best possible advice, could you tell me:\n• **What animals** you're working with?\n• **What challenge** you're facing?\n\nThe more details you share, the better I can help. I'm trained on 17+ years of Divine Agvet's veterinary expertise! 🌿`,
    `Thanks for sharing! I want to make sure I give you the most useful response. Could you elaborate a bit?\n\nFor example:\n• "My chickens are coughing" → I'll recommend specific treatments\n• "I need products for goats" → I'll show you what we have\n• "How do I vaccinate my layers?" → I'll give you a full schedule\n\nI'm here to help! 💪`,
    `I appreciate that! Let me understand better so I can assist you properly.\n\nYou can ask me anything about:\n• 🏥 Animal health & disease treatment\n• 💊 Our product range & recommendations\n• 📞 How to reach our expert vet team\n• 📦 Orders, pricing & delivery\n\nJust describe your situation and I'll guide you! 🙏`
  ];

  return {
    text: contextResponses[Math.floor(Math.random() * contextResponses.length)]
  };
}

// ── Public API ─────────────────────────────────────────────────────

export const generateResponse = (
  message: string, 
  context: ChatContext
): Promise<{ text: string; link?: string; linkText?: string; card?: DiagnosticCardData; form?: LeadGenFormData; isEmergency?: boolean }> => {
  return new Promise((resolve) => {
    // Simulate thinking time — longer for complex messages
    const thinkTime = 600 + Math.min(message.length * 10, 800) + Math.random() * 400;
    
    setTimeout(() => {
      const { intent } = classifyIntent(message);
      const response = buildContextualResponse(message, intent, context);
      resolve(response);
    }, thinkTime);
  });
};

export const getInitialGreeting = (context: ChatContext): string => {
  // Reset conversation state on new chat
  conversationState = {
    lastIntent: null,
    mentionedAnimals: [],
    mentionedSymptoms: [],
    messageCount: 0,
    topicsDiscussed: []
  };

  const hour = new Date().getHours();
  let timeGreeting = "Hello";
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 18) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";

  if (context.page.includes('products')) {
    return `${timeGreeting}! 👋 I see you're browsing our products. I can help you find the perfect NAFDAC-approved solution for your animals.\n\nTell me — what animals do you keep, and what are you looking for?`;
  }
  if (context.page.includes('emergency')) {
    return "🚨 **EMERGENCY DETECTED** — I see you're on our emergency page.\n\nPlease describe what's happening RIGHT NOW and I'll provide immediate guidance while alerting our vet team. Every second counts!\n\n📞 You can also call directly: +234 813 697 2328";
  }
  if (context.page.includes('services')) {
    return `${timeGreeting}! 👋 Welcome to our services page. I can help you understand what we offer and recommend the right service for your farm.\n\nAre you looking for veterinary consultation, vaccination programs, or product supply?`;
  }
  if (context.page.includes('about')) {
    return `${timeGreeting}! 👋 Want to know more about Divine Agvet? We've been serving Nigerian farmers for 17+ years.\n\nFeel free to ask me anything about our company, our mission, or how we can help your farm succeed!`;
  }
  if (context.page.includes('contact')) {
    return `${timeGreeting}! 👋 Looking to reach us? I can help you right here, or connect you with our team.\n\n📞 WhatsApp: +234 813 697 2328 (under 5 min response)\n\nWhat do you need help with?`;
  }
  if (context.page.includes('faq')) {
    return `${timeGreeting}! 👋 I see you're looking at FAQs. I might be able to answer your questions faster!\n\nJust ask me anything about products, orders, delivery, or animal health.`;
  }
  return `${timeGreeting}! 👋 I'm **Agvet AI** — your intelligent veterinary assistant, powered by 17 years of Divine Agvet expertise.\n\nI can help with:\n🐔 Poultry & livestock health\n💊 Product recommendations\n🚨 Emergency vet support\n📦 Orders & delivery\n\nWhat can I help you with today?`;
};
