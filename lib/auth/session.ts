import { createSupabaseServerClient } from "@/lib/db/supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}
