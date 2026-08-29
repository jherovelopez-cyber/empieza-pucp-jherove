import { AlertTriangle, BarChart3, Bell, FileText, Users, CalendarDays } from "lucide-react";
import { getCfDashboard } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { ActionCard } from "@/components/layout/action-card";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/layout/section-header";

const shortcuts = [
  { title: "Gestionar JH", description: "Asignación y seguimiento", icon: Users, href: "/cf/jh" },
  { title: "Asignar horarios", description: "Cobertura de grupos", icon: CalendarDays, href: "/cf/horarios" },
  { title: "Contenido oficial", description: "Recursos validados", icon: FileText, href: "/cf/contenido" },
  { title: "Anuncios masivos", description: "Difusión por facultad", icon: Bell, href: "/cf/anuncios" },
  { title: "Alertas", description: "Horarios en riesgo", icon: AlertTriangle, href: "/cf/horarios" },
  { title: "Reportes", description: "Avance de onboarding", icon: BarChart3, href: "/cf/reportes" }
];

export default async function CfHomePage() {
  const dashboard = await getCfDashboard();

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Hola, Centro Federado" subtitle="Coordinación de cachimbos EEGGCC" />
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="JH asignados" value={`${dashboard.activeJhs}/${dashboard.totalJhs}`} />
        <StatCard label="Horarios cubiertos" value={`${dashboard.assignedGroups}/${dashboard.totalGroups}`} />
        <StatCard label="En riesgo" value={dashboard.riskGroups} helper="Requieren seguimiento" />
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
        <SectionHeader title="Pendientes operativos" />
        {dashboard.pending.map((pending) => (
          <Card key={pending} className="text-sm font-semibold text-navy">
            {pending}
          </Card>
        ))}
      </section>
      <Card className="space-y-3 border-pink-200 bg-pastel-pink/50">
        <h2 className="flex items-center gap-2 font-bold text-navy"><AlertTriangle className="size-5 text-pink-600" />Alertas urgentes</h2>
        {dashboard.alerts.map((alert) => (
          <p key={alert} className="text-sm text-muted-foreground">
            {alert}
          </p>
        ))}
      </Card>
    </PageContainer>
  );
}
