import { ReactNode } from "react";

import { MarketingNavbar } from "@/components/layout/marketing-navbar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 section-fade" />
      <MarketingNavbar />
      {children}
    </div>
  );
}
