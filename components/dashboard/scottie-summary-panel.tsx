import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ScottieSummaryPanel({
  greeting,
  overview,
  actions
}: {
  greeting: string;
  overview: string;
  actions: string[];
}) {
  return (
    <Card className="surface overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card/90 to-card/90">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2 text-lg">
          <Sparkles className="size-4 text-primary" /> Scottie Daily Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="font-medium">{greeting}</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{overview}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {actions.map((action) => (
            <div key={action} className="rounded-xl border bg-background/75 px-3 py-2.5 text-sm">
              {action}
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" asChild className="w-fit">
          <Link href="/app/scottie">
            Open Scottie workspace
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
