import type { DemoUser, UserRole } from "@/types/domain";
import { isUserRole } from "@/constants/routes";

export type ProfileRow = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  faculty_id: string | null;
  avatar_url: string | null;
};

export function mapProfileToAuthUser(profile: ProfileRow): DemoUser | null {
  if (!isUserRole(profile.role)) return null;

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    facultyId: profile.faculty_id ?? undefined,
    avatarUrl: profile.avatar_url ?? undefined
  };
}

export function assertValidRole(role: unknown): UserRole {
  if (!isUserRole(role)) {
    throw new Error("El perfil tiene un rol invalido.");
  }

  return role;
}
