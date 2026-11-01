import { CheckCircle2, Siren, Sparkles, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScottieResponse } from "@/lib/ai/scottie";

function toneToBadge(tone: "neutral" | "good" | "warning" | "critical") {
  if (tone === "good") return "success" as const;
  if (tone === "warning") return "warning" as const;
  if (tone === "critical") return "danger" as const;
  return "secondary" as const;
}

function toneIcon(tone: "neutral" | "good" | "warning" | "critical") {
  if (tone === "good") return <CheckCircle2 className="size-3.5" />;
  if (tone === "warning") return <TriangleAlert className="size-3.5" />;
  if (tone === "critical") return <Siren className="size-3.5" />;
  return <Sparkles className="size-3.5" />;
}

export function AIResponseCard({ response }: { response: ScottieResponse }) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-primary" /> Scottie Response
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{response.answer}</p>

        <div className="grid gap-2 sm:grid-cols-3">
          {response.highlights.map((highlight) => (
            <div key={highlight.label} className="rounded-lg border bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">{highlight.label}</p>
              <p className="mt-1 text-sm font-semibold">{highlight.value}</p>
              <Badge variant={toneToBadge(highlight.tone)} className="mt-2 w-fit gap-1">
                {toneIcon(highlight.tone)} {highlight.tone}
              </Badge>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Suggested actions</p>
          <div className="flex flex-wrap gap-2">
            {response.actions.map((action) => (
              <Badge key={action} variant="outline" className="rounded-lg px-3 py-1 text-xs">
                {action}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
