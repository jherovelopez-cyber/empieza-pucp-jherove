import { describe, expect, it } from "vitest";
import { mapProfileToAuthUser } from "@/features/auth/profile";

const baseProfile = {
  id: "user-1",
  email: "student@pucp.edu.pe",
  full_name: "Andrea PUCP",
  faculty_id: null,
  avatar_url: null
};

describe("profile mapping", () => {
  it("maps a valid profile role to an auth user", () => {
    expect(mapProfileToAuthUser({ ...baseProfile, role: "student" })).toMatchObject({
      id: "user-1",
      email: "student@pucp.edu.pe",
      fullName: "Andrea PUCP",
      role: "student"
    });
  });

  it("rejects invalid roles", () => {
    expect(mapProfileToAuthUser({ ...baseProfile, role: "admin" })).toBeNull();
  });
});
