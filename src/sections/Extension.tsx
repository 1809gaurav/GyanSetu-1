import {
  Captions,
  Eye,
  Focus,
  Globe,
  Keyboard,
  LockKeyhole,
  Maximize2,
  Mic,
  MonitorPlay,
  Sun,
  Type,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { Keycap } from "@/components/Keycap";
import { LinkButton } from "@/components/LinkButton";
import { Badge } from "@/components/ui/badge";
import { capabilities, shortcuts, links } from "@/siteConfig";
import { motion } from "framer-motion";

const counts = capabilities.reduce(
  (acc, capability) => {
    acc[capability.status] += 1;
    return acc;
  },
  { live: 0, beta: 0, planned: 0 },
);

const capabilityIcons: Record<string, LucideIcon> = {
  "Read Screen": Eye,
  "Voice commands": Mic,
  "Focus mode": Focus,
  "Reading themes": Sun,
  "Large control bar": Maximize2,
  "Auto captions": Captions,
  "Physics Wallah & Unacademy tuning": MonitorPlay,
  "Dyslexia-friendly fonts": Type,
  "Live captions & sound alerts": Volume2,
};

export function Extension() {
  return (
    <Section id="extension" labelledBy="extension-title" className="overflow-hidden bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-paper-deep/40 via-paper to-paper" />
        <div className="absolute -right-40 top-24 size-[30rem] rounded-full bg-gold-300/15 blur-[110px]" />
      </div>

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <SectionHeading
            eyebrow="03 — Our extension"
            id="extension-title"
            title={
              <>
                Your lectures, <span className="italic text-gold-700">reshaped.</span>
              </>
            }
            description="A Chrome and Edge extension that applies the profile you saved in the app. Full support on YouTube; basic support on Physics Wallah and Unacademy."
          />

          <Reveal delay={0.1} className="lg:pb-1">
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <Badge variant="outline" className="gap-2 px-3 py-1.5 text-[11px]">
                <Globe className="size-3.5 text-gold-700" aria-hidden="true" />
                Chrome
              </Badge>
              <Badge variant="outline" className="gap-2 px-3 py-1.5 text-[11px]">
                <MonitorPlay className="size-3.5 text-gold-700" aria-hidden="true" />
                Edge
              </Badge>
              <span className="h-4 w-px bg-navy-900/15" aria-hidden="true" />
              <span className="text-[11px] text-muted">
                {counts.live} live · {counts.beta} beta · {counts.planned} planned
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="rounded-3xl border border-navy-900/10 bg-white/75 p-6 shadow-soft">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  Install
                </p>
                <h3 className="mt-3 font-display text-2xl text-navy-900">Add it to your browser</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Sign in to the app first so the extension has a profile to apply. Supports Chrome
                  and Edge on desktop.
                </p>
                <div className="mt-5">
                  <LinkButton
                    href={links.extension}
                    label="Get the extension"
                    size="lg"
                    variant="gold"
                    className="w-full"
                  />
                </div>
                <p className="mt-4 flex items-center gap-2 text-[11px] text-muted">
                  <LockKeyhole className="size-3.5 text-gold-700" aria-hidden="true" />
                  Your profile stays yours. The extension asks before reading anything.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-navy-900/10 bg-paper-deep/60 p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                    <Keyboard className="size-3.5" aria-hidden="true" /> Shortcuts
                  </p>
                  <span className="text-[10px] text-muted/80">single key</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                  {shortcuts.map(({ keys, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      {keys.map((key) => (
                        <Keycap key={key}>{key}</Keycap>
                      ))}
                      <dt className="sr-only">{label}</dt>
                      <dd className="text-[11px] leading-tight text-muted">{label}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-navy-900/10 pt-3 text-[11px] leading-relaxed text-muted">
                  These can be switched off in the extension, and never fire while you are typing.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-3xl border border-gold-600/25 bg-gold-100/60 p-5">
                <p className="flex items-start gap-3 text-[12px] leading-relaxed text-navy-800">
                  <LockKeyhole className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
                  A lecture frame is sent to an AI provider only when you ask Read Screen to read it,
                  and Gyaansetu does not store it.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[1.75rem] border border-navy-900/10 bg-white/70 shadow-soft backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4 border-b border-navy-900/10 bg-white/60 px-6 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  Capabilities
                </p>
                <p className="text-[10px] text-muted/80">as shipped today</p>
              </div>
              <Stagger className="divide-y divide-navy-900/[0.07]">
                {capabilities.map((capability) => {
                  const Icon = capabilityIcons[capability.name] ?? Eye;
                  return (
                  <motion.div
                    key={capability.name}
                    variants={staggerItem}
                    className="group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-paper/70"
                  >
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-navy-900/10 bg-paper text-navy-800">
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-medium text-navy-900">{capability.name}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                        {capability.detail}
                      </p>
                    </div>
                    <StatusBadge status={capability.status} className="mt-1 shrink-0" />
                  </motion.div>
                  );
                })}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
