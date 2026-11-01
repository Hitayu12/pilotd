"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/db/supabase/server";

type ActionState = {
  error?: string;
  success?: string;
} | null;

const profileSchema = z.object({
  fullName: z.string().min(2),
  homeBase: z.string().min(2),
  email: z.string().email()
});

const residencySchema = z.object({
  citizenships: z.string().min(2),
  taxResidency: z.string().min(2)
});

function toList(value: string) {
  return value
    .split(/[,\n]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isMissingProfilesTableError(message?: string) {
  if (!message) return false;
  return (
    message.includes("Could not find the table 'public.profiles'") ||
    message.includes("relation \"public.profiles\" does not exist")
  );
}

async function getProfileContext() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { error: "Settings updates require Supabase configuration." } as const;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to update settings." } as const;
  }

  return { supabase, user } as const;
}

export async function updateProfileAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    homeBase: formData.get("homeBase"),
    email: formData.get("email")
  });

  if (!parsed.success) {
    return { error: "Please enter a valid name, home base, and email." };
  }

  const context = await getProfileContext();
  if ("error" in context) {
    return { error: context.error };
  }

  const { supabase, user } = context;

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      name: parsed.data.fullName,
      full_name: parsed.data.fullName,
      home_base: parsed.data.homeBase
    }
  });

  if (authError) {
    return { error: authError.message };
  }

  if (parsed.data.email !== user.email) {
    const { error: emailError } = await supabase.auth.updateUser({
      email: parsed.data.email
    });

    if (emailError) {
      return { error: emailError.message };
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      home_base: parsed.data.homeBase,
      email: parsed.data.email
    })
    .eq("auth_user_id", user.id);

  if (error && !isMissingProfilesTableError(error.message)) {
    return { error: error.message };
  }

  revalidatePath("/app", "layout");
  revalidatePath("/app/settings");

  if (error && isMissingProfilesTableError(error.message)) {
    return { success: "Profile updated in Auth metadata. Run DB migrations to enable full profile table sync." };
  }

  return { success: "Profile updated successfully." };
}

export async function updateResidencyAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = residencySchema.safeParse({
    citizenships: formData.get("citizenships"),
    taxResidency: formData.get("taxResidency")
  });

  if (!parsed.success) {
    return { error: "Please provide valid citizenship and residency values." };
  }

  const context = await getProfileContext();
  if ("error" in context) {
    return { error: context.error };
  }

  const { supabase, user } = context;

  const citizenships = toList(parsed.data.citizenships);
  const taxResidency = toList(parsed.data.taxResidency);

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      citizenships,
      tax_residency: taxResidency
    }
  });

  if (authError) {
    return { error: authError.message };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      citizenships,
      tax_residency: taxResidency
    })
    .eq("auth_user_id", user.id);

  if (error && !isMissingProfilesTableError(error.message)) {
    return { error: error.message };
  }

  revalidatePath("/app", "layout");
  revalidatePath("/app/settings");

  if (error && isMissingProfilesTableError(error.message)) {
    return { success: "Residency updated in Auth metadata. Run DB migrations to enable full profile table sync." };
  }

  return { success: "Residency settings updated." };
}
