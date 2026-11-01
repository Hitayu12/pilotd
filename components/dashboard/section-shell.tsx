import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionShell({
  title,
  description,
  action,
  children,
  className
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-[var(--font-space-grotesk)] text-xl font-semibold tracking-tight">{title}</h2>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
