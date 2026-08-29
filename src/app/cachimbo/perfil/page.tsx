import { requireRole } from "@/features/auth/server";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function StudentProfilePage() {
  const user = await requireRole("student");

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Perfil" subtitle="Datos demo de estudiante" />
      <Card className="space-y-2">
        <h2 className="text-xl font-bold text-navy">{user.fullName}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <StatusBadge>Cachimbo H-204</StatusBadge>
      </Card>
      <LogoutButton />
    </PageContainer>
  );
}
