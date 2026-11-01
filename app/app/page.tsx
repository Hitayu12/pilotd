import Link from "next/link";
import { AlertTriangle, Building2, CalendarClock, Landmark, Wallet } from "lucide-react";

import { AIActionsList } from "@/components/dashboard/ai-actions-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CompactPropertyCard } from "@/components/dashboard/compact-property-card";
import { ComplianceTimeline } from "@/components/dashboard/compliance-timeline";
import { PriorityAlertsPanel } from "@/components/dashboard/priority-alerts-panel";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ScottieSummaryPanel } from "@/components/dashboard/scottie-summary-panel";
import { SectionShell } from "@/components/dashboard/section-shell";
import { SummaryStatCard } from "@/components/dashboard/summary-stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardMetrics, getEstateData } from "@/lib/db/estate-data";

export default async function DashboardPage() {
  const data = await getEstateData();
  const metrics = getDashboardMetrics(data);

  const sortedAlerts = [...data.alerts].sort((a, b) => {
    const rank = { critical: 4, high: 3, medium: 2, low: 1 };
    return rank[b.severity] - rank[a.severity];
  });

  const priorityAlerts = sortedAlerts.slice(0, 3);
  const focusProperties = [...data.properties].sort((a, b) => b.activeAlerts - a.activeAlerts).slice(0, 2);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Portfolio Command Center"
        description="A focused operating view for what needs attention now across your cross-border portfolio."
      />

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ScottieSummaryPanel
          greeting={data.dailyScottieSummary.greeting}
          overview={data.dailyScottieSummary.overview}
          actions={data.dailyScottieSummary.actions}
        />
        <PriorityAlertsPanel alerts={priorityAlerts} properties={data.properties} />
      </section>

      <SectionShell
        title="Executive snapshot"
        description="Key portfolio signals for this week"
      >
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryStatCard
            label="Properties"
            value={String(metrics.properties)}
            helper="Global assets actively monitored"
            icon={Building2}
          />
          <SummaryStatCard
            label="Monthly cash flow"
            value={`$${metrics.totalCashFlow.toLocaleString()}`}
            helper="Combined estimate across portfolio"
            icon={Wallet}
            tone="good"
          />
          <SummaryStatCard
            label="Compliance due soon"
            value={String(metrics.dueSoonCompliance)}
            helper="Cross-border filing windows"
            icon={CalendarClock}
            tone="warning"
          />
          <SummaryStatCard
            label="Critical pressure"
            value={String(metrics.highRiskAlerts + metrics.overdueBills)}
            helper="High-risk alerts + overdue bills"
            icon={AlertTriangle}
            tone={metrics.highRiskAlerts + metrics.overdueBills > 0 ? "critical" : "good"}
          />
        </section>
      </SectionShell>

      <SectionShell
        title="Focus properties"
        description="High-attention assets surfaced first"
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/app/properties">View all properties</Link>
          </Button>
        }
      >
        <section className="grid gap-4 lg:grid-cols-2">
          {focusProperties.map((property) => (
            <CompactPropertyCard key={property.id} property={property} />
          ))}
        </section>
      </SectionShell>

      <SectionShell title="Operations workspace" description="Detailed views and actions">
        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <ComplianceTimeline items={data.complianceItems.slice(0, 3)} />
            <QuickActions />
          </div>
          <div className="space-y-4">
            <AIActionsList items={data.aiActions.slice(0, 3)} />
            <ActivityFeed items={data.notifications.slice(0, 4)} />
          </div>
        </section>
      </SectionShell>

      <Card className="surface">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-medium">Need deeper review?</p>
            <p className="text-sm text-muted-foreground">
              Open the finance and compliance modules for full timeline, payments, and jurisdiction detail.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/app/compliance">Compliance</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/app/finance">Finance</Link>
            </Button>
            <Button asChild>
              <Link href="/app/scottie">
                Ask Scottie
                <Landmark className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
