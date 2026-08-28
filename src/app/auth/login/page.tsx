"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck, Users } from "lucide-react";
import { createAuthRepository } from "@/features/auth/auth-service";
import { roleHome } from "@/constants/routes";
import type { UserRole } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";

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

export default function LoginPage() {
  const router = useRouter();
  const auth = createAuthRepository();

  async function handleDemoLogin(role: UserRole) {
    const user = await auth.loginAsRole(role);
    router.push(roleHome[user.role]);
  }

  return (
    <PageContainer className="flex flex-col justify-center gap-6 pb-8">
      <header className="space-y-2 text-center">
        <p className="text-sm font-bold text-primary">Empieza PUCP</p>
        <h1 className="text-3xl font-bold text-navy">Modo demo</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa con un rol para recorrer la experiencia de hackathon sin credenciales reales.
        </p>
      </header>
      <div className="space-y-3">
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
              <Button aria-label={item.label} onClick={() => handleDemoLogin(item.role)}>
                Entrar
              </Button>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
