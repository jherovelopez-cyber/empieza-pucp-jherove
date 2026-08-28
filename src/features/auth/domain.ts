import type { DemoUser, UserRole } from "@/types/domain";

export type LoginInput = {
  email: string;
  password?: string;
};

export interface AuthRepository {
  getCurrentUser(): Promise<DemoUser | null>;
  login(input: LoginInput): Promise<DemoUser>;
  loginAsRole(role: UserRole): Promise<DemoUser>;
  logout(): Promise<void>;
}
