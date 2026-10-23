import {
  Brain,
  Captions,
  Ear,
  Eye,
  EyeOff,
  Hand,
  HeartHandshake,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { motion } from "framer-motion";
import { team, hackathonName } from "@/siteConfig";

const problems = [
  {
    icon: EyeOff,
    title: "Whiteboards a screen reader cannot read",
    body: "Diagrams, handwritten steps and on-screen notes are pixels. Assistive tech has nothing to hold on to.",
  },
  {
    icon: Captions,
    title: "Captions that are missing or weak",
    body: "Auto-captions mishear technical vocabulary, skip speakers, and rarely describe what is happening on screen.",
  },
  {
    icon: MousePointerClick,
    title: "Cluttered pages, tiny controls",
    body: "Sidebars, comments and 12-pixel buttons turn a lecture into a navigation exercise.",
  },
];

const audiences = [
  {
    icon: Eye,
    title: "Blind or low vision",
    barrier: "Video-first teaching with no structure to announce.",
    help: "Read Screen turns a frame into speech; every control is reachable by keyboard.",
  },
  {
    icon: Ear,
    title: "Deaf or hard of hearing",
    barrier: "Speech-driven lectures with unreliable captions.",
    help: "Auto captions where available, plus a clear, high-contrast reading surface.",
  },
  {
    icon: Brain,
    title: "Dyslexia and ADHD",
    barrier: "Noise, sidebars and dense text compete for attention.",
    help: "Focus mode strips the page back; reading themes and spacing reduce load.",
  },
  {
    icon: Hand,
    title: "Motor impairment",
    barrier: "Small targets and precise clicking required to control a player.",
    help: "A large control bar and single-key shortcuts replace fiddly pointing.",
  },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Inclusive by design",
    body: "Accessibility is the product, not a setting bolted on at the end.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    body: "A lecture frame is sent to an AI provider only when you ask for it. We do not store it.",
  },
  {
    icon: Users,
    title: "Built with students",
    body: "Every shortcut and theme is shaped by the people who use it, not guessed at.",
  },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-title" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-paper-deep/60" />
      </div>

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="01 — About us"
            id="about-title"
            title={
              <>
                A bridge between a lecture and the student who needs it.
              </>
            }
          />

          <Reveal delay={0.1} className="lg:pt-3">
            <div className="space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                <span className="font-display text-lg italic text-navy-900">Gyaansetu</span> means
                a bridge of knowledge. We believe a lecture should reach every student, however
                they see, hear, read or move.
              </p>
              <p>
                Millions of Indian students prepare for JEE, NEET, UPSC and board exams through
                video lectures that were not built for everyone. We build the bridge between the
                lecture and the learner.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-navy-900/10 pt-6">
              {[
                ["3", "Platforms"],
                ["2", "Browsers"],
                ["0", "Trackers"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl text-navy-900">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
                </div>
              ))}
            </div>
            {hackathonName && (
              <span className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-gold-600/25 bg-gold-100 px-3 py-1.5 text-[11px] font-medium text-gold-700">
                Built for {hackathonName}
              </span>
            )}
          </Reveal>
        </div>

        {/* The problem */}
        <div className="mt-20 lg:mt-24">
          <SectionHeading
            eyebrow="The problem"
            title="A lecture was never designed for every learner."
            className="max-w-xl"
            as="h3"
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {problems.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={staggerItem}>
                <SpotlightCard className="h-full">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-gold-300">
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-medium leading-snug text-navy-900">{title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{body}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* Who we help */}
        <div className="mt-20 lg:mt-24">
          <SectionHeading
            eyebrow="Who we help"
            title="Four learners. Four different bridges."
            description="The same lecture, adapted four ways. Each profile changes how the page behaves, not what the teacher taught."
            className="max-w-2xl"
            as="h3"
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {audiences.map(({ icon: Icon, title, barrier, help }) => (
              <motion.div key={title} variants={staggerItem}>
                <SpotlightCard className="h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-gold-600/25 bg-gold-100 text-gold-700">
                      <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
                    </span>
                    <Sparkles className="size-4 text-gold-600/50" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-navy-900">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{barrier}</p>
                  <p className="mt-3 border-t border-navy-900/10 pt-3 text-[13px] leading-relaxed text-navy-800">
                    {help}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* Values */}
        <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our values"
            title="What we refuse to trade away."
            className="max-w-sm"
            as="h3"
          />
          <Stagger className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {values.map(({ icon: Icon, title, body }, index) => (
              <motion.div key={title} variants={staggerItem} className="flex gap-5 py-6">
                <span className="mt-0.5 font-mono text-[11px] text-gold-700">
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="flex items-center gap-2.5 font-display text-xl text-navy-900">
                    <Icon className="size-4 text-gold-600" aria-hidden="true" />
                    {title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-muted">{body}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>

        {/* Team — rendered only when real names exist in siteConfig. */}
        {team.length > 0 && (
          <Reveal className="mt-20 lg:mt-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white/60 p-7 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold-300/25 blur-3xl"
              />
              <div className="relative">
                <p className="eyebrow">The team</p>
                <h3 className="mt-4 font-display text-2xl text-navy-900 sm:text-3xl">
                  Built by students, for students.
                </h3>
                <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-muted">
                  The people who research, design and build Gyaansetu.
                </p>
              </div>

              <ul className="relative mt-8 grid gap-3 sm:grid-cols-3">
                {team.map((member) => (
                  <li
                    key={`${member.name}-${member.role}`}
                    className="rounded-2xl border border-navy-900/10 bg-white/70 p-4"
                  >
                    <p className="font-display text-lg text-navy-900">{member.name}</p>
                    <p className="mt-1 text-[12px] text-muted">{member.role}</p>
                    {member.link && (
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-[12px] text-gold-700 underline-offset-4 hover:underline"
                      >
                        Profile
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
