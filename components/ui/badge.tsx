import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/12 text-primary",
        secondary: "border-border/70 bg-secondary/75 text-secondary-foreground",
        outline: "border-border/75 bg-background/60 text-foreground",
        success: "border-emerald-500/30 bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/35 bg-amber-500/12 text-amber-600 dark:text-amber-400",
        danger: "border-rose-500/35 bg-rose-500/12 text-rose-600 dark:text-rose-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
