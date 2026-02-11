import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beef, ShieldCheck, ArrowRight, Phone, AlertTriangle, CheckCircle2, MapPin, Send } from "lucide-react";
import InquiryFormModal from "@/components/InquiryFormModal";
import { productContext, consultationContext, serviceContext, partnershipContext, generalContactContext, emergencyContext } from "@/lib/inquiry";
import type { PageContext } from "@/lib/inquiry";

// Product Images
import imgViramax150 from "@/assets/products/viramax-150ml.png";
import imgMaxitet from "@/assets/products/maxitet.png";
import imgViramaxLg from "@/assets/products/viramax-large.png";
import imgEctomax from "@/assets/products/ectomax.png";
import imgMaxiyield from "@/assets/products/maxiyield-dogfood.png";
import imgMaxicocc from "@/assets/products/maxicocc.png";
import imgMaxiceryl from "@/assets/products/maxiceryl.png";
import imgVitaconc from "@/assets/products/maxi-vitaconc.png";

// UI Components
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BentoGrid, BentoCard } from "@/components/home/BentoGrid";

import { ExperienceSection } from "@/components/home/ExperienceSection";
import { BrandedStatsCTA } from "@/components/home/BrandedStatsCTA";
import { ImpactShowcase } from "@/components/home/ImpactShowcase";
import { BrandSolutions } from "@/components/home/BrandSolutions";
import { SmartProductExplorer } from "@/components/home/SmartProductExplorer";

// Data - Contextualized for Nigeria
const products = [
  { name: "Viramax 150ml", category: "Livestock", img: imgViramax150, price: "Available" },
  { name: "Maxitet Antibiotic", category: "Vet Supplies", img: imgMaxitet, price: "Available" },
  { name: "Ectomax Spray", category: "Pet Care", img: imgEctomax, price: "Available" },
  { name: "Maxiyield Food", category: "Nutrition", img: imgMaxiyield, price: "Available" },
  { name: "Maxicocc", category: "Poultry", img: imgMaxicocc, price: "Available" },
  { name: "Viramax Large", category: "Livestock", img: imgViramaxLg, price: "Available" },
];

import imgPoultryHero from "@/assets/generated/poultry-farm.jpg";
import imgLivestockHero from "@/assets/generated/pets-livestock.jpg";
import imgPetsHero from "@/assets/generated/pets-care.jpg";
import imgVetTraining from "@/assets/generated/vet-training.jpg";

const heroSlides = [
  {
    title: "Homegrown Solutions for Nigerian Farms",
    subtitle: "Proudly Manufactured in Ogun State",
    image: imgLivestockHero, // African cattle context
    desc: "We understand the unique challenges of our tropical climate. That's why we formulate veterinary products that actually work here."
  },
  {
    title: "Protect Your Poultry Investment",
    subtitle: "Stop Mortality, Boost Production",
    image: imgPoultryHero, // Poultry
    desc: "From combating Coccidiosis in deep litter systems to boosting egg production in battery cages, we have you covered."
  },
  {
    title: "Authentic Medicines. Zero Compromise.",
    subtitle: "Say No to Fake Drugs",
    image: imgPetsHero, // Farmer/Vet context
    desc: "Direct from the factory to your farm. Trusted by vets and farmers across the nation."
  }
];





const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [inquiryModal, setInquiryModal] = useState<{ context: PageContext; title?: string; subtitle?: string } | null>(null);

  // Preload images
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);
  


  return (
    <div className="bg-background min-h-screen selection:bg-emerald-100">
      
      {/* 1. HERO SECTION: Brand Promise */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-slate-900">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 2.0, ease: "easeInOut" }}
            className="absolute inset-0 bg-slate-900" 
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent z-10" /> 
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center pb-12">
           <motion.div
             key={`text-${currentSlide}`}
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="max-w-3xl"
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-900/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <MapPin size={12} className="text-emerald-500" />
                {heroSlides[currentSlide].subtitle}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.05] drop-shadow-xl">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-200 font-normal max-w-2xl mb-10 leading-relaxed drop-shadow-md border-l-4 border-emerald-500 pl-6">
                {heroSlides[currentSlide].desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => setInquiryModal({ context: consultationContext(), title: "Speak to a Consultant", subtitle: "Tell us about your needs and our vet team will get back to you." })}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                >
                  <Phone size={20} /> Speak to a Consultant
                </button>
                <button 
                  onClick={() => {
                      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-lg font-bold text-lg hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  View Product Catalog <ArrowRight size={20} />
                </button>
              </div>
           </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? "w-12 bg-emerald-500" : "w-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. THE PROBLEM: The Nigerian Context */}
      <SectionWrapper background="white" className="relative overflow-hidden">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
               <img 
                 src={imgVetTraining}
                 alt="Veterinarian Training Farmers"
                 className="relative z-10 rounded-2xl shadow-2xl skew-y-1 transform transition-transform duration-700 hover:skew-y-0"
               />
            </div>
            
            <div className="order-1 md:order-2">
               <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm mb-4 block">The Reality</span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                 Your Farm Deserves <br/>
                 <span className="text-emerald-600">The Real Deal.</span>
               </h2>
               <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-light">
                 <p>
                   We know the struggle. You spend thousands on medication, yet your birds are still dropping, or your cattle aren't gaining weight.
                 </p>
                 <p>
                   <strong>The Market Problem:</strong> Our industry is flooded with diluted drugs, fake imports, and products not designed for our harsh tropical environment. Using them isn't just a waste of money—it risks your entire flock and future.
                 </p>
                 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                    <p className="font-bold text-red-800 mb-1 flex items-center gap-2">
                       <AlertTriangle size={18} /> don't Gamble with Health
                    </p>
                    <p className="text-red-700 text-sm">
                       Every day you use unverified products, you risk disease outbreaks that can wipe out months of hard work.
                    </p>
                 </div>
               </div>
            </div>
         </div>
         
         <BrandSolutions />
      </SectionWrapper>

      {/* 3. THE EXPERIENCE: Why Choose Us */}
      <ExperienceSection />

      {/* 4. THE PRODUCT ECOSYSTEM: Bento Grid Refined */}
      <section id="products-section" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div className="max-w-2xl">
                <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-2 block">Our Solutions</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                   Essential Veterinary Tools
                </h2>
                <p className="text-lg text-slate-600">
                   Proprietary formulations aimed at maximum productivity and disease control.
                </p>
             </div>
             <button 
                onClick={() => setInquiryModal({ context: productContext("Product Price List", "All"), title: "Request Price List", subtitle: "Fill in your details and we'll send you our complete price list." })}
                className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-xl"
             >
                Request Price List <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
             </button>
          </div>

          <BentoGrid>
             {/* Key Highlight: Maxiyield */}
             <BentoCard
               title="Maxiyield Premium"
               subtitle="The Ultimate Growth Promoter"
               description="A powerful blend of amino acids and vitamins designed to boost weight gain in broilers and recovery in stressed livestock."
               image={imgMaxiyield}
               className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-emerald-900 to-slate-900"
               onClick={() => setInquiryModal({ context: productContext("Maxiyield Premium", "Nutrition") })}
             />

             {/* Categories */}
             <BentoCard
               title="Preventive Care"
               subtitle="Vaccines & Prophylaxis"
               description="Protect your farm before disease strikes."
               icon={ShieldCheck}
               className="lg:col-span-1 lg:row-span-1 bg-emerald-700 text-white"
               onClick={() => setInquiryModal({ context: productContext("Preventive Medicines", "Vet Supplies"), title: "Preventive Care Inquiry" })}
             />
             
             <BentoCard
               title="Poultry Solutions"
               subtitle="Coccidiosis & CRD"
               description="Specialized treatments for common poultry infections."
               icon={Beef} // You might want a feather/bird icon here if available
               className="lg:col-span-1 lg:row-span-1 bg-amber-600 text-white"
               onClick={() => setInquiryModal({ context: productContext("Poultry Solutions", "Livestock"), title: "Poultry Solutions Inquiry" })}
             />

             {/* Featured Products */}
             <BentoCard
               title="Viramax Concentrate"
               subtitle="Heavy Duty Disinfectant"
               image={imgViramax150}
               className="lg:col-span-1 lg:row-span-1 bg-blue-700"
               onClick={() => setInquiryModal({ context: productContext("Viramax Concentrate", "Livestock") })}
             />

             <BentoCard
               title="Consult Our Vet"
               subtitle="Direct WhatsApp Support"
               description="Get dosage advice and diagnosis assistance."
               icon={Phone}
               className="lg:col-span-1 lg:row-span-1 bg-slate-100 text-slate-900"
               onClick={() => setInquiryModal({ context: consultationContext(), title: "Consult Our Vet", subtitle: "Get dosage advice and diagnosis assistance from our experts." })}
             />
          </BentoGrid>
        </div>
      </section>

{/* 5. PRODUCT SCROLL: "The Collection" - Replaced by Smart Explorer */}
      <SmartProductExplorer 
        products={products} 
        onInquiry={(p) => setInquiryModal({ context: productContext(p.name, p.category) })} 
        onEmergency={() => setInquiryModal({ context: emergencyContext(), title: "Emergency Response", subtitle: "We detected an urgent query. Our vet team is on standby." })}
      />



      {/* 7. PROOF & IMPACT: Storytelling */}
      <ImpactShowcase />

      <SectionWrapper background="white" className="pb-0">
          <BrandedStatsCTA onInquiry={(type) => {
            if (type === 'partnership') {
                setInquiryModal({ context: partnershipContext() });
            } else if (type === 'product_order') {
                setInquiryModal({ context: productContext("General Order", "All") });
            } else {
                setInquiryModal({ context: generalContactContext() });
            }
          }} />
      </SectionWrapper>

      {/* Intelligent Inquiry Modal */}
      {inquiryModal && (
        <InquiryFormModal
          isOpen={!!inquiryModal}
          onClose={() => setInquiryModal(null)}
          context={inquiryModal.context}
          title={inquiryModal.title}
          subtitle={inquiryModal.subtitle}
        />
      )}

    </div>
  );
};

export default HomePage;
