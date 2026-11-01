import Link from "next/link";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert } from "@/types";

export function AlertCard({ alert, propertyName }: { alert: Alert; propertyName?: string }) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{alert.type}</p>
            <h4 className="mt-1 font-medium">{alert.title}</h4>
          </div>
          <RiskBadge severity={alert.severity} />
        </div>
        <p className="text-sm text-muted-foreground">{alert.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{propertyName}</span>
          <Link href="/app/notifications" className="text-primary hover:underline">
            View details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
