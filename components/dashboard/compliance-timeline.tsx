import { format } from "date-fns";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceItem } from "@/types";

export function ComplianceTimeline({ items }: { items: ComplianceItem[] }) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader>
        <CardTitle>Compliance Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-medium">{item.title}</h4>
              <RiskBadge severity={item.risk} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.jurisdiction}</span>
              <span>{format(new Date(item.dueDate), "MMM d, yyyy")}</span>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
