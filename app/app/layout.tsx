import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const user = await getCurrentUser();
  const userName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    user?.email?.split("@")[0];

  if (hasSupabase && !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar userName={userName} />
          <main className="flex-1 p-5 lg:p-9">
            <div className="mx-auto w-full max-w-[1260px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
