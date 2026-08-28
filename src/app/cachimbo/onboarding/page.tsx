import { ids } from "@/features/demo/demo-data";
import { getStudentOnboarding } from "@/features/onboarding/onboarding.repository";
import { OnboardingList } from "@/features/onboarding/onboarding-list";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { ProgressCard } from "@/components/layout/progress-card";

export default async function OnboardingPage() {
  const data = await getStudentOnboarding(ids.student);

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Onboarding" subtitle="Etapas para adaptarte a la vida universitaria" />
      <ProgressCard title="Tu avance" {...data.progress} />
      <OnboardingList initialData={data} studentId={ids.student} />
    </PageContainer>
  );
}
