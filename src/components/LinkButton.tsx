import { ArrowUpRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { externalLinkProps, isReadyLink } from "@/lib/links";

interface LinkButtonProps extends Omit<ButtonProps, "asChild" | "children"> {
  href: string | undefined;
  label: string;
  /** Hide the external arrow when the destination is internal. */
  showIcon?: boolean;
  note?: string;
}

/**
 * The only place that turns a configured destination into an anchor.
 *
 * Ready  -> <a> with rel/target and a screen-reader "opens in a new tab" note.
 * Unset  -> a disabled control labelled "Link coming soon". Never href="#".
 */
export function LinkButton({
  href,
  label,
  showIcon = true,
  className,
  note = "Link coming soon",
  variant = "primary",
  size = "default",
  ...props
}: LinkButtonProps) {
  const ready = isReadyLink(href, { isDev: import.meta.env.DEV });
  const descriptionId = `link-note-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  if (!ready) {
    return (
      <>
        <Button
          type="button"
          variant={variant}
          size={size}
          aria-disabled="true"
          aria-describedby={descriptionId}
          className={cn("cursor-not-allowed opacity-70", className)}
          onClick={(event) => event.preventDefault()}
          {...props}
        >
          <span>{label}</span>
          <span
            aria-hidden="true"
            className="rounded-full border border-navy-900/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
          >
            Soon
          </span>
        </Button>
        <span id={descriptionId} className="sr-only">
          {note}. This destination has not been configured yet.
        </span>
      </>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={cn(className)} {...props}>
      <a href={href} {...externalLinkProps}>
        <span>{label}</span>
        {showIcon && <ArrowUpRight aria-hidden="true" className="size-4" />}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  );
}
