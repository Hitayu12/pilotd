import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$39",
    description: "For single-country owners testing AI-assisted operations",
    features: ["Up to 2 properties", "Basic compliance reminders", "Scottie daily summaries"]
  },
  {
    name: "Pro",
    price: "$99",
    description: "For cross-border landlords with active obligations",
    features: ["Up to 8 properties", "Cross-border compliance engine", "Dormancy + payment risk monitoring", "Smart device integrations"],
    highlighted: true
  },
  {
    name: "Portfolio",
    price: "$249",
    description: "For investors running complex multi-jurisdiction portfolios",
    features: ["Unlimited properties", "Advanced compliance intelligence", "Agent workflows", "Priority support + onboarding"]
  }
];

export function PricingCards() {
  return (
    <section className="container-shell py-20" id="pricing">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Pricing</p>
        <h2 className="mt-3 font-[var(--font-space-grotesk)] text-3xl font-semibold">Transparent plans built around properties, not seats</h2>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "border-white/10 bg-card/70",
              plan.highlighted && "border-primary/40 bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.22)]"
            )}
          >
            <CardHeader>
              <p className="text-sm text-muted-foreground">{plan.name}</p>
              <CardTitle className="font-[var(--font-space-grotesk)] text-4xl">{plan.price}
                <span className="ml-1 text-sm text-muted-foreground">/month</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                Start {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
