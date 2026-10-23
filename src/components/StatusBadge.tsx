import { cn } from "@/lib/utils";
import type { Status } from "@/siteConfig";

const STYLES: Record<Status, { className: string; dot: string }> = {
  live: {
    className: "border-gold-600/35 bg-gold-100 text-gold-700",
    dot: "bg-gold-600",
  },
  beta: {
    className: "border-navy-900/20 bg-white text-navy-800",
    dot: "bg-navy-700",
  },
  planned: {
    className: "border-navy-900/10 bg-transparent text-muted",
    dot: "bg-muted/60",
  },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const style = STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
        style.className,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      {status}
    </span>
  );
}
