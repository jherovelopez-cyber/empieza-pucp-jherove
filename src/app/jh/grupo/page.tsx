import { Search } from "lucide-react";
import { getJhGroup } from "@/features/jh/jh.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/feedback/status-badge";

export default async function JhGroupPage() {
  const students = await getJhGroup();
  const active = students.filter((student) => student.active).length;
  const risk = students.filter((student) => student.risk).length;

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Mi grupo" subtitle="Horario H-204" />
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" />
        <Input className="pl-10" placeholder="Buscar estudiante" />
      </label>
      <div className="flex gap-2 overflow-x-auto">
        {["Todos", "Riesgo", "Sin revisar"].map((filter) => (
          <Button key={filter} variant={filter === "Todos" ? "primary" : "secondary"}>
            {filter}
          </Button>
        ))}
      </div>
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="Estudiantes" value="32" />
        <StatCard label="Activos" value={active} />
        <StatCard label="Por acompanar" value={risk} />
      </section>
      <div className="space-y-3">
        {students.map((student) => (
          <Card key={student.id} className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-navy">{student.fullName}</h2>
              <p className="text-sm text-muted-foreground">{student.status}</p>
            </div>
            <StatusBadge tone={student.risk ? "pink" : "green"}>
              {student.risk ? "Seguimiento" : "Activo"}
            </StatusBadge>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
