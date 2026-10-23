import { cn } from "@/lib/utils";

/**
 * The supplied brand mark. The PNG includes its own navy halo, so it sits on
 * a paper-coloured tile with a hairline border rather than being recoloured.
 */
export function LogoMark({
  className,
  size = 40,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] border border-navy-900/10 bg-paper",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src="/Gyansetu.png"
        alt=""
        width={size}
        height={size}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="size-full object-cover"
      />
    </span>
  );
}

export function Wordmark({
  className,
  tone = "dark",
  showHindi = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showHindi?: boolean;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[19px] font-semibold tracking-[-0.01em]",
          tone === "dark" ? "text-navy-900" : "text-paper",
        )}
      >
        Gyaansetu
      </span>
      {showHindi && (
        <span
          lang="hi"
          className={cn(
            "mt-0.5 font-hindi text-[10px] tracking-[0.18em]",
            tone === "dark" ? "text-muted" : "text-paper/55",
          )}
        >
          ज्ञानसेतु
        </span>
      )}
    </span>
  );
}
