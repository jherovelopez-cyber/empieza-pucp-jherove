"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck, Users } from "lucide-react";
import { createAuthRepository } from "@/features/auth/auth-service";
import { getHomeRouteForRole } from "@/constants/routes";
import { env } from "@/config/env";
import type { UserRole } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const demoRoles: { role: UserRole; label: string; helper: string; icon: typeof GraduationCap }[] = [
  {
    role: "student",
    label: "Entrar como Cachimbo",
    helper: "student@demo.com",
    icon: GraduationCap
  },
  {
    role: "jh",
    label: "Entrar como JH",
    helper: "jh@demo.com",
    icon: Users
  },
  {
    role: "cf",
    label: "Entrar como Centro Federado",
    helper: "cf@demo.com",
    icon: ShieldCheck
  }
];

export function LoginForm() {
  const router = useRouter();
  const auth = useMemo(() => createAuthRepository(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDemoLogin(role: UserRole) {
    setError(null);
    setLoading(true);
    try {
      const user = await auth.loginAsRole(role);
      router.push(getHomeRouteForRole(user.role));
    } catch {
      setError("No pudimos iniciar sesion demo. Intentalo otra vez.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRealLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await auth.login({ email, password });
      router.push(getHomeRouteForRole(user.role));
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No pudimos iniciar sesion.");
    } finally {
      setLoading(false);
    }
  }

  if (env.NEXT_PUBLIC_DEMO_MODE) {
    return (
      <div className="space-y-3">
        {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}
        {demoRoles.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.role} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-lg bg-pastel-blue text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold text-navy">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.helper}</p>
                </div>
              </div>
              <Button aria-label={item.label} disabled={loading} onClick={() => handleDemoLogin(item.role)}>
                Entrar
              </Button>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleRealLogin}>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy" htmlFor="email">
          Correo
        </label>
        <Input
          id="email"
          autoComplete="email"
          inputMode="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu.correo@pucp.edu.pe"
          required
          type="email"
          value={email}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-navy" htmlFor="password">
          Contrasena
        </label>
        <Input
          id="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>
      {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}
      <Button className="w-full" disabled={loading} type="submit">
        {loading ? "Iniciando..." : "Iniciar sesion"}
      </Button>
    </form>
  );
}
