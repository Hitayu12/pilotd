import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

import { Providers } from "@/components/shared/providers";

export const metadata: Metadata = {
  title: "Pilotd | AI Operating System for Cross-Border Property Ownership",
  description:
    "Pilotd helps global property owners automate compliance, financial operations, and risk monitoring with Scottie, your AI operating assistant."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-[var(--font-manrope)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
