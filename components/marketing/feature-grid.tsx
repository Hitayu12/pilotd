import { BellRing, Building2, Camera, FileCheck2, Landmark, WalletCards } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileCheck2,
    title: "Cross-border compliance intelligence",
    body: "Translates jurisdiction rules into clear tasks tied to each property and residency profile."
  },
  {
    icon: WalletCards,
    title: "Financial operations automation",
    body: "Automates utility flows, tax reminders, and maintenance payments with reserve awareness."
  },
  {
    icon: Landmark,
    title: "Dormancy and continuity monitoring",
    body: "Flags inactive operating accounts before closures disrupt rent and bill workflows."
  },
  {
    icon: BellRing,
    title: "Proactive alerting",
    body: "Prioritizes risk by urgency so owners act early instead of reacting after penalties."
  },
  {
    icon: Camera,
    title: "Smart property telemetry",
    body: "Aggregates camera, lock, HVAC, and heartbeat signals into one incident view."
  },
  {
    icon: Building2,
    title: "Scottie AI control layer",
    body: "Ask Scottie what is due, what is risky, and what should be handled next."
  }
];

export function FeatureGrid() {
  return (
    <section className="container-shell py-20" id="features">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Core product systems</p>
        <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold sm:text-4xl">
          Compliance clarity across borders, with operations execution built in
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="surface">
            <CardHeader className="space-y-3 pb-3">
              <span className="w-fit rounded-lg border bg-primary/10 p-2 text-primary">
                <feature.icon className="size-4" />
              </span>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
