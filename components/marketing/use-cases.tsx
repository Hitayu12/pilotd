import { Building2, Globe, Home, Landmark } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const useCases = [
  {
    icon: Globe,
    title: "Diaspora property owners",
    body: "Maintain compliance in home-country assets while living abroad."
  },
  {
    icon: Building2,
    title: "International landlords",
    body: "Coordinate taxes, bills, and monitoring across distributed rentals."
  },
  {
    icon: Landmark,
    title: "Cross-border investors",
    body: "Run a multi-jurisdiction portfolio with one operations command center."
  },
  {
    icon: Home,
    title: "Short-term rental operators",
    body: "Keep occupancy operations and compliance tasks synchronized property by property."
  }
];

export function UseCasesSection() {
  return (
    <section className="container-shell py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Use cases</p>
        <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold">Built for owners managing complexity across borders</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {useCases.map((item) => (
          <Card key={item.title} className="border-white/10 bg-card/70">
            <CardHeader>
              <item.icon className="size-5 text-primary" />
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
