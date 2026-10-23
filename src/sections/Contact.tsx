import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { contactEmail } from "@/siteConfig";
import { isEmail, mailtoFor } from "@/lib/links";

export function Contact() {
  const emailReady = isEmail(contactEmail);

  return (
    <Section
      id="contact"
      labelledBy="contact-title"
      className="overflow-hidden bg-paper-deep/70"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_10%,rgba(232,196,104,0.22),transparent_60%)]" />
        <span
          lang="hi"
          className="absolute -bottom-10 right-0 select-none font-hindi text-[9rem] leading-none text-navy-900/[0.035] sm:text-[14rem]"
        >
          ज्ञानसेतु
        </span>
      </div>

      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="04 — Contact"
              id="contact-title"
              title={
                <>
                  Let&apos;s build the <span className="italic text-gold-700">bridge</span> together.
                </>
              }
              description="Students, teachers, accessibility researchers and institutions — if you have a learner in mind, we want to hear about them."
            />

            <Reveal delay={0.1} className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy-900/10 bg-white/60 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  For students
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-800">
                  Tell us which lecture, which platform, and which barrier gets in the way.
                </p>
              </div>
              <div className="rounded-2xl border border-navy-900/10 bg-white/60 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  For institutions
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-800">
                  Pilot the profile with a classroom, a lab or an accessibility cell.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-w-0">
            <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white/80 p-7 shadow-lift backdrop-blur sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-gold-300/30 blur-3xl"
              />

              <div className="relative">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-navy-900 text-gold-300">
                  <Mail className="size-5" aria-hidden="true" strokeWidth={1.7} />
                </span>

                <h3 className="mt-5 font-display text-2xl text-navy-900 sm:text-[1.7rem]">
                  Write to us
                </h3>

                {emailReady ? (
                  <>
                    <p className="mt-2 break-all text-[13px] text-muted">{contactEmail}</p>
                    <Button asChild variant="gold" size="lg" className="mt-6">
                      <a href={mailtoFor(contactEmail)}>
                        Email Gyaansetu
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted" id="contact-email-note">
                      The contact address is being set up. It will appear here as soon as it is
                      ready — nothing here pretends to send a message in the meantime.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="mt-6 cursor-not-allowed opacity-70"
                      aria-disabled="true"
                      aria-describedby="contact-email-note"
                    >
                      Email coming soon
                      <span className="rounded-full border border-navy-900/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]">
                        Soon
                      </span>
                    </Button>
                  </>
                )}

                <div className="mt-8 border-t border-navy-900/10 pt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    Elsewhere
                  </p>
                  <SocialLinks className="mt-3" />
                </div>

                <p className="mt-6 flex items-start gap-2 text-[11px] leading-relaxed text-muted">
                  <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-gold-700" aria-hidden="true" />
                  This site collects nothing: no forms, no cookies, no analytics. Email opens your own
                  mail app.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
