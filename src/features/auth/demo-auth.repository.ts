"use client";

import type { AuthRepository, LoginInput } from "@/features/auth/domain";
import { demoUsers } from "@/features/demo/demo-data";
import type { DemoUser, UserRole } from "@/types/domain";

const storageKey = "empieza-demo-user";

function persistUser(user: DemoUser) {
  window.localStorage.setItem(storageKey, JSON.stringify(user));
  document.cookie = `empieza_role=${user.role}; path=/; max-age=2592000; SameSite=Lax`;
}

export class DemoAuthRepository implements AuthRepository {
  async getCurrentUser() {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  }

  async login(input: LoginInput) {
    const user = demoUsers.find((candidate) => candidate.email === input.email);
    if (!user) throw new Error("Usuario demo no encontrado.");
    persistUser(user);
    return user;
  }

  async loginAsRole(role: UserRole) {
    const user = demoUsers.find((candidate) => candidate.role === role);
    if (!user) throw new Error("Rol demo no encontrado.");
    persistUser(user);
    return user;
  }

  async logout() {
    window.localStorage.removeItem(storageKey);
    document.cookie = "empieza_role=; path=/; max-age=0; SameSite=Lax";
  }
}
