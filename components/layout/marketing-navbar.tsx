import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-background/65 backdrop-blur-2xl dark:border-white/10">
      <div className="container-shell flex h-18 items-center justify-between py-4">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
