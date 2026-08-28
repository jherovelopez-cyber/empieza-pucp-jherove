import { getJhChecklist } from "@/features/jh/jh.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { ProgressCard } from "@/components/layout/progress-card";
import { ChecklistClient } from "@/features/jh/checklist-client";

export default async function JhChecklistPage() {
  const checklist = await getJhChecklist();
  const completed = checklist.filter((item) => item.status === "completed").length;

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Checklist de bienvenida" subtitle="Temas para tu horario H-204" />
      <ProgressCard
        title="Avance del checklist"
        completed={completed}
        total={checklist.length}
        percent={(completed / checklist.length) * 100}
      />
      <ChecklistClient items={checklist} />
    </PageContainer>
  );
}
