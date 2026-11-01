import { ArrowRight, BellRing } from "lucide-react";
import Link from "next/link";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, Property } from "@/types";

export function PriorityAlertsPanel({ alerts, properties }: { alerts: Alert[]; properties: Property[] }) {
  return (
    <Card className="surface">
      <CardHeader className="pb-3">
        <CardTitle className="inline-flex items-center gap-2 text-base">
          <BellRing className="size-4 text-primary" /> Top priorities today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            No high-priority alerts right now.
          </p>
        ) : (
          alerts.map((alert) => (
            <article key={alert.id} className="rounded-xl border bg-background/70 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{alert.title}</p>
                <RiskBadge severity={alert.severity} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {properties.find((property) => property.id === alert.propertyId)?.name ?? "Portfolio"}
              </p>
            </article>
          ))
        )}

        <Button variant="outline" size="sm" asChild className="w-full justify-between">
          <Link href="/app/notifications">
            Open full alert center
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
