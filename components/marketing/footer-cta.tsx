import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function FooterCTA() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="container-shell">
        <div className="rounded-3xl border bg-gradient-to-r from-primary/15 via-transparent to-transparent p-8 md:p-10">
          <h3 className="max-w-2xl font-[var(--font-space-grotesk)] text-3xl font-semibold">
            Pilotd gives you one intelligent system for every property, jurisdiction, and obligation.
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Replace fragmented workflows with Scottie, your AI chief operating layer for cross-border ownership.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Start free trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app">Open product demo</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <Logo />
          <p>© {new Date().getFullYear()} Pilotd. Compliance clarity across borders.</p>
        </div>
      </div>
    </footer>
  );
}
