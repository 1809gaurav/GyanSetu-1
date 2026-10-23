import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-100 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-navy-900 text-paper shadow-[0_10px_30px_-14px_rgba(10,22,51,0.65)] hover:bg-navy-800 hover:shadow-[0_18px_40px_-18px_rgba(10,22,51,0.7)]",
        gold:
          "bg-gold-400 text-navy-950 shadow-gold hover:bg-gold-300 hover:shadow-[0_24px_55px_-22px_rgba(185,146,43,0.75)]",
        outline:
          "border border-navy-900/20 bg-white/60 text-navy-900 backdrop-blur-sm hover:border-gold-600/60 hover:bg-white",
        ghost: "text-navy-900 hover:bg-navy-900/5",
        link: "h-auto rounded-none p-0 text-gold-700 underline-offset-4 hover:underline",
        inverse:
          "border border-paper/25 bg-paper/5 text-paper backdrop-blur-sm hover:border-gold-300/60 hover:bg-paper/10",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
