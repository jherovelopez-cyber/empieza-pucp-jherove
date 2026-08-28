import { Search } from "lucide-react";
import { getCfJhs } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/feedback/status-badge";

export default async function CfJhPage() {
  const jhs = await getCfJhs();

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Gestion de JH" subtitle="Asignacion y seguimiento" />
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" />
        <Input className="pl-10" placeholder="Buscar JH o horario" />
      </label>
      <div className="flex gap-2 overflow-x-auto">
        {["Todos", "Sin asignar", "Con riesgo"].map((filter) => (
          <Button key={filter} variant={filter === "Todos" ? "primary" : "secondary"}>
            {filter}
          </Button>
        ))}
      </div>
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="JH" value="18" />
        <StatCard label="Horarios" value="24" />
        <StatCard label="Sin asignar" value="3" />
        <StatCard label="Seguimiento" value="5" />
      </section>
      <div className="space-y-3">
        {jhs.map((jh) => (
          <Card key={jh.id} className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-navy">{jh.fullName}</h2>
              <p className="text-sm text-muted-foreground">
                {jh.groupName ?? "Sin horario"} · Checklist {jh.checklistProgress}
              </p>
            </div>
            <StatusBadge tone={jh.risk ? "yellow" : "green"}>{jh.status}</StatusBadge>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
