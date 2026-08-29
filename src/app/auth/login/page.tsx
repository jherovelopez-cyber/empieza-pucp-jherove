import { PageContainer } from "@/components/layout/page-container";
import { env } from "@/config/env";
import { redirectAuthenticatedUser } from "@/features/auth/server";
import { LoginForm } from "@/app/auth/login/login-form";

export default async function LoginPage() {
  await redirectAuthenticatedUser();

  return (
    <PageContainer className="flex flex-col justify-center gap-6 pb-8">
      <header className="space-y-2 text-center">
        <p className="text-sm font-bold text-primary">Empieza PUCP</p>
        <h1 className="text-3xl font-bold text-navy">
          {env.NEXT_PUBLIC_DEMO_MODE ? "Modo demo" : "Iniciar sesion"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {env.NEXT_PUBLIC_DEMO_MODE
            ? "Ingresa con un rol para recorrer la experiencia de hackathon sin credenciales reales."
            : "Usa tus credenciales para entrar a tu espacio de Empieza PUCP."}
        </p>
      </header>
      <LoginForm />
    </PageContainer>
  );
}
