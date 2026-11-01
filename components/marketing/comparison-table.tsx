import { Check, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  ["Cross-border compliance intelligence", true, false],
  ["AI portfolio risk summaries", true, false],
  ["Bank dormancy monitoring", true, false],
  ["Smart device + operations monitoring", true, false],
  ["Single-jurisdiction rent collection", true, true],
  ["Proactive deadline orchestration", true, false]
];

export function ComparisonTableSection() {
  return (
    <section className="container-shell py-20">
      <Card className="border-white/10 bg-card/70">
        <CardHeader>
          <p className="text-sm font-medium text-primary">Competitive differentiation</p>
          <CardTitle className="font-[var(--font-space-grotesk)] text-3xl">Built for global ownership, not local-only workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3">Capability</th>
                  <th className="px-4 py-3">Pilotd</th>
                  <th className="px-4 py-3">Generic PM tools</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, estate, generic]) => (
                  <tr key={label as string} className="border-t">
                    <td className="px-4 py-3">{label}</td>
                    <td className="px-4 py-3">{estate ? <Check className="size-4 text-emerald-500" /> : <X className="size-4 text-rose-500" />}</td>
                    <td className="px-4 py-3">{generic ? <Check className="size-4 text-emerald-500" /> : <X className="size-4 text-rose-500" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
