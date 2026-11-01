import { notFound } from "next/navigation";
import { Building2, Landmark, ShieldCheck, Wrench } from "lucide-react";

import { ComplianceTimeline } from "@/components/dashboard/compliance-timeline";
import { DeviceStatusCard } from "@/components/dashboard/device-status-card";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { AIChatPanel } from "@/components/scottie/ai-chat-panel";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getEstateData } from "@/lib/db/estate-data";
import { formatDate } from "@/lib/utils";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getEstateData();
  const property = data.properties.find((entry) => entry.id === id);

  if (!property) {
    notFound();
  }

  const context = {
    property,
    compliance: data.complianceItems.filter((item) => item.propertyId === id),
    bills: data.bills.filter((item) => item.propertyId === id),
    devices: data.smartDevices.filter((item) => item.propertyId === id),
    maintenance: data.maintenanceEvents.filter((item) => item.propertyId === id),
    alerts: data.alerts.filter((item) => item.propertyId === id),
    account: data.bankAccounts.find((item) => item.propertyId === id)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={property.name}
        description={`${property.city}, ${property.country} • ${property.type} • Jurisdiction ${property.jurisdictionCode}`}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-card/70 lg:col-span-2">
          <CardHeader>
            <CardTitle>Property overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Ownership structure</p>
              <p className="mt-1 text-sm">Held via U.S. LLC with local Portuguese tax registration mapping.</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Occupancy status</p>
              <p className="mt-1 text-sm capitalize">{property.occupancy.replace("_", " ")}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Monthly cash flow</p>
              <p className="mt-1 text-sm font-semibold">
                {property.currency} {property.monthlyCashFlow.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Active alerts</p>
              <p className="mt-1 text-sm font-semibold">{property.activeAlerts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle>Jurisdiction summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              Pilotd links this asset to <span className="font-medium">{property.country}</span> obligations and U.S.
              cross-border reporting dependencies.
            </p>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Scottie recommendation</p>
              <p>
                Prepare legal/tax packet at least 7 days before due date to avoid delayed submissions and cross-border
                mismatch.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <ComplianceTimeline items={context.compliance} />

        <div className="space-y-4">
          <Card className="border-white/10 bg-card/70">
            <CardHeader>
              <CardTitle>Linked bank account status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Account</p>
                <p className="font-medium">{context.account?.accountNickname}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Balance</p>
                <p className="font-medium">
                  {context.account?.currency} {context.account?.balance.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Inactivity window</p>
                <p className="font-medium">{context.account?.monthsInactive} months</p>
              </div>
              <Badge variant={context.account?.status === "dormant_risk" ? "danger" : "warning"}>
                {context.account?.status.replace("_", " ")}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/70">
            <CardHeader>
              <CardTitle>AI insights panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {context.alerts.map((alert) => (
                <div key={alert.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{alert.title}</p>
                    <RiskBadge severity={alert.severity} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Landmark className="size-4" /> Payment history
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {context.bills.map((bill) => (
              <div key={bill.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{bill.vendor}</p>
                  <Badge variant={bill.status === "overdue" ? "danger" : bill.status === "scheduled" ? "secondary" : "success"}>
                    {bill.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {bill.currency} {bill.amount.toLocaleString()} • Due {formatDate(bill.dueDate)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Building2 className="size-4" /> Utility + device status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {context.devices.map((device) => (
              <DeviceStatusCard key={device.id} device={device} />
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2">
              <Wrench className="size-4" /> Maintenance log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {context.maintenance.map((event) => (
              <div key={event.id} className="rounded-lg border p-3 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{event.title}</p>
                  <RiskBadge severity={event.priority} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Status: {event.status.replace("_", " ")} • Logged {formatDate(event.loggedAt)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h3 className="inline-flex items-center gap-2 font-[var(--font-space-grotesk)] text-lg font-semibold">
            <ShieldCheck className="size-4" /> Ask Scottie about this property
          </h3>
          <AIChatPanel propertyId={property.id} mode="embedded" />
        </section>
      </section>
    </div>
  );
}
