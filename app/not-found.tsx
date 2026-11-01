import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="font-[var(--font-space-grotesk)] text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you requested is not available. Return to Pilotd dashboard or marketing site.
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/app">Open app</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
