import { BellRing, Bot, CircleCheckBig } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "@/types";

export function ActivityFeed({ items }: { items: Notification[] }) {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader>
        <CardTitle>Notifications Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-lg border p-3">
            <span className="mt-0.5 rounded-lg border bg-muted/40 p-1.5">
              {item.category === "ai" ? (
                <Bot className="size-3.5" />
              ) : item.read ? (
                <CircleCheckBig className="size-3.5 text-emerald-500" />
              ) : (
                <BellRing className="size-3.5 text-primary" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.body}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
