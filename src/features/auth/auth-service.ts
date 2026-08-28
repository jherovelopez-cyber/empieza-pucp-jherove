"use client";

import { env, isSupabaseConfigured } from "@/config/env";
import { DemoAuthRepository } from "@/features/auth/demo-auth.repository";
import type { AuthRepository } from "@/features/auth/domain";
import { SupabaseAuthRepository } from "@/features/auth/supabase-auth.repository";

export function createAuthRepository(): AuthRepository {
  if (env.NEXT_PUBLIC_DEMO_MODE || !isSupabaseConfigured) {
    return new DemoAuthRepository();
  }

  return new SupabaseAuthRepository();
}
