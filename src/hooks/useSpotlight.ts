import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks pointer position inside an element for spotlight / tilt effects.
 * Never runs on coarse pointers or when motion is reduced.
 */
export function useSpotlight<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!enabled || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      setPos({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    },
    [enabled],
  );

  return {
    ref,
    style: {
      "--spot-x": `${pos.x}%`,
      "--spot-y": `${pos.y}%`,
    } as React.CSSProperties,
    onPointerMove,
  };
}

/** True only for devices with a precise pointer that can hover. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}
