import { ArrowDown, Check, Focus, Sparkles } from "lucide-react";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { AeroBackdrop } from "@/components/AeroBackdrop";
import { LinkButton } from "@/components/LinkButton";
import { Magnetic } from "@/components/Magnetic";
import { useSmoothScroll } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { links, platform } from "@/siteConfig";

const MacBook = lazy(() =>
  import("@/components/MacBook").then((module) => ({ default: module.MacBook })),
);

function MacBookFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex size-20 items-center justify-center rounded-[28%] border border-navy-900/10 bg-white/60 shadow-soft backdrop-blur">
          <img src="/Gyansetu.png" alt="" className="size-14 rounded-2xl object-cover opacity-80" />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
          Preparing the 3D preview
        </span>
      </div>
    </div>
  );
}

const words = ["Knowledge", "should", "reach", "everyone."];

export function Hero() {
  const { reduced } = useReducedMotion();
  const { scrollToSection } = useSmoothScroll();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
  };
  const word = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      data-theme="light"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32 lg:pb-24"
    >
      <AeroBackdrop />

      <div className="shell relative z-10 grid items-center gap-8 pt-4 sm:gap-10 sm:pt-6 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        <div className="max-w-[39rem]">
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/70 px-3 py-1.5 text-[11px] font-medium tracking-wide text-navy-900 shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-gold-600" aria-hidden="true" />
              Accessibility-first learning
            </span>
            <span className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted sm:inline-flex">
              <span lang="hi" className="font-hindi text-[12px] tracking-normal text-navy-900">
                ज्ञानसेतु
              </span>
              <span className="h-px w-6 bg-navy-900/25" aria-hidden="true" />
              Bridge of knowledge
            </span>
          </motion.div>

          <h1
            id="hero-title"
            data-section-heading
            tabIndex={-1}
            aria-label={`${platform.tagline} ${platform.taglineSecond}`}
            className="mt-6 font-display text-[clamp(2.45rem,6.4vw,4.9rem)] font-medium leading-[0.98] tracking-[-0.03em] text-navy-900 focus:outline-none sm:mt-7"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="flex flex-wrap gap-x-[0.28em]"
                variants={container}
                initial={reduced ? false : "hidden"}
                animate="visible"
              >
                {words.map((item, index) => (
                  <span key={item} className="inline-block overflow-hidden pb-1">
                    <motion.span
                      variants={reduced ? undefined : word}
                      className={
                        index === words.length - 1
                          ? "gold-text inline-block italic"
                          : "inline-block"
                      }
                    >
                      {item}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </span>
            <motion.span
              className="mt-1 block text-[0.72em] font-normal italic text-navy-800"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              We build the bridge.
            </motion.span>
          </h1>

          <motion.p
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {platform.supporting}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Magnetic className="w-full sm:w-auto">
              <LinkButton
                href={links.app}
                label="Open the app"
                size="lg"
                variant="gold"
                className="w-full sm:w-auto"
              />
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <LinkButton
                href={links.extension}
                label="Get the extension"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              />
            </Magnetic>
          </motion.div>

          <motion.ul
            className="mt-7 hidden flex-wrap gap-x-6 gap-y-2.5 sm:flex"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            {["Chrome & Edge", "YouTube · PW · Unacademy", "No tracking"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[12px] font-medium text-muted">
                <Check className="size-3.5 text-gold-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-900/[0.07]" />
            <div className="absolute left-1/2 top-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-600/15" />
            <div className="absolute left-1/2 top-1/2 size-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/20 blur-3xl" />
          </div>

          <div className="relative aspect-[1.12/1] w-full sm:aspect-[1.18/1]">
            <Suspense fallback={<MacBookFallback />}>
              <MacBook />
            </Suspense>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute -right-1 -top-2 hidden items-center gap-2 rounded-2xl border border-navy-900/10 bg-white/85 px-3.5 py-2.5 shadow-soft backdrop-blur-md sm:flex"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-navy-900 text-gold-300">
              <Focus className="size-3.5" />
            </span>
            <span className="text-[11px] font-medium text-navy-900">
              Focus mode
              <span className="ml-2 rounded-full bg-gold-100 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-gold-700">
                on
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("about")}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto hidden w-max items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-navy-900 lg:flex"
      >
        Scroll to learn more
        <ArrowDown className="size-3.5 animate-scroll-cue" aria-hidden="true" />
      </button>

    </section>
  );
}
