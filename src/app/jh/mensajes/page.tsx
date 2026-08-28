import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/feedback/empty-state";

export default function JhMessagesPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Mensajes" subtitle="Anuncios preparados para el H-204" />
      <EmptyState label="La mensajeria real queda lista para conectarse con Supabase Realtime." />
    </PageContainer>
  );
}
