import { BrainCircuit, Building2, CheckCheck, Workflow } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Connect portfolio context",
    body: "Import properties, ownership entities, jurisdictions, and operating accounts."
  },
  {
    icon: BrainCircuit,
    title: "Scottie maps obligations",
    body: "AI cross-references residency, location, and legal frameworks to identify requirements."
  },
  {
    icon: Workflow,
    title: "Automate operations",
    body: "Bills, reminders, monitoring incidents, and follow-ups are orchestrated in one workflow."
  },
  {
    icon: CheckCheck,
    title: "Stay continuously ahead",
    body: "You get daily summaries with what is due, at risk, and recommended next actions."
  }
];

export function HowItWorksSection() {
  return (
    <section className="container-shell py-20" id="how">
      <div className="rounded-3xl border bg-card/60 p-8 md:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold">One intelligent layer for every property you own</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border bg-background/60 p-5">
              <div className="mb-4 inline-flex size-9 items-center justify-center rounded-full border text-sm text-muted-foreground">{index + 1}</div>
              <step.icon className="mb-3 size-5 text-primary" />
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
