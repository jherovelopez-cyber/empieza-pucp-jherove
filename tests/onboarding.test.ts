import { describe, expect, it } from "vitest";
import { calculateOnboardingProgress } from "@/features/onboarding/onboarding-utils";
import type { OnboardingStep, StudentOnboarding } from "@/types/domain";

const steps: OnboardingStep[] = [
  {
    id: "a",
    title: "A",
    description: "A",
    category: "first_week",
    sortOrder: 1,
    sourceType: "official",
    official: true,
    active: true
  },
  {
    id: "b",
    title: "B",
    description: "B",
    category: "first_week",
    sortOrder: 2,
    sourceType: "jh",
    official: false,
    active: true
  }
];

describe("onboarding progress", () => {
  it("derives progress from completed records", () => {
    const records: StudentOnboarding[] = [{ studentId: "s", stepId: "a", completed: true }];
    expect(calculateOnboardingProgress(steps, records)).toEqual({
      completed: 1,
      total: 2,
      percent: 50
    });
  });
});
