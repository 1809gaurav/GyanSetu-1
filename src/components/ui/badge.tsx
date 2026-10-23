import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none tracking-wide",
  {
    variants: {
      variant: {
        default: "border-navy-900/12 bg-paper text-navy-900",
        gold: "border-gold-600/30 bg-gold-100 text-gold-700",
        navy: "border-navy-900 bg-navy-900 text-paper",
        outline: "border-navy-900/20 bg-transparent text-navy-900",
        muted: "border-navy-900/10 bg-white/60 text-muted",
        live: "border-gold-600/35 bg-gold-100 text-gold-700",
        beta: "border-navy-900/15 bg-navy-900/[0.04] text-navy-800",
        planned: "border-navy-900/10 bg-transparent text-muted",
        inverse: "border-paper/20 bg-paper/5 text-paper",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
