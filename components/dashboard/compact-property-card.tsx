import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types";

const statusSeverity = {
  stable: "low",
  attention: "medium",
  at_risk: "high"
} as const;

export function CompactPropertyCard({ property }: { property: Property }) {
  return (
    <Card className="surface">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{property.city}, {property.country}</p>
            <h3 className="mt-1 font-[var(--font-space-grotesk)] text-lg font-semibold">{property.name}</h3>
          </div>
          <RiskBadge severity={statusSeverity[property.status]} />
        </div>

        <div className="flex items-center justify-between rounded-xl border bg-background/70 px-3 py-2.5 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Building2 className="size-4" /> Monthly cash flow
          </span>
          <span className="font-semibold">
            {property.currency} {property.monthlyCashFlow.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={property.activeAlerts > 0 ? "warning" : "success"}>{property.activeAlerts} alerts</Badge>
          <Link href={`/app/properties/${property.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Open property <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
