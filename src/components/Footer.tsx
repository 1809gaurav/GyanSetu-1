import { ArrowUp, ArrowUpRight } from "lucide-react";
import { LogoMark, Wordmark } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { Switch } from "@/components/ui/switch";
import { useSmoothScroll } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { externalLinkProps, isReadyLink } from "@/lib/links";
import { links, platform } from "@/siteConfig";
import { cn } from "@/lib/utils";

function FooterLink({
  label,
  id,
  href,
  onNavigate,
}: {
  label: string;
  id?: string;
  href?: string;
  onNavigate: (id: string) => void;
}) {
  if (id) {
    return (
      <a
        href={`#${id}`}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(id);
        }}
        className="link-underline w-max py-1 text-[13px] text-paper/65 transition-colors hover:text-paper"
      >
        {label}
      </a>
    );
  }

  const ready = isReadyLink(href, { isDev: import.meta.env.DEV });

  if (!ready) {
    return (
      <span
        aria-disabled="true"
        tabIndex={0}
        title="Link coming soon"
        className="flex w-max items-center gap-2 py-1 text-[13px] text-paper/30"
      >
        {label}
        <span className="rounded-full border border-paper/15 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-paper/35">
          soon
        </span>
        <span className="sr-only">Link coming soon</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      {...externalLinkProps}
      className="link-underline inline-flex w-max items-center gap-1.5 py-1 text-[13px] text-paper/65 transition-colors hover:text-paper"
    >
      {label}
      <ArrowUpRight className="size-3" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { scrollToSection, scrollToTop } = useSmoothScroll();
  const { reduced, setReduced } = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-paper" data-theme="dark">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 size-[28rem] rounded-full bg-gold-500/10 blur-[120px]"
      />

      <div className="shell relative pb-32 pt-16 sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-5xl md:border-x md:border-paper/10">
          <div className="grid gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr] md:gap-6 md:p-8">
            <div className="flex flex-col gap-5">
              <a
                href="#home"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("home");
                }}
                className="flex w-max items-center gap-3"
                aria-label="Gyaansetu — back to top"
              >
                <LogoMark size={42} />
                <Wordmark tone="light" />
              </a>
              <p className="max-w-xs text-[12.5px] leading-relaxed text-paper/50">
                {platform.tagline} {platform.taglineSecond} An accessibility layer for Indian
                learners.
              </p>
              <SocialLinks tone="dark" />
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-paper/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-paper/45">
                <span className="size-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                Independent accessibility tool
              </span>
            </div>

            <nav aria-label="Footer sections" className="flex flex-col gap-2">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-paper/35">Explore</p>
              <FooterLink label="About us" id="about" onNavigate={scrollToSection} />
              <FooterLink label="Our app" id="app" onNavigate={scrollToSection} />
              <FooterLink label="Extension" id="extension" onNavigate={scrollToSection} />
              <FooterLink label="Contact" id="contact" onNavigate={scrollToSection} />
            </nav>

            <nav aria-label="Footer destinations" className="flex flex-col gap-2">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-paper/35">Product</p>
              <FooterLink label="Open the app" href={links.app} onNavigate={scrollToSection} />
              <FooterLink
                label="Get the extension"
                href={links.extension}
                onNavigate={scrollToSection}
              />
              <FooterLink label="Privacy" href={links.privacy} onNavigate={scrollToSection} />
              <FooterLink label="GitHub" href={links.github} onNavigate={scrollToSection} />
            </nav>
          </div>

          <div className="border-t border-paper/10 px-0 py-5 md:px-8">
            <p className="text-[11px] leading-relaxed text-paper/40">
              Gyaansetu is an independent accessibility tool and is not affiliated with Physics
              Wallah, Unacademy or YouTube.
            </p>
          </div>

          <div className="flex flex-col gap-5 border-t border-paper/10 px-0 py-6 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-paper/40">
              <p>© {year} Gyaansetu. All rights reserved.</p>
              <span className="hidden h-3 w-px bg-paper/15 sm:block" aria-hidden="true" />
              <p>Made for Indian classrooms</p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2.5">
                <label
                  htmlFor="reduce-motion"
                  className="cursor-pointer text-[11px] text-paper/55"
                >
                  Reduce motion
                </label>
                <Switch
                  id="reduce-motion"
                  checked={reduced}
                  onCheckedChange={setReduced}
                  aria-describedby="reduce-motion-note"
                />
                <span id="reduce-motion-note" className="sr-only">
                  Turns off smooth scrolling, the 3D motion, background animation and cursor
                  follower. Stored in this browser.
                </span>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full border border-paper/15 text-paper/60",
                  "transition-colors hover:border-gold-300/50 hover:text-paper",
                )}
                aria-label="Back to top"
              >
                <ArrowUp className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10 select-none" aria-hidden="true">
          <p className="bg-gradient-to-b from-paper/[0.10] to-paper/[0.015] bg-clip-text text-center font-display text-[clamp(3rem,12vw,9rem)] font-medium leading-none tracking-[-0.04em] text-transparent">
            Gyaansetu
          </p>
          <p
            lang="hi"
            className="mt-1 text-center font-hindi text-[11px] tracking-[0.5em] text-paper/20"
          >
            ज्ञानसेतु
          </p>
        </div>
      </div>
    </footer>
  );
}
