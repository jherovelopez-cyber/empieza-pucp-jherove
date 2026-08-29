"use client";

import { env, isSupabaseConfigured } from "@/config/env";
import { DemoAuthRepository } from "@/features/auth/demo-auth.repository";
import type { AuthRepository } from "@/features/auth/domain";
import { SupabaseAuthRepository } from "@/features/auth/supabase-auth.repository";

export type AuthRepositoryMode = "demo" | "supabase";

export function selectAuthRepositoryMode(demoMode: boolean, supabaseConfigured: boolean): AuthRepositoryMode {
  return demoMode || !supabaseConfigured ? "demo" : "supabase";
}

export function createAuthRepository(): AuthRepository {
  if (selectAuthRepositoryMode(env.NEXT_PUBLIC_DEMO_MODE, isSupabaseConfigured) === "demo") {
    return new DemoAuthRepository();
  }

  return new SupabaseAuthRepository();
}
