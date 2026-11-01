import { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Pilotd Control</p>
        <h1 className="font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
