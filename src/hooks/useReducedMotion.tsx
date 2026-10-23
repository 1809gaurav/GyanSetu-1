import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type MotionPreference = "system" | "reduce" | "full";

interface MotionPrefs {
  /** Effective value: system preference OR an explicit choice. */
  reduced: boolean;
  choice: MotionPreference;
  systemReduced: boolean;
  setReduced: (reduced: boolean) => void;
  resetToSystem: () => void;
}

const MotionPrefsContext = createContext<MotionPrefs | null>(null);
const STORAGE_KEY = "gyansetu:motion";

function readStored(): MotionPreference {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "reduce" || value === "full") return value;
  } catch {
    /* storage can be blocked */
  }
  return "system";
}

export function MotionPrefsProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<MotionPreference>(readStored);
  const [systemReduced, setSystemReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const reduced = choice === "reduce" || (choice === "system" && systemReduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    try {
      if (choice === "system") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
  }, [choice, reduced]);

  const setReduced = useCallback((value: boolean) => {
    setChoice(value ? "reduce" : "full");
  }, []);

  const resetToSystem = useCallback(() => setChoice("system"), []);

  const value = useMemo(
    () => ({ reduced, choice, systemReduced, setReduced, resetToSystem }),
    [reduced, choice, systemReduced, setReduced, resetToSystem],
  );

  return <MotionPrefsContext.Provider value={value}>{children}</MotionPrefsContext.Provider>;
}

export function useReducedMotion() {
  const context = useContext(MotionPrefsContext);
  if (!context) throw new Error("useReducedMotion must be used inside MotionPrefsProvider");
  return context;
}
