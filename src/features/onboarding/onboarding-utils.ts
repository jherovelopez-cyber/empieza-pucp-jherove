import type { OnboardingStep, StudentOnboarding } from "@/types/domain";

export type OnboardingProgress = {
  completed: number;
  total: number;
  percent: number;
};

export function calculateOnboardingProgress(
  steps: OnboardingStep[],
  records: StudentOnboarding[]
): OnboardingProgress {
  const activeSteps = steps.filter((step) => step.active);
  const completed = activeSteps.filter((step) =>
    records.some((record) => record.stepId === step.id && record.completed)
  ).length;
  const total = activeSteps.length;

  return {
    completed,
    total,
    percent: total === 0 ? 0 : (completed / total) * 100
  };
}

export function isStepCompleted(stepId: string, records: StudentOnboarding[]) {
  return records.some((record) => record.stepId === stepId && record.completed);
}
