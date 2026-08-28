"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import type { Assessment, StudentGrade } from "@/types/domain";
import {
  calculateCategoryAverage,
  calculateProjectedGrade,
  calculateRequiredGrade,
  calculateWeightedGrade
} from "@/features/grades/grade-calculations";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/layout/stat-card";
import { StatusBadge } from "@/components/feedback/status-badge";

type Data = Awaited<ReturnType<typeof import("@/features/grades/grades.repository").getStudentCourseGrades>>;

export function GradesCalculator({ initialData }: { initialData: Data }) {
  const [grades, setGrades] = useState<StudentGrade[]>(initialData.grades);
  const assessments = initialData.assessments;
  const finalGrade = useMemo(() => calculateWeightedGrade(assessments, grades), [assessments, grades]);
  const projected = useMemo(
    () => calculateProjectedGrade(assessments, grades, 13),
    [assessments, grades]
  );
  const requiredE2 = calculateRequiredGrade({
    assessments,
    grades,
    targetFinalGrade: 11,
    targetAssessmentId: "assess-E2"
  });
  const risk = projected < 11;

  function updateGrade(assessmentId: string, value: string) {
    const nextGrade = value === "" ? undefined : Number(value);
    setGrades((current) => {
      const existing = current.find((grade) => grade.assessmentId === assessmentId);
      if (existing) {
        return current.map((grade) =>
          grade.assessmentId === assessmentId ? { ...grade, grade: nextGrade ?? 0 } : grade
        );
      }
      return [
        ...current,
        { id: `local-${assessmentId}`, studentId: "usr-andrea", assessmentId, grade: nextGrade ?? 0 }
      ];
    });
  }

  const categories = ["PA", "PD", "E1", "E2"] as const;

  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="size-5 text-primary" aria-hidden="true" />
          <h2 className="font-bold text-navy">
            {initialData.course?.code} - {initialData.course?.name}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">Escala vigesimal 0-20. El motor funciona con cualquier esquema ponderado.</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Nota exacta" value={finalGrade.toFixed(2)} />
        <StatCard label="Nota final proyectada" value={projected.toFixed(2)} />
        <StatCard
          label="Promedio PA"
          value={calculateCategoryAverage(
            assessments.filter((assessment) => assessment.category === "PA"),
            grades
          ).toFixed(2)}
        />
        <StatCard
          label="Promedio PD"
          value={calculateCategoryAverage(
            assessments.filter((assessment) => assessment.category === "PD"),
            grades
          ).toFixed(2)}
        />
      </div>

      <Card className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold text-navy">Cuanto necesito para aprobar</h2>
          <StatusBadge tone={risk ? "pink" : "green"}>{risk ? "En riesgo" : "En ruta"}</StatusBadge>
        </div>
        <p className="text-sm text-muted-foreground">
          {requiredE2 === null
            ? "No hay una evaluacion pendiente configurada."
            : `Necesitas ${requiredE2.toFixed(1)} en E2 para terminar con 11.`}
        </p>
      </Card>

      {categories.map((category) => (
        <section key={category} className="space-y-3">
          <h2 className="font-bold text-navy">
            {category === "PA" && "Practicas calificadas"}
            {category === "PD" && "Practicas dirigidas"}
            {category === "E1" && "Examen 1"}
            {category === "E2" && "Examen 2"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {assessments
              .filter((assessment) => assessment.category === category)
              .map((assessment: Assessment) => {
                const grade = grades.find((item) => item.assessmentId === assessment.id)?.grade;
                return (
                  <label key={assessment.id} className="space-y-1 rounded-xl border bg-white p-3">
                    <span className="text-sm font-semibold text-navy">
                      {assessment.shortName} ({assessment.weight}%)
                    </span>
                    <Input
                      type="number"
                      min={0}
                      max={20}
                      step={0.1}
                      value={grade ?? ""}
                      onChange={(event) => updateGrade(assessment.id, event.target.value)}
                    />
                  </label>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
