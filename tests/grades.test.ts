import { describe, expect, it } from "vitest";
import {
  calculateCategoryAverage,
  calculateProjectedGrade,
  calculateRequiredGrade,
  calculateWeightedGrade
} from "@/features/grades/grade-calculations";

const assessments = [
  { id: "pa", weight: 30 },
  { id: "pd", weight: 10 },
  { id: "e1", weight: 30 },
  { id: "e2", weight: 30 }
];

describe("grade calculations", () => {
  it("calculates weighted grades", () => {
    expect(
      calculateWeightedGrade(assessments, [
        { assessmentId: "pa", grade: 12 },
        { assessmentId: "pd", grade: 16 },
        { assessmentId: "e1", grade: 10 },
        { assessmentId: "e2", grade: 14 }
      ])
    ).toBeCloseTo(12.4);
  });

  it("calculates category averages", () => {
    expect(
      calculateCategoryAverage(
        [{ id: "pc1" }, { id: "pc2" }],
        [
          { assessmentId: "pc1", grade: 12 },
          { assessmentId: "pc2", grade: 16 }
        ]
      )
    ).toBe(14);
  });

  it("projects missing grades", () => {
    expect(calculateProjectedGrade(assessments, [{ assessmentId: "pa", grade: 10 }], 12)).toBeCloseTo(11.4);
  });

  it("calculates required grade for a target assessment", () => {
    expect(
      calculateRequiredGrade({
        assessments,
        grades: [
          { assessmentId: "pa", grade: 12 },
          { assessmentId: "pd", grade: 16 },
          { assessmentId: "e1", grade: 10 }
        ],
        targetAssessmentId: "e2",
        targetFinalGrade: 11
      })
    ).toBe(9.3);
  });
});
