import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    label: "08:30",
    event: "Lisbon rental tax filing due in 12 days",
    badge: "High",
    variant: "warning" as const
  },
  {
    label: "09:10",
    event: "Operating account inactivity detected — 10 months",
    badge: "Critical",
    variant: "danger" as const
  },
  {
    label: "11:45",
    event: "Utility autopay scheduled for March 12 (Austin)",
    badge: "Scheduled",
    variant: "success" as const
  },
  {
    label: "14:05",
    event: "HVAC usage increased 34% week-over-week",
    badge: "Review",
    variant: "secondary" as const
  }
];

export function DemoScenarioSection() {
  return (
    <section className="container-shell py-20">
      <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 md:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Demo scenario</p>
          <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold">Know what is due, what is at risk, and what to do next</h2>
        </div>
        <Card className="mt-8 border-white/10 bg-background/70">
          <CardHeader>
            <CardTitle>Scottie Daily Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {timeline.map((item) => (
              <div key={item.event} className="flex flex-col gap-2 rounded-xl border bg-card/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.event}</p>
                </div>
                <Badge variant={item.variant}>{item.badge}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
