"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { StudentSummary } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/feedback/status-badge";
import { EmptyState } from "@/components/feedback/empty-state";

const filters = ["Todos", "Seguimiento", "Onboarding bajo (< 50%)", "Sin revisar"] as const;

function getProgress(student: StudentSummary) {
  return student.totalSteps ? student.completedSteps / student.totalSteps : 0;
}

export function GroupClient({ students }: { students: StudentSummary[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const lowestProgress = students.length ? Math.min(...students.map(getProgress)) : 0;

  const visibleStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    return [...students]
      .filter((student) => {
        const progress = getProgress(student);
        const matchesQuery =
          !normalizedQuery ||
          student.fullName.toLocaleLowerCase("es").includes(normalizedQuery) ||
          student.email.toLocaleLowerCase("es").includes(normalizedQuery);
        const matchesFilter =
          filter === "Todos" ||
          (filter === "Seguimiento" && student.risk) ||
          (filter === "Onboarding bajo (< 50%)" && progress < 0.5) ||
          (filter === "Sin revisar" && student.completedSteps === 0);
        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => Number(b.risk) - Number(a.risk) || getProgress(a) - getProgress(b));
  }, [filter, query, students]);

  return (
    <div className="space-y-4">
      <label className="relative block">
        <span className="sr-only">Buscar cachimbo</span>
        <Search className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Buscar por nombre o correo"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="flex gap-2 overflow-x-auto" aria-label="Filtrar cachimbos">
        {filters.map((item) => (
          <Button key={item} variant={filter === item ? "primary" : "secondary"} onClick={() => setFilter(item)}>
            {item}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Mostrando {visibleStudents.length} de {students.length} cachimbos · ordenados por riesgo
      </p>
      <div className="space-y-3">
        {visibleStudents.map((student) => {
          const progress = Math.round(getProgress(student) * 100);
          const hasLowestProgress = getProgress(student) === lowestProgress;
          return (
            <Card
              key={student.id}
              className={`flex items-center justify-between gap-3 ${
                hasLowestProgress ? "border-pink-300 bg-pastel-pink/40 ring-1 ring-pink-200" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-navy">{student.fullName}</h2>
                <p className="truncate text-xs text-muted-foreground">{student.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{student.status}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-navy">{progress}%</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                {hasLowestProgress ? <StatusBadge tone="pink">Menor avance</StatusBadge> : null}
                <StatusBadge tone={student.risk ? "pink" : "green"}>
                  {student.risk ? "Seguimiento" : "Al día"}
                </StatusBadge>
              </div>
            </Card>
          );
        })}
        {visibleStudents.length === 0 ? <EmptyState label="No hay cachimbos que coincidan con la búsqueda." /> : null}
      </div>
    </div>
  );
}
