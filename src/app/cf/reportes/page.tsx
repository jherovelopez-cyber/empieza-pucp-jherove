import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/feedback/empty-state";

export default function CfReportsPage() {
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Reportes" subtitle="Indicadores de acompanamiento" />
      <EmptyState label="Los reportes agregados quedan como siguiente modulo de analitica." />
    </PageContainer>
  );
}
