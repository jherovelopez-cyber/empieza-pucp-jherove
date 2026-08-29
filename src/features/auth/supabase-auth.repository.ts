"use client";

import type { AuthRepository, LoginInput } from "@/features/auth/domain";
import { mapProfileToAuthUser, type ProfileRow } from "@/features/auth/profile";
import { createBrowserSupabaseClient } from "@/services/supabase/client";
import type { DemoUser } from "@/types/domain";

async function getProfileForUserId(userId: string): Promise<DemoUser> {
  const supabase = createBrowserSupabaseClient();

  // TEMP AUTH DIAGNOSTIC - remove after investigation
  console.log("AUTH DEBUG: resolving application profile", {
    userId
  });

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,faculty_id,avatar_url")
    .eq("id", userId)
    .single<ProfileRow>();

  // TEMP AUTH DIAGNOSTIC - remove after investigation
  console.log("AUTH DEBUG: application profile result", {
    foundProfile: Boolean(data),
    role: data?.role ?? null,
    errorCode: error?.code ?? null,
    errorMessage: error?.message ?? null
  });

  if (error || !data) {
    throw new Error("No encontramos tu perfil. Contacta al equipo de Empieza PUCP.");
  }

  const user = mapProfileToAuthUser(data);
  if (!user) {
    throw new Error("Tu perfil tiene un rol invalido. Contacta al equipo de Empieza PUCP.");
  }

  return user;
}

export class SupabaseAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<DemoUser | null> {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return getProfileForUserId(data.user.id);
  }

  async login(input: LoginInput) {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password ?? ""
    });

    // TEMP AUTH DIAGNOSTIC - remove after investigation
    console.log("AUTH DEBUG: signInWithPassword", {
      hasUser: Boolean(data?.user),
      userId: data?.user?.id ?? null,
      email: data?.user?.email ?? null,
      hasSession: Boolean(data?.session),
      errorMessage: error?.message ?? null
    });

    // TEMP AUTH DIAGNOSTIC - remove after investigation
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log("AUTH DEBUG: getUser", {
      hasUser: Boolean(userData?.user),
      userId: userData?.user?.id ?? null,
      email: userData?.user?.email ?? null,
      errorMessage: userError?.message ?? null
    });

    // TEMP AUTH DIAGNOSTIC - remove after investigation
    const userId = data?.user?.id ?? null;
    if (userId) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, email, role")
        .eq("id", userId)
        .maybeSingle<Pick<ProfileRow, "id" | "full_name" | "email" | "role">>();

      console.log("AUTH DEBUG: profile query", {
        requestedUserId: userId,
        foundProfile: Boolean(profile),
        profileId: profile?.id ?? null,
        profileEmail: profile?.email ?? null,
        profileRole: profile?.role ?? null,
        errorCode: profileError?.code ?? null,
        errorMessage: profileError?.message ?? null,
        errorDetails: profileError?.details ?? null,
        errorHint: profileError?.hint ?? null
      });
    } else {
      console.log("AUTH DEBUG: profile query", {
        requestedUserId: userId,
        foundProfile: false,
        profileId: null,
        profileEmail: null,
        profileRole: null,
        errorCode: null,
        errorMessage: "No user id returned by signInWithPassword.",
        errorDetails: null,
        errorHint: null
      });
    }

    if (error || !data.user) {
      throw new Error("No pudimos iniciar sesion. Revisa tu correo y contrasena.");
    }

    return getProfileForUserId(data.user.id);
  }

  async loginAsRole(): Promise<DemoUser> {
    throw new Error("El acceso directo por rol solo existe en modo demo.");
  }

  async logout() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
  }
}
