"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/db/supabase/server";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type ActionResult = { error?: string; success?: string } | undefined;

export async function loginAction(_: ActionResult, formData: FormData) {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: "Please enter a valid email and password with 8+ characters." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/app");
}

export async function signupAction(_: ActionResult, formData: FormData) {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: "Please provide a valid email and a secure password." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/app`
    }
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Account created. Check your inbox to confirm your email, then sign in."
  };
}

export async function magicLinkAction(_: ActionResult, formData: FormData) {
  const email = z.string().email().safeParse(formData.get("email"));

  if (!email.success) {
    return { error: "Please enter a valid email for magic link access." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email.data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/app`
    }
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Magic link sent. Open your email to continue."
  };
}
