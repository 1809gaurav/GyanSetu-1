import { useEffect, useState } from "react";
import { sectionIds, type SectionId } from "@/siteConfig";

/**
 * Tracks which section currently owns the viewport.
 * A narrow horizontal band around the middle of the screen makes the
 * dock highlight feel deliberate rather than jumpy.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let next: SectionId = active;
        let best = 0;
        visibility.forEach((value, id) => {
          if (value > best) {
            best = value;
            next = id as SectionId;
          }
        });

        if (best > 0) setActive(next);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}
