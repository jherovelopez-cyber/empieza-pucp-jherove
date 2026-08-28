import { demoUsers, ids } from "@/features/demo/demo-data";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";

export default function JhProfilePage() {
  const user = demoUsers.find((candidate) => candidate.id === ids.jh);

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Perfil" subtitle="Datos demo de JH" />
      <Card className="space-y-2">
        <h2 className="text-xl font-bold text-navy">{user?.fullName}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
        <StatusBadge>JH H-204</StatusBadge>
      </Card>
    </PageContainer>
  );
}
