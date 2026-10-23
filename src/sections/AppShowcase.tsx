import {
  Check,
  CloudCheck,
  Download,
  Languages,
  MonitorSmartphone,
  SlidersHorizontal,
  Trash2,
  UserRoundCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { LinkButton } from "@/components/LinkButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { links } from "@/siteConfig";

const bullets = [
  {
    icon: UserRoundCheck,
    title: "A profile in about two minutes",
    body: "Pick the needs that apply to you. Gyaansetu turns them into a working set of defaults.",
  },
  {
    icon: SlidersHorizontal,
    title: "Text, speech and language",
    body: "Text size, speech speed, English (India), Hindi or English (US), and a reading theme that holds up.",
  },
  {
    icon: CloudCheck,
    title: "Previews and connected devices",
    body: "See your settings applied before you commit, then manage devices with a last-synced time.",
  },
  {
    icon: Download,
    title: "Yours to take away",
    body: "Export or delete your data at any time. No dark patterns, no hostage settings.",
  },
];

const languages = ["English (India)", "हिन्दी", "English (US)"];
const themes = [
  { name: "Paper", swatch: "bg-paper", ring: "border-navy-900/20" },
  { name: "High contrast", swatch: "bg-navy-950", ring: "border-navy-900/40" },
  { name: "Yellow on black", swatch: "bg-[#161200]", ring: "border-gold-400/60" },
];

export function AppShowcase() {
  const { reduced } = useReducedMotion();

  return (
    <Section
      id="app"
      labelledBy="app-title"
      tone="dark"
      className="overflow-hidden bg-navy-950 text-paper"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-navy-radial" />
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,196,104,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(232,196,104,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(70% 60% at 60% 40%, black, transparent)",
          }}
        />
        <div className="absolute -left-24 top-1/3 size-[26rem] rounded-full bg-gold-500/10 blur-[120px]" />
      </div>

      <div className="shell relative grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
        <div>
          <SectionHeading
            tone="light"
            eyebrow="02 — Our app"
            id="app-title"
            title={
              <>
                Set it up once.
                <br />
                <span className="italic text-gold-300">It follows you everywhere.</span>
              </>
            }
            description="The web app is the control room: your needs, your reading settings, your connected devices. The extension applies them where you actually study."
          />

          <Stagger className="mt-9 space-y-0 divide-y divide-paper/10 border-y border-paper/10">
            {bullets.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={staggerItem} className="flex gap-4 py-5">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-paper/15 bg-paper/[0.04] text-gold-300">
                  <Icon className="size-4" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-paper">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-paper/55">{body}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href={links.app} label="Open the app" size="lg" variant="gold" />
            <p className="text-[11px] leading-relaxed text-paper/45">
              Runs in the browser.
              <br />
              Nothing to install.
            </p>
          </div>
        </div>

        {/* Product preview */}
        <Reveal delay={0.1} className="relative">
          <p className="sr-only">
            Illustration of the Gyaansetu web app dashboard: reading profile, text size and speech
            speed controls, language and theme choices, a live lecture caption preview, and a
            connected device with a last-synced time.
          </p>

          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-[1.6rem] border border-paper/12 bg-[#071026] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
              <span className="size-2 rounded-full bg-[#E36A5A]/70" />
              <span className="size-2 rounded-full bg-gold-400/70" />
              <span className="size-2 rounded-full bg-[#6FBF8B]/70" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
                Gyaansetu · Dashboard
              </span>
              <span className="ml-auto rounded-full border border-gold-300/25 bg-gold-300/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-gold-200">
                Interface preview
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-[1.05fr_0.95fr] sm:p-5">
              <div className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45">
                    Reading profile
                  </p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-300/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-gold-200">
                    <Check className="size-2.5" /> saved
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-paper/60">Text size</span>
                      <span className="font-mono text-[10px] text-gold-200">18 px</span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-paper/10">
                      <div className="relative h-1 w-[62%] rounded-full bg-gold-400">
                        <span className="absolute -right-1.5 -top-1 size-3 rounded-full border border-navy-950 bg-gold-300" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-paper/60">Speech speed</span>
                      <span className="font-mono text-[10px] text-gold-200">1.15×</span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-paper/10">
                      <div className="relative h-1 w-[44%] rounded-full bg-gold-400">
                        <span className="absolute -right-1.5 -top-1 size-3 rounded-full border border-navy-950 bg-gold-300" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] text-paper/60">
                      <Languages className="size-3" /> Language
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {languages.map((language, index) => (
                        <span
                          key={language}
                          className={
                            index === 0
                              ? "rounded-full border border-gold-300/30 bg-gold-300/10 px-2.5 py-1 text-[10px] text-gold-200"
                              : "rounded-full border border-paper/10 px-2.5 py-1 text-[10px] text-paper/45"
                          }
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-paper/60">Reading theme</p>
                    <div className="mt-2 flex gap-2">
                      {themes.map((theme, index) => (
                        <span
                          key={theme.name}
                          className={`flex size-6 items-center justify-center rounded-lg border ${theme.ring} ${theme.swatch} ${
                            index === 0 ? "ring-2 ring-gold-300/60 ring-offset-2 ring-offset-[#0a1733]" : ""
                          }`}
                        >
                          <span className="sr-only">{theme.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-navy-800 to-navy-950 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-paper/40">
                      Lecture preview
                    </span>
                    <span className="rounded bg-paper/10 px-1.5 py-0.5 text-[9px] text-paper/60">
                      CC on
                    </span>
                  </div>
                  <div className="mt-6 flex h-20 items-end">
                    <p className="text-[12px] leading-snug text-paper/85">
                      The derivative of{" "}
                      <span className="rounded bg-gold-300/20 px-1 text-gold-200">sin x</span> is{" "}
                      <span className="rounded bg-gold-300/20 px-1 text-gold-200">cos x</span>.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                      <span className="ml-0.5 block size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-navy-950" />
                    </span>
                    <div className="h-0.5 flex-1 rounded-full bg-paper/15">
                      <div className="h-0.5 w-1/3 rounded-full bg-gold-400" />
                    </div>
                    <span className="font-mono text-[9px] text-paper/40">04:12</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-paper/40">
                    <MonitorSmartphone className="size-3" /> Connected
                  </p>
                  <p className="mt-2 text-[12px] text-paper/80">Chrome on Windows</p>
                  <p className="mt-0.5 text-[10px] text-paper/35">Synced 2 minutes ago</p>
                </div>

                <div className="flex gap-2">
                  <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-paper/12 py-2 text-[10px] text-paper/55">
                    <Download className="size-3" /> Export
                  </span>
                  <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-paper/12 py-2 text-[10px] text-paper/55">
                    <Trash2 className="size-3" /> Delete
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-6 -left-3 hidden items-center gap-2.5 rounded-2xl border border-gold-300/25 bg-navy-900/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:flex"
            animate={reduced ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-gold-400 text-navy-950">
              <Check className="size-3.5" />
            </span>
            <span className="text-[11px] text-paper/85">
              Preferences saved
              <span className="ml-2 font-mono text-[9px] text-paper/40">across devices</span>
            </span>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
