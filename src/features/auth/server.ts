import { redirect } from "next/navigation";
import { env } from "@/config/env";
import { getHomeRouteForRole } from "@/constants/routes";
import { demoUsers } from "@/features/demo/demo-data";
import { mapProfileToAuthUser, type ProfileRow } from "@/features/auth/profile";
import { createServerSupabaseClient } from "@/services/supabase/server";
import type { DemoUser, UserRole } from "@/types/domain";

export async function getCurrentProfile(): Promise<DemoUser | null> {
  if (env.NEXT_PUBLIC_DEMO_MODE) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  // TEMP AUTH DIAGNOSTIC - remove after investigation
  console.log("AUTH SERVER DEBUG: getUser", {
    hasUser: Boolean(user),
    userId: user?.id ?? null,
    email: user?.email ?? null,
    errorMessage: userError?.message ?? null
  });

  if (userError || !user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,faculty_id,avatar_url")
    .eq("id", user.id)
    .single<ProfileRow>();

  // TEMP AUTH DIAGNOSTIC - remove after investigation
  console.log("AUTH SERVER DEBUG: profile", {
    foundProfile: Boolean(data),
    profileId: data?.id ?? null,
    role: data?.role ?? null,
    errorCode: error?.code ?? null,
    errorMessage: error?.message ?? null
  });

  if (error || !data) return null;

  return mapProfileToAuthUser(data);
}

export async function requireUser(): Promise<DemoUser> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/auth/login");
  return profile;
}

export async function requireRole(role: UserRole): Promise<DemoUser> {
  if (env.NEXT_PUBLIC_DEMO_MODE) {
    return demoUsers.find((user) => user.role === role) ?? demoUsers[0];
  }

  const profile = await requireUser();
  if (profile.role !== role) redirect(getHomeRouteForRole(profile.role));
  return profile;
}

export async function redirectAuthenticatedUser() {
  const profile = await getCurrentProfile();
  if (profile) redirect(getHomeRouteForRole(profile.role));
}
