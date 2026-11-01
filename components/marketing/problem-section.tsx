import { Globe2, Landmark, ReceiptText, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const problems = [
  {
    icon: Globe2,
    title: "Cross-border legal complexity",
    body: "Each property jurisdiction introduces different filing windows, regulations, and reporting standards."
  },
  {
    icon: ReceiptText,
    title: "Fragmented financial operations",
    body: "Rent, bills, tax payments, and reserve planning are often split across disconnected systems."
  },
  {
    icon: Landmark,
    title: "Hidden banking risk",
    body: "Dormancy thresholds and low-balance failures silently disrupt payment continuity."
  },
  {
    icon: Wrench,
    title: "Remote operational blind spots",
    body: "Device outages and maintenance signals are easy to miss when properties are distributed globally."
  }
];

export function ProblemSection() {
  return (
    <section className="container-shell py-24" id="problem">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">The core problem</p>
        <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold tracking-tight sm:text-5xl">
          Global property ownership breaks down when every workflow lives in a different tool.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {problems.map((problem) => (
          <Card key={problem.title} className="surface">
            <CardHeader className="space-y-4 pb-3">
              <span className="w-fit rounded-2xl border border-primary/25 bg-primary/10 p-3 text-primary">
                <problem.icon className="size-4" />
              </span>
              <CardTitle className="text-xl">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{problem.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
