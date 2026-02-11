import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "subtle" | "dark" | "pattern";
  containerClassName?: string;
}

export const SectionWrapper = ({
  children,
  className,
  background = "white",
  containerClassName,
}: SectionWrapperProps) => {
  const bgStyles = {
    white: "bg-white",
    subtle: "bg-slate-50/50",
    dark: "bg-slate-900 text-white",
    pattern: "bg-slate-50 relative overflow-hidden", // Add pattern overlay logic if needed
  };

  return (
    <section className={cn("py-20 md:py-32", bgStyles[background], className)}>
      {background === "pattern" && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      )}
      <div className={cn("container mx-auto px-6 md:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
};
