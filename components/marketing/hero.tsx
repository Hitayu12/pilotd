"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Sparkles className="size-3" /> Scottie monitors your portfolio in real time
          </div>
          <h1 className="max-w-4xl font-[var(--font-space-grotesk)] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            The AI operating system for cross-border property ownership.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Pilotd replaces fragmented legal, financial, and property tools with one calm operating layer built for
            global owners.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/app/scottie">View Scottie demo</Link>
            </Button>
          </div>
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500" /> Compliance-first architecture with proactive risk
            prevention
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Card className="surface">
            <CardHeader>
              <CardTitle className="font-[var(--font-space-grotesk)]">Scottie Morning Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-xl border bg-background/70 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Due soon</p>
                <p className="mt-1">Lisbon rental tax filing due in 12 days with U.S. reporting dependency.</p>
              </div>
              <div className="rounded-xl border bg-background/70 p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">At risk</p>
                <p className="mt-1">Operating account inactivity detected and one utility bill is now overdue.</p>
              </div>
              <div className="rounded-xl border border-primary/40 bg-primary/10 p-4 text-primary">
                Recommended next: approve tax packet, clear overdue utility, and confirm camera restoration.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
