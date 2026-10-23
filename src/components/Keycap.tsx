import { cn } from "@/lib/utils";

export function Keycap({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-[2rem] items-center justify-center rounded-lg border border-b-[3px] px-2 py-1 font-mono text-[11px] font-semibold",
        tone === "light"
          ? "border-navy-900/15 bg-white text-navy-900 shadow-sm"
          : "border-paper/25 bg-paper/10 text-paper",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
