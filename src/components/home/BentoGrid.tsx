import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BentoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  image?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  gradient?: string;
}

import { cn } from "@/lib/utils";

export const BentoCard = ({
  title,
  subtitle,
  description,
  icon: Icon,
  image,
  className,
  children,
  onClick,
  gradient = "from-slate-900/80 via-slate-900/50 to-transparent",
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      // Use cn() to merge classes. Default text-white, but allow override.
      className={cn(
        "group relative overflow-hidden rounded-3xl cursor-pointer text-white", 
        className
      )}
      onClick={onClick}
    >
      {/* Background Image */}
      {image && (
        <>
          <div className="absolute inset-0 bg-slate-900" />
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
        </>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {Icon && (
          // Icon container: Inherit text color
          <div className="mb-4 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
            <Icon size={24} />
          </div>
        )}
        
        {subtitle && (
          // Subtitle: Inherit text color, use opacity
          <span className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
            {subtitle}
          </span>
        )}
        
        {/* Title: Inherit text color */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        
        {description && (
          // Description: Inherit text color, use opacity
          <p className="text-sm md:text-base max-w-md opacity-80">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </motion.div>
  );
};

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className = "" }: BentoGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px] ${className}`}>
      {children}
    </div>
  );
};
