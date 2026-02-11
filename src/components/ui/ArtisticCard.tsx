import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ElementType } from "react";
import { cn } from "@/lib/utils";

interface ArtisticCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  icon?: ElementType;
  className?: string;
  variant?: "hero" | "feature" | "compact" | "glass";
  onClick?: () => void;
  cta?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const ArtisticCard = ({
  title,
  subtitle,
  image,
  icon: Icon,
  className,
  variant = "feature",
  onClick,
  cta,
  delay = 0,
  style,
}: ArtisticCardProps) => {
  const isHero = variant === "hero";
  const isCompact = variant === "compact";
  const isGlass = variant === "glass";

  return (
    <motion.div
      style={style}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer",
        isHero
          ? "col-span-full min-h-[500px] border-transparent shadow-2xl"
          : "shadow-sm hover:shadow-xl",
        // Default white background only if no specific variant overrides it or if it's a standard feature card
        (!isHero && !isGlass && !className?.includes("bg-")) && "bg-white border-gray-100",
        isCompact && "p-6 flex flex-col justify-between",
        isGlass && "backdrop-blur-md bg-white/70 border-white/20 shadow-glass",
        className
      )}
      onClick={onClick}
    >
      {/* Image Layer */}
      {image && (
        <div className={cn("absolute inset-0 z-0 overflow-hidden", isCompact ? "h-32 relative -mx-6 -mt-6 mb-4 rounded-b-none" : "")}>
          <img
            src={image}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
              isHero && "brightness-90"
            )}
          />
          {!isCompact && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
          )}
        </div>
      )}

      {/* Content Layer */}
      <div
        className={cn(
          "relative z-10 flex flex-col h-full",
          isHero ? "justify-end p-12 text-white" : "p-8",
          isCompact && "p-0"
        )}
      >
        {Icon && (
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Icon size={24} />
          </div>
        )}

        <h3
          className={cn(
            "font-bold tracking-tight mb-2 group-hover:text-primary transition-colors",
            isHero ? "text-4xl md:text-5xl text-white group-hover:text-white" : "text-xl text-gray-900"
          )}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            className={cn(
              "text-base leading-relaxed mb-6",
              isHero ? "text-white/90 max-w-xl text-lg" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}

        {cta && (
          <div className={cn("mt-auto flex items-center gap-2 font-medium", isHero ? "text-white" : "text-primary")}>
            {cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
