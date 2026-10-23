import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  id,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "eyebrow",
          align === "center" && "justify-center",
          tone === "light" && "text-gold-300",
        )}
      >
        {eyebrow}
      </p>
      <Tag
        id={id}
        data-section-heading={Tag === "h2" ? true : undefined}
        tabIndex={Tag === "h2" ? -1 : undefined}
        className={cn(
          "mt-5 text-balance text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.02em] focus:outline-none",
          tone === "light" ? "text-paper" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[15px] leading-relaxed",
            align === "center" && "mx-auto",
            tone === "light" ? "text-paper/65" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
  labelledBy,
  tone = "light",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={tone === "dark" ? "dark" : "light"}
      className={cn("relative py-24 sm:py-28 lg:py-32", className)}
    >
      {children}
    </section>
  );
}
