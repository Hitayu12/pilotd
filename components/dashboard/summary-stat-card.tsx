import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SummaryStatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "neutral"
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone?: "neutral" | "good" | "warning" | "critical";
}) {
  return (
    <Card className="surface">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
          <p className="mt-3 font-[var(--font-space-grotesk)] text-4xl font-semibold tracking-tight">{value}</p>
          <p
            className={cn(
              "mt-2 text-xs",
              tone === "good" && "text-emerald-600 dark:text-emerald-400",
              tone === "warning" && "text-amber-600 dark:text-amber-400",
              tone === "critical" && "text-rose-600 dark:text-rose-400",
              tone === "neutral" && "text-muted-foreground"
            )}
          >
            {helper}
          </p>
        </div>
        <span className="rounded-2xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}
