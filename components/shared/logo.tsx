import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className, withTagline = false }: { className?: string; withTagline?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="inline-flex items-center justify-center">
        <Image
          src="/pilotd-logo.png"
          alt="Pilotd logo"
          width={38}
          height={56}
          className="h-11 w-auto object-contain"
          priority
        />
      </span>
      <span>
        <span className="block font-[var(--font-space-grotesk)] text-[1.55rem] font-semibold leading-[1.05] tracking-tight">
          Pilotd
        </span>
        {withTagline ? (
          <span className="block max-w-[18rem] pt-0.5 text-[11px] text-muted-foreground">
            AI operating system for cross-border property ownership
          </span>
        ) : null}
      </span>
    </Link>
  );
}
