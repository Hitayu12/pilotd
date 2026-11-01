import Link from "next/link";
import { ArrowUpRight, Building2, CalendarClock, TriangleAlert } from "lucide-react";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types";

const statusSeverity = {
  stable: "low",
  attention: "medium",
  at_risk: "high"
} as const;

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">{property.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.city}, {property.country}
            </p>
          </div>
          <RiskBadge severity={statusSeverity[property.status]} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border p-2">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium">{property.type}</p>
          </div>
          <div className="rounded-lg border p-2">
            <p className="text-xs text-muted-foreground">Occupancy</p>
            <p className="font-medium capitalize">{property.occupancy.replace("_", " ")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Building2 className="size-4" /> Monthly cash flow
          </span>
          <span className="font-semibold">
            {property.currency} {property.monthlyCashFlow.toLocaleString()}
          </span>
        </div>

        <div className="flex items-start justify-between rounded-lg border p-3">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarClock className="size-4" /> Next due item
            </p>
            <p>{property.nextDueItem}</p>
          </div>
          <Badge variant={property.activeAlerts > 2 ? "warning" : "secondary"}>{property.activeAlerts} alerts</Badge>
        </div>

        <Link href={`/app/properties/${property.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Quick view <ArrowUpRight className="size-4" />
        </Link>

        {property.status !== "stable" ? (
          <p className="inline-flex items-center gap-1 text-xs text-amber-500">
            <TriangleAlert className="size-3" /> Requires active review this week
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
