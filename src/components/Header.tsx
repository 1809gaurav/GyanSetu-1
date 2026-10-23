import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/LinkButton";
import { LogoMark, Wordmark } from "@/components/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSmoothScroll } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { links } from "@/siteConfig";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About" },
  { id: "app", label: "App" },
  { id: "extension", label: "Extension" },
  { id: "contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { scrollToSection } = useSmoothScroll();
  const { reduced } = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="shell">
        <div
          className={cn(
            "relative flex h-16 items-center justify-between gap-4 rounded-full border px-3 transition-all duration-500 sm:px-4",
            scrolled
              ? "border-navy-900/10 bg-paper/95 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              go("home");
            }}
            className="flex items-center gap-2.5 rounded-full pl-1 pr-2"
            aria-label="Gyaansetu — back to top"
          >
            <LogoMark size={36} priority />
            <Wordmark showHindi={false} className="hidden sm:flex" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  active === item.id
                    ? "bg-navy-900/[0.06] text-navy-900"
                    : "text-muted hover:bg-navy-900/[0.04] hover:text-navy-900",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LinkButton
                href={links.app}
                label="Open the app"
                size="sm"
                variant="gold"
                showIcon
              />
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                  aria-expanded={open}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="md:hidden">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Jump to a section of the Gyaansetu website.
                </SheetDescription>
                <div className="flex h-full flex-col gap-8 pt-1">
                  <div className="flex items-center gap-3">
                    <LogoMark size={44} priority />
                    <Wordmark />
                  </div>
                  <nav aria-label="Mobile" className="flex flex-col divide-y divide-navy-900/10 border-y border-navy-900/10">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          go(item.id);
                        }}
                        aria-current={active === item.id ? "true" : undefined}
                        className="flex items-center justify-between py-4 font-display text-2xl text-navy-900"
                      >
                        {item.label}
                        <ArrowUpRight className="size-5 text-gold-600" aria-hidden="true" />
                      </a>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-6">
                    <div className="border-t border-navy-900/10 pt-6">
                      <p className="font-display text-[22px] leading-snug text-navy-900">
                        Knowledge should reach{" "}
                        <span className="italic text-gold-700">everyone.</span>
                      </p>
                      <p className="mt-1 text-xs text-muted">We build the bridge.</p>
                    </div>
                    <LinkButton
                      href={links.app}
                      label="Open the app"
                      size="lg"
                      variant="gold"
                      className="w-full"
                    />
                    <p className="text-xs leading-relaxed text-muted">
                      Gyaansetu is an independent accessibility tool and is not affiliated with
                      Physics Wallah, Unacademy or YouTube.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-4 -bottom-px h-px origin-left bg-gold-500/70"
              style={{ scaleX: progress }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
