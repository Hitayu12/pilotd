import Link from "next/link";
import { ArrowUpRight, BellRing, CalendarCheck2, WalletCards, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Review compliance queue",
    href: "/app/compliance" as const,
    description: "Open filing timeline and due-soon obligations.",
    icon: CalendarCheck2
  },
  {
    title: "Open finance controls",
    href: "/app/finance" as const,
    description: "Track overdue bills, autopay, and reserve balance.",
    icon: WalletCards
  },
  {
    title: "Resolve monitoring incidents",
    href: "/app/monitoring" as const,
    description: "Investigate offline devices and anomalies.",
    icon: Wrench
  },
  {
    title: "Process notifications",
    href: "/app/notifications" as const,
    description: "Clear critical alerts requiring owner review.",
    icon: BellRing
  }
];

export function QuickActions() {
  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link key={action.title} href={action.href} className="rounded-xl border p-4 transition-colors hover:bg-muted/40">
            <action.icon className="size-4 text-primary" />
            <p className="mt-2 font-medium">{action.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Open <ArrowUpRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
