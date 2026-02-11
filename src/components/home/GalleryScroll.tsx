import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

interface GalleryScrollProps {
  items: GalleryItem[];
}

const GalleryCard = ({ item, index, scrollYProgress }: { item: GalleryItem; index: number; scrollYProgress: any }) => {
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index % 3) * -50]
  );

  return (
    <motion.div
      style={{ y: yOffset }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1 block">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export const GalleryScroll = ({ items }: GalleryScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative py-24 overflow-hidden bg-slate-900">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">
            Our Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Serving Farmers & Animal Owners
          </h2>
          <p className="text-slate-400 text-lg">
            Trusted veterinary products and expert support for livestock farmers, poultry producers, and animal owners across Nigeria
          </p>
        </motion.div>
      </div>

      {/* Masonry-style gallery */}
      <div className="container mx-auto px-4">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, index) => (
             <GalleryCard key={index} item={item} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
};
