import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

interface SmoothScrollApi {
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

const HEADER_OFFSET = -96;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { reduced } = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      anchors: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const focusHeading = (target: HTMLElement) => {
    const focusTarget = target.querySelector<HTMLElement>("[data-section-heading], h1, h2");
    if (focusTarget) {
      if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus({ preventScroll: true });
    }
  };

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current) {
      // Focus only after Lenis settles; focusing mid-flight aborts the tween.
      lenisRef.current.scrollTo(target, {
        offset: HEADER_OFFSET,
        duration: 1.15,
        onComplete: () => focusHeading(target),
      });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
      window.scrollTo({ top, behavior: "auto" });
      focusHeading(target);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("home")?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({ scrollToSection, scrollToTop }),
    [scrollToSection, scrollToTop],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  return context;
}
