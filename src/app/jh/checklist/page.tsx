import { getJhChecklist } from "@/features/jh/jh.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { ChecklistClient } from "@/features/jh/checklist-client";

export default async function JhChecklistPage() {
  const checklist = await getJhChecklist();
  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Checklist de bienvenida" subtitle="Temas para tu horario H-204" />
      <ChecklistClient items={checklist} />
    </PageContainer>
  );
}
