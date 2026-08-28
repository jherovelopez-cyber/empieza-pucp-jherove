import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().or(z.literal("")),
  NEXT_PUBLIC_DEMO_MODE: z
    .string()
    .optional()
    .default("true")
    .transform((value) => value !== "false")
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE
});

if (!parsed.success) {
  throw new Error("Variables de entorno invalidas para Empieza PUCP.");
}

export const env = parsed.data;

export const isSupabaseConfigured =
  Boolean(env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
  !env.NEXT_PUBLIC_DEMO_MODE;
