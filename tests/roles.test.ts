import { describe, expect, it } from "vitest";
import {
  canAccessRolePath,
  getHomeRouteForRole,
  getRoleForPath,
  isUserRole,
  roleHome
} from "@/constants/routes";

describe("role routing", () => {
  it("maps protected route prefixes to roles", () => {
    expect(getRoleForPath("/cachimbo/mapa")).toBe("student");
    expect(getRoleForPath("/jh/grupo")).toBe("jh");
    expect(getRoleForPath("/cf/contenido")).toBe("cf");
    expect(getRoleForPath("/auth/login")).toBeNull();
  });

  it("knows role home destinations", () => {
    expect(roleHome.student).toBe("/cachimbo");
    expect(roleHome.jh).toBe("/jh");
    expect(roleHome.cf).toBe("/cf");
  });

  it("maps roles to home routes through the shared helper", () => {
    expect(getHomeRouteForRole("student")).toBe("/cachimbo");
    expect(getHomeRouteForRole("jh")).toBe("/jh");
    expect(getHomeRouteForRole("cf")).toBe("/cf");
  });

  it("blocks access to protected paths for the wrong role", () => {
    expect(canAccessRolePath("student", "/cachimbo/mapa")).toBe(true);
    expect(canAccessRolePath("student", "/jh")).toBe(false);
    expect(canAccessRolePath("jh", "/cf")).toBe(false);
    expect(canAccessRolePath("cf", "/cachimbo")).toBe(false);
    expect(canAccessRolePath("cf", "/auth/login")).toBe(true);
  });

  it("validates known roles", () => {
    expect(isUserRole("student")).toBe(true);
    expect(isUserRole("jh")).toBe(true);
    expect(isUserRole("cf")).toBe(true);
    expect(isUserRole("admin")).toBe(false);
  });
});
