import { AlertOctagon, Radar } from "lucide-react";

import { DeviceStatusCard } from "@/components/dashboard/device-status-card";
import { KPIChart } from "@/components/dashboard/kpi-chart";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEstateData } from "@/lib/db/estate-data";

export default async function MonitoringPage() {
  const data = await getEstateData();
  const energyData = [
    { label: "Week -3", value: 76 },
    { label: "Week -2", value: 79 },
    { label: "Week -1", value: 81 },
    { label: "Current", value: 109 }
  ];

  const monitoringAlerts = data.alerts.filter((alert) => alert.type === "monitoring");
  const offline = data.smartDevices.filter((device) => device.status === "offline");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Property Monitoring"
        description="Unified telemetry for cameras, HVAC, locks, and operational heartbeat signals."
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <KPIChart
          title="Energy usage trend"
          subtitle="Portfolio baseline index"
          data={energyData}
          formatter={(value) => `${value} pts`}
        />

        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <AlertOctagon className="size-4" /> Critical monitoring alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {monitoringAlerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border p-3">
                <p className="font-medium">{alert.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
                <Badge className="mt-2" variant={alert.severity === "critical" ? "danger" : "warning"}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
            {offline.length > 0 ? (
              <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                Offline now: {offline.map((item) => item.label).join(", ")}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.smartDevices.map((device) => (
          <DeviceStatusCard key={device.id} device={device} />
        ))}
      </section>

      <section className="rounded-xl border bg-card/70 p-4">
        <h2 className="inline-flex items-center gap-2 font-[var(--font-space-grotesk)] text-xl font-semibold">
          <Radar className="size-5" /> Device-to-property map
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.properties.map((property) => {
            const propertyDevices = data.smartDevices.filter((device) => device.propertyId === property.id);
            return (
              <div key={property.id} className="rounded-xl border p-4">
                <p className="font-medium">{property.name}</p>
                <p className="text-xs text-muted-foreground">
                  {property.city}, {property.country}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {propertyDevices.map((device) => (
                    <Badge key={device.id} variant={device.status === "online" ? "success" : "warning"}>
                      {device.type}: {device.status}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
