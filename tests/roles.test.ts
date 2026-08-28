import { describe, expect, it } from "vitest";
import { getRoleForPath, roleHome } from "@/constants/routes";

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
});
