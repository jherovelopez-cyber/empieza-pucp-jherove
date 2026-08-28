import { AlertTriangle, BarChart3, Bell, FileText, Users, CalendarDays } from "lucide-react";
import { getCfDashboard } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { ActionCard } from "@/components/layout/action-card";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/layout/section-header";

const shortcuts = [
  { title: "Gestionar JH", description: "Asignacion y seguimiento", icon: Users },
  { title: "Asignar horarios", description: "Cobertura de grupos", icon: CalendarDays },
  { title: "Contenido oficial", description: "Recursos validados", icon: FileText },
  { title: "Anuncios masivos", description: "Difusion por facultad", icon: Bell },
  { title: "Alertas", description: "Horarios en riesgo", icon: AlertTriangle },
  { title: "Reportes", description: "Avance de onboarding", icon: BarChart3 }
];

export default async function CfHomePage() {
  const dashboard = await getCfDashboard();

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Hola, Centro Federado" subtitle="Panel general de coordinacion" />
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="JH activos" value={dashboard.activeJhs} />
        <StatCard label="Horarios" value={dashboard.assignedGroups} />
        <StatCard label="Onboarding" value={`${dashboard.averageOnboarding}%`} />
      </section>
      <section className="space-y-3">
        <SectionHeader title="Atajos" />
        <div className="grid gap-3 sm:grid-cols-2">
          {shortcuts.map((shortcut) => (
            <ActionCard key={shortcut.title} {...shortcut} />
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <SectionHeader title="Pendientes" />
        {dashboard.pending.map((pending) => (
          <Card key={pending} className="text-sm font-semibold text-navy">
            {pending}
          </Card>
        ))}
      </section>
      <Card className="space-y-2 border-pastel-yellow bg-pastel-yellow/50">
        <h2 className="font-bold text-navy">Alertas</h2>
        {dashboard.alerts.map((alert) => (
          <p key={alert} className="text-sm text-muted-foreground">
            {alert}
          </p>
        ))}
      </Card>
    </PageContainer>
  );
}
