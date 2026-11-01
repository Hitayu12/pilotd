"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ActionResult = { error?: string; success?: string } | undefined;

interface AuthFormProps {
  mode: "login" | "signup";
  action: (state: ActionResult, formData: FormData) => Promise<ActionResult>;
  magicLinkAction?: (state: ActionResult, formData: FormData) => Promise<ActionResult>;
}

export function AuthForm({ mode, action, magicLinkAction }: AuthFormProps) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, undefined);
  const fallbackMagicAction = async () => undefined;
  const [magicState, magicFormAction, magicPending] = useActionState<ActionResult, FormData>(
    magicLinkAction ?? fallbackMagicAction,
    undefined
  );

  return (
    <Card className="mx-auto w-full max-w-md border-white/10 bg-card/90 shadow-2xl">
      <CardHeader>
        <CardTitle className="font-[var(--font-space-grotesk)] text-2xl">
          {mode === "login" ? "Welcome back" : "Create your Pilotd account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Sign in to continue operating your global portfolio with Scottie."
            : "Start with email/password today, then connect jurisdictions and accounts."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={8} />
          </div>

          {state?.error ? (
            <p className="rounded-md bg-rose-500/10 px-3 py-2 text-sm text-rose-500">{state.error}</p>
          ) : null}
          {state?.success ? (
            <p className="rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500">{state.success}</p>
          ) : null}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        {magicLinkAction ? (
          <form action={magicFormAction} className="space-y-3 rounded-lg border border-dashed p-4">
            <p className="text-sm font-medium">Magic link access</p>
            <Input type="email" name="email" placeholder="you@example.com" required />
            <Button type="submit" variant="secondary" className="w-full" disabled={magicPending}>
              {magicPending ? <Loader2 className="size-4 animate-spin" /> : <MailCheck className="size-4" />}
              Send magic link
            </Button>
            {magicState?.success ? (
              <p className="text-xs text-emerald-500">{magicState.success}</p>
            ) : null}
            {magicState?.error ? (
              <p className="text-xs text-rose-500">{magicState.error}</p>
            ) : null}
          </form>
        ) : null}

        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? "New to Pilotd?" : "Already have an account?"} {" "}
          <Link href={mode === "login" ? "/signup" : "/login"} className="text-primary hover:underline">
            {mode === "login" ? "Create account" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
