import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/feedback/empty-state";

export default function CfAnnouncementsPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Anuncios" subtitle="Difusion por facultad o grupo" />
      <EmptyState label="Los anuncios masivos se conectaran luego a Supabase y notificaciones." />
    </PageContainer>
  );
}
