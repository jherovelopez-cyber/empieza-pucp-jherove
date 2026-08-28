import type { Assessment } from "@/types/domain";

export type GradeInput = {
  assessmentId: string;
  grade?: number;
};

export function clampGrade(grade: number) {
  return Math.min(20, Math.max(0, grade));
}

export function calculateWeightedGrade(
  assessments: Pick<Assessment, "id" | "weight">[],
  grades: GradeInput[]
) {
  return assessments.reduce((total, assessment) => {
    const value = grades.find((grade) => grade.assessmentId === assessment.id)?.grade;
    return total + (value === undefined ? 0 : clampGrade(value) * (assessment.weight / 100));
  }, 0);
}

export function calculateCategoryAverage(
  assessments: Pick<Assessment, "id">[],
  grades: GradeInput[]
) {
  const values = assessments
    .map((assessment) => grades.find((grade) => grade.assessmentId === assessment.id)?.grade)
    .filter((grade): grade is number => grade !== undefined);

  if (values.length === 0) return 0;
  return values.reduce((sum, grade) => sum + clampGrade(grade), 0) / values.length;
}

export function calculateProjectedGrade(
  assessments: Pick<Assessment, "id" | "weight">[],
  grades: GradeInput[],
  fallbackGrade: number
) {
  const projected = assessments.map((assessment) => {
    const existing = grades.find((grade) => grade.assessmentId === assessment.id);
    return existing ?? { assessmentId: assessment.id, grade: fallbackGrade };
  });

  return calculateWeightedGrade(assessments, projected);
}

export function calculateRequiredGrade(params: {
  assessments: Pick<Assessment, "id" | "weight">[];
  grades: GradeInput[];
  targetFinalGrade: number;
  targetAssessmentId: string;
}) {
  const target = params.assessments.find(
    (assessment) => assessment.id === params.targetAssessmentId
  );
  if (!target || target.weight <= 0) return null;

  const gradesWithoutTarget = params.grades.filter(
    (grade) => grade.assessmentId !== params.targetAssessmentId
  );
  const current = calculateWeightedGrade(params.assessments, gradesWithoutTarget);
  const required = (params.targetFinalGrade - current) / (target.weight / 100);

  return Math.round(required * 10) / 10;
}
