import { Header } from "@/components/Header";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { AppShowcase } from "@/sections/AppShowcase";
import { Extension } from "@/sections/Extension";
import { Contact } from "@/sections/Contact";
import { MotionPrefsProvider } from "@/hooks/useReducedMotion";
import { SmoothScrollProvider } from "@/hooks/useLenis";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";

function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main");
        if (main) {
          if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:inline-flex focus:items-center focus:gap-2 focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:text-paper focus:shadow-lift"
    >
      Skip to content
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function Page() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <AppShowcase />
        <Extension />
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <MotionPrefsProvider>
      <TooltipProvider delayDuration={120} skipDelayDuration={0}>
        <SmoothScrollProvider>
          <Page />
        </SmoothScrollProvider>
      </TooltipProvider>
    </MotionPrefsProvider>
  );
}
