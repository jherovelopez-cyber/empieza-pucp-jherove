import { ids } from "@/features/demo/demo-data";
import { getStudentCourseGrades } from "@/features/grades/grades.repository";
import { GradesCalculator } from "@/features/grades/grades-calculator";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";

export default async function CoursesPage() {
  const data = await getStudentCourseGrades(ids.student, "course-amga");

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Cursos" subtitle="Calculadora de notas del primer ciclo" />
      <GradesCalculator initialData={data} />
    </PageContainer>
  );
}
