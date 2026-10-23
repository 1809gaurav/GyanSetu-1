import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFinePointer } from "@/hooks/useSpotlight";

/**
 * Decorative cursor companion. The native cursor is never hidden.
 * A gold dot tracks the pointer tightly; a ring lags behind and swells
 * over interactive elements. It inverts over dark bands for contrast.
 */
export function Cursor() {
  const { reduced } = useReducedMotion();
  const fine = useFinePointer();
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.35 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.35 });
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 260, damping: 24 });
  const darkRef = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      scale.set(interactive ? 2.1 : 1);

      const dark = Boolean(target?.closest("[data-theme='dark']"));
      if (dark !== darkRef.current) {
        darkRef.current = dark;
        if (ringRef.current) {
          ringRef.current.style.borderColor = dark ? "rgba(232,196,104,0.75)" : "rgba(10,22,51,0.38)";
        }
        if (dotRef.current) {
          dotRef.current.style.background = dark ? "#E8C468" : "#8F6C17";
        }
      }
    };

    const onLeave = () => {
      dotX.set(-100);
      dotY.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduced, dotX, dotY, scale]);

  if (!fine || reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110] hidden lg:block">
      <motion.div
        ref={dotRef}
        className="absolute size-1.5 rounded-full"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", background: "#8F6C17" }}
      />
      <motion.div
        ref={ringRef}
        className="absolute size-9 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: scaleSpring,
          borderColor: "rgba(10,22,51,0.38)",
        }}
      />
    </div>
  );
}
