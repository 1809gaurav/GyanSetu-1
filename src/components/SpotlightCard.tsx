import { useSpotlight, useFinePointer } from "@/hooks/useSpotlight";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Card with a soft gold spotlight that follows the pointer.
 * Falls back to a plain card on touch devices and reduced motion.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { reduced } = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;
  const { style, onPointerMove } = useSpotlight<HTMLDivElement>(enabled);

  return (
    <div
      className={cn(
        "spotlight-card rounded-3xl border border-navy-900/10 bg-white/70 p-6 shadow-soft backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500",
        "hover:-translate-y-0.5 hover:border-gold-600/30 hover:shadow-lift",
        className,
      )}
      style={enabled ? style : undefined}
      onPointerMove={enabled ? onPointerMove : undefined}
    >
      {children}
    </div>
  );
}
