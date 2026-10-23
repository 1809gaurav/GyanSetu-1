import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Info, Mail, Puzzle, Smartphone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSmoothScroll } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", label: "Home", Icon: Home },
  { id: "about", label: "About", Icon: Info },
  { id: "app", label: "App", Icon: Smartphone },
  { id: "extension", label: "Extension", Icon: Puzzle },
  { id: "contact", label: "Contact", Icon: Mail },
] as const;

export function FloatingDock() {
  const active = useActiveSection();
  const { scrollToSection } = useSmoothScroll();
  const { reduced } = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav aria-label="Sections" className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-center">
      <div className="safe-bottom pointer-events-auto px-4 pb-3 sm:pb-5">
        <motion.ul
          className="flex items-end gap-1 rounded-[26px] border border-navy-900/10 bg-paper/85 p-2 shadow-dock backdrop-blur-2xl sm:gap-1.5"
          initial={reduced ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map(({ id, label, Icon }) => {
            const isActive = active === id;
            const isHovered = hovered === id;

            return (
              <li key={id} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(id);
                      }}
                      onPointerEnter={() => setHovered(id)}
                      onPointerLeave={() => setHovered(null)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      aria-label={label}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative flex size-11 flex-col items-center justify-center rounded-2xl transition-colors duration-300 sm:size-12",
                        isActive
                          ? "bg-navy-900 text-gold-300"
                          : "text-navy-900/65 hover:bg-navy-900/[0.06] hover:text-navy-900",
                      )}
                    >
                      <motion.span
                        animate={
                          reduced
                            ? undefined
                            : { scale: isHovered ? 1.32 : 1, y: isHovered ? -3 : 0 }
                        }
                        transition={{ type: "spring", stiffness: 380, damping: 22 }}
                        className="flex items-center justify-center"
                      >
                        <Icon className="size-5" aria-hidden="true" strokeWidth={1.8} />
                      </motion.span>
                      <motion.span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 size-1 rounded-full",
                          isActive ? "bg-gold-400" : "bg-transparent",
                        )}
                        animate={reduced ? undefined : { scale: isActive ? 1 : 0 }}
                      />
                      <span className="sr-only">{label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">{label}</TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </nav>
  );
}
