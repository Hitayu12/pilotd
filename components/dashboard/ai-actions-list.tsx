import { CheckCircle2, Clock3, ListTodo } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIAction } from "@/types";

export function AIActionsList({ items }: { items: AIAction[] }) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <ListTodo className="size-4" /> Recent AI actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium">{item.title}</p>
              <Badge
                variant={item.status === "completed" ? "success" : item.status === "queued" ? "secondary" : "warning"}
                className="capitalize"
              >
                {item.status === "completed" ? <CheckCircle2 className="size-3" /> : <Clock3 className="size-3" />} {item.status.replace("_", " ")}
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString("en-US")}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
