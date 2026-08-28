import { demoUsers, ids } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";

export default function CfProfilePage() {
  const user = demoUsers.find((candidate) => candidate.id === ids.cf);

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Perfil" subtitle="Datos demo de Centro Federado" />
      <Card className="space-y-2">
        <h2 className="text-xl font-bold text-navy">{user?.fullName}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <StatusBadge>Centro Federado EEGGLL</StatusBadge>
      </Card>
    </PageContainer>
  );
}
