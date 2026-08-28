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
