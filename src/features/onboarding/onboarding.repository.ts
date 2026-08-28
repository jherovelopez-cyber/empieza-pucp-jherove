import { onboardingSteps, studentOnboarding } from "@/features/demo/demo-data";
import { calculateOnboardingProgress } from "@/features/onboarding/onboarding-utils";

export async function getStudentOnboarding(studentId: string) {
  const records = studentOnboarding.filter((record) => record.studentId === studentId);
  return {
    steps: onboardingSteps,
    records,
    progress: calculateOnboardingProgress(onboardingSteps, records)
  };
}

export async function toggleOnboardingStep(studentId: string, stepId: string, completed: boolean) {
  const record = studentOnboarding.find(
    (candidate) => candidate.studentId === studentId && candidate.stepId === stepId
  );

  if (record) {
    record.completed = completed;
    record.completedAt = completed ? new Date().toISOString() : undefined;
  }

  return getStudentOnboarding(studentId);
}
