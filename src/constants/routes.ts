import type { UserRole } from "@/types/domain";

export const roleHome: Record<UserRole, string> = {
  student: "/cachimbo",
  jh: "/jh",
  cf: "/cf"
};

export const roleRoutePrefix: Record<UserRole, string> = {
  student: "/cachimbo",
  jh: "/jh",
  cf: "/cf"
};

export function getRoleForPath(pathname: string): UserRole | null {
  if (pathname.startsWith("/cachimbo")) return "student";
  if (pathname.startsWith("/jh")) return "jh";
  if (pathname.startsWith("/cf")) return "cf";
  return null;
}

export function getHomeRouteForRole(role: UserRole): string {
  return roleHome[role];
}

export function isUserRole(value: unknown): value is UserRole {
  return value === "student" || value === "jh" || value === "cf";
}

export function canAccessRolePath(userRole: UserRole, pathname: string): boolean {
  const requiredRole = getRoleForPath(pathname);
  return !requiredRole || requiredRole === userRole;
}
