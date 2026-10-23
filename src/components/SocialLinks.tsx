import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { externalLinkProps, isReadyLink } from "@/lib/links";
import { links } from "@/siteConfig";
import { cn } from "@/lib/utils";

const socials: { key: keyof typeof links; label: string; Icon: typeof GithubIcon }[] = [
  { key: "github", label: "GitHub", Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "x", label: "X", Icon: XIcon },
];

export function SocialLinks({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map(({ key, label, Icon }) => {
        const href = links[key];
        const ready = isReadyLink(href, { isDev: import.meta.env.DEV });

        const base =
          "inline-flex size-10 items-center justify-center rounded-xl border transition-colors duration-300";
        const palette =
          tone === "dark"
            ? "border-paper/15 bg-paper/[0.04] text-paper/70 hover:border-gold-300/50 hover:text-paper"
            : "border-navy-900/10 bg-white/70 text-navy-800 hover:border-gold-600/50 hover:text-navy-900";

        return (
          <li key={key}>
            {ready ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    {...externalLinkProps}
                    className={cn(base, palette)}
                    aria-label={`${label} (opens in a new tab)`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <button
                type="button"
                disabled
                aria-label={`${label} — link coming soon`}
                title="Link coming soon"
                className={cn(base, palette, "cursor-not-allowed opacity-45")}
              >
                <Icon className="size-4" aria-hidden="true" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
