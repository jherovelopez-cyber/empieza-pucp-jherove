import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/feedback/empty-state";

export default function CfGroupsPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Horarios" subtitle="Asignacion de grupos por facultad" />
      <EmptyState label="La gestion detallada de horarios queda preparada para Supabase." />
    </PageContainer>
  );
}
