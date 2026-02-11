import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const GlassOverlay = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("backdrop-blur-md bg-white/60 border border-white/40 shadow-glass rounded-xl", className)}>
      {children}
    </div>
  );
};
