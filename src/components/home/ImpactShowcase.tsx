import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Import LOCAL product images - these WILL load
import imgMaxicocc from "@/assets/products/maxicocc.png";
import imgMaxitet from "@/assets/products/maxitet.png";
import imgEctomax from "@/assets/products/ectomax.png";
import imgMaxiyield from "@/assets/products/maxiyield-dogfood.png";
import imgViramax from "@/assets/products/viramax-150ml.png";
import imgMaxiceryl from "@/assets/products/maxiceryl.png";
import imgPetsCare from "@/assets/generated/pets-care.jpg";
import imgPoultryFarm from "@/assets/generated/poultry-farm.jpg";
import imgPetsLivestock from "@/assets/generated/pets-livestock.jpg";

interface ImpactStory {
  title: string;
  category: string;
  description: string;
  productImages: string[];
  bgGradient: string;
  features: string[];
  backgroundImage?: string;
}

const stories: ImpactStory[] = [
  {
    category: "Poultry Farming",
    title: "Optimizing Flocks, Maximizing Profits",
    description: "In the Nigerian poultry business, mortality is the enemy. Our specialized range of antibiotics, coccidiostats, and growth promoters ensures your layers and broilers stay healthy from day-old to market weight.",
    productImages: [imgMaxicocc, imgMaxitet, imgMaxiceryl],
    bgGradient: "from-emerald-800 via-emerald-900 to-slate-900",
    backgroundImage: imgPoultryFarm,
    features: ["Coccidiosis Control", "Egg Production Boosters", "Broiler Growth Promoters"]
  },
  {
    category: "Pets & Livestock",
    title: "Care for Every Animal",
    description: "From guarding dogs to grazing cattle, we provide the essential care they need. Our dewormers, tick treatments, and nutritional supplements are formulated for the local environment.",
    productImages: [imgMaxiyield, imgEctomax],
    bgGradient: "from-blue-800 via-blue-900 to-slate-900",
    backgroundImage: imgPetsLivestock,
    features: ["Pet Nutrition & Care", "Tick & Flea Control", "Livestock Deworming"]
  },
  {
    category: "Veterinary Products",
    title: "Trusted Nigerian Formulations",
    description: "We don't just import; we understand the science. Our NAFDAC-approved veterinary drugs are manufactured to combat local disease strains effectively.",
    productImages: [imgViramax, imgMaxitet, imgMaxicocc],
    bgGradient: "from-amber-800 via-amber-900 to-slate-900",
    features: ["Antibiotics & Injectables", "Vitamin Supplements", "Disinfectants"]
  }
];

export const ImpactShowcase = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest"
            >
                Our Impact Story
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mt-6 mb-6 leading-tight"
            >
                Empowering Every Scale of <span className="text-emerald-500">Agriculture</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg leading-relaxed"
            >
                We don't just sell products; we provide tailored solutions for the specific challenges faced by Nigerian farmers and veterinarians.
            </motion.p>
        </div>

        <div className="space-y-24">
            {stories.map((story, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}
                >
                    {/* Product Showcase Visual */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className={`relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br ${story.bgGradient} border border-white/10 shadow-2xl ${story.backgroundImage ? '' : 'p-8'} flex items-center justify-center`}>
                            {story.backgroundImage ? (
                              <>
                                {/* Full Background Image */}
                                <img 
                                  src={story.backgroundImage} 
                                  alt={story.category}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                              </>
                            ) : (
                              <>
                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                                
                                {/* Product Images Display */}
                                <div className="relative z-10 flex items-center justify-center gap-[-20px]">
                                    {story.productImages.map((img, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (i * 0.15) }}
                                            className="relative"
                                            style={{ 
                                                zIndex: story.productImages.length - i,
                                                marginLeft: i > 0 ? '-30px' : '0',
                                                transform: `rotate(${(i - Math.floor(story.productImages.length / 2)) * 8}deg)`
                                            }}
                                        >
                                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl hover:scale-110 transition-transform duration-300 group-hover:shadow-2xl">
                                                <img 
                                                    src={img} 
                                                    alt={story.category}
                                                    className="h-32 md:h-44 object-contain drop-shadow-lg"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                              </>
                            )}
                            
                            {/* Category Label */}
                            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/80 border border-white/10">
                                {story.category}
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-emerald-500"></span>
                            <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">{story.category}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            {story.title}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 border-l-2 border-emerald-500/20 pl-6">
                            {story.description}
                        </p>
                        <ul className="space-y-4 mb-8">
                            {story.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                    <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="flex items-center gap-2 text-white font-bold hover:text-emerald-400 transition-colors group">
                            Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
