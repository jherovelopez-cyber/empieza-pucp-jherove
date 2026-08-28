"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/config/env";

export function createBrowserSupabaseClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase no esta configurado. Activa NEXT_PUBLIC_DEMO_MODE=true.");
  }

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
