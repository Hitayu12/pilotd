"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileCheck2,
  LayoutDashboard,
  Radar,
  Settings,
  Sparkles
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const appNav = [
  { href: "/app" as const, label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/properties" as const, label: "Properties", icon: Building2 },
  { href: "/app/compliance" as const, label: "Compliance", icon: FileCheck2 },
  { href: "/app/finance" as const, label: "Finance", icon: CreditCard },
  { href: "/app/monitoring" as const, label: "Monitoring", icon: Radar },
  { href: "/app/scottie" as const, label: "Scottie", icon: Sparkles },
  { href: "/app/notifications" as const, label: "Notifications", icon: Bell },
  { href: "/app/settings" as const, label: "Settings", icon: Settings }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r bg-card/40 px-4 py-6 lg:block">
      <Logo withTagline />
      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
      <nav className="mt-3 grid gap-1.5">
        {appNav.map((item) => {
          const isActive = item.href === "/app" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-accent/70 hover:text-foreground",
                isActive && "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.24)]"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <BriefcaseBusiness className="size-4 text-primary" /> Operations posture
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Scottie is running continuous scans for compliance windows, payment continuity, and property telemetry.
        </p>
      </div>
    </aside>
  );
}
