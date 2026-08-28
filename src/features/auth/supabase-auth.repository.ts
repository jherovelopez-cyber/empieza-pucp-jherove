"use client";

import type { AuthRepository, LoginInput } from "@/features/auth/domain";
import { createBrowserSupabaseClient } from "@/services/supabase/client";
import type { DemoUser, UserRole } from "@/types/domain";

export class SupabaseAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<DemoUser | null> {
    const supabase = createBrowserSupabaseClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    return {
      id: data.user.id,
      email: data.user.email ?? "",
      fullName: data.user.user_metadata.full_name ?? "Usuario PUCP",
      role: (data.user.user_metadata.role ?? "student") as UserRole,
      facultyId: data.user.user_metadata.faculty_id
    };
  }

  async login(input: LoginInput) {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password ?? ""
    });
    if (error || !data.user) throw error ?? new Error("No se pudo iniciar sesion.");
    return {
      id: data.user.id,
      email: data.user.email ?? input.email,
      fullName: data.user.user_metadata.full_name ?? "Usuario PUCP",
      role: (data.user.user_metadata.role ?? "student") as UserRole
    };
  }

  async loginAsRole(): Promise<DemoUser> {
    throw new Error("El acceso directo por rol solo existe en modo demo.");
  }

  async logout() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
  }
}
