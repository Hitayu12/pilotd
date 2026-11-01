import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";

import { signOutAction } from "@/app/app/actions";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function initialsFromName(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "U";
}

export function Topbar({ userName }: { userName?: string }) {
  const initials = initialsFromName(userName);

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-background/65 backdrop-blur-2xl dark:border-white/10">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-8">
        <Badge variant="outline" className="hidden gap-1.5 sm:inline-flex">
          <Sparkles className="size-3" /> Scottie active
        </Badge>

        <div className="relative hidden max-w-sm flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 rounded-full border-white/50 bg-background/75 pl-9 dark:border-white/15"
            placeholder="Search obligations, properties, alerts"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications" asChild>
            <Link href="/app/notifications">
              <Bell className="size-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <Avatar className="size-9 border border-white/50 dark:border-white/20">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <form action={signOutAction}>
            <Button variant="ghost" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
