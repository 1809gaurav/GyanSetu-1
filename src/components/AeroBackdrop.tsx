import { Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const AeroShards = lazy(() => import("@/components/AeroShards/AeroShards"));

function useIdleReady(delay = 700) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setReady(true);
    };
    const timer = window.setTimeout(() => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (idle) idle(start);
      else start();
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [delay]);

  return ready;
}

/**
 * The AeroShards field, loaded after first paint. A painted gradient sits
 * underneath permanently, so WebGPU-less browsers (and reduced-motion users)
 * still get the atmosphere.
 */
export function AeroBackdrop({ className }: { className?: string }) {
  const { reduced } = useReducedMotion();
  const ready = useIdleReady();
  const [failed, setFailed] = useState(false);
  const [count, setCount] = useState(1000);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    setCount(mobile ? 480 : 1100);
  }, []);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_8%,#F6E7BF_0%,#FAF7F1_46%,#F7F2E7_100%)]" />
      <div className="absolute -right-24 top-10 size-[34rem] rounded-full bg-gold-300/20 blur-[120px]" />
      <div className="absolute -left-32 bottom-0 size-[28rem] rounded-full bg-navy-900/[0.05] blur-[100px]" />

      {!reduced && ready && !failed && (
        <div className="absolute inset-0 opacity-75">
          <Suspense fallback={null}>
            <AeroShards
              shardColor="#E3C57C"
              accentColor="#C9834A"
              backgroundColor="transparent"
              lightMode
              placement="full"
              material="chrome"
              markers="dots"
              count={count}
              depthOfField={0.75}
              vignette={0.22}
              glow={0.28}
              grain={0.04}
              scale={1.05}
              mouseInteraction
              pulseOnClick
              holdToGather
              mouseStrength={0.5}
              twist={1.3}
              speed={0.9}
              dpr={1.5}
              onError={(error) => {
                console.warn("[Gyaansetu] AeroShards unavailable; using the static backdrop.", error);
                setFailed(true);
              }}
            />
          </Suspense>
        </div>
      )}

      {/* Legibility veil over the left column, where the copy lives. */}
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/90 to-transparent lg:via-paper/70" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
    </div>
  );
}
