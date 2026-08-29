import { describe, expect, it } from "vitest";
import { selectAuthRepositoryMode } from "@/features/auth/auth-service";

describe("auth repository selection", () => {
  it("uses demo auth when demo mode is enabled", () => {
    expect(selectAuthRepositoryMode(true, true)).toBe("demo");
  });

  it("uses demo auth when Supabase is not configured", () => {
    expect(selectAuthRepositoryMode(false, false)).toBe("demo");
  });

  it("uses Supabase auth when demo mode is disabled and Supabase is configured", () => {
    expect(selectAuthRepositoryMode(false, true)).toBe("supabase");
  });
});
