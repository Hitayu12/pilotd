import { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 mesh-bg opacity-70" />
      <div className="container-shell flex min-h-screen flex-col justify-center py-12">
        <Logo className="mb-8" withTagline />
        {children}
      </div>
    </main>
  );
}
