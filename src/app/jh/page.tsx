import { CalendarPlus, FileQuestion, Megaphone, Users, CheckSquare, BookOpen } from "lucide-react";
import { getJhDashboard } from "@/features/jh/jh.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { ActionCard } from "@/components/layout/action-card";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/layout/section-header";

const shortcuts = [
  { title: "Mi horario", description: "H-204", icon: Users, href: "/jh/grupo" },
  { title: "Checklist", description: "Temas de bienvenida", icon: CheckSquare, href: "/jh/checklist" },
  { title: "Enviar anuncio", description: "Mensaje al grupo", icon: Megaphone, href: "/jh/mensajes" },
  { title: "Agendar reunión", description: "Coordina una fecha", icon: CalendarPlus, href: "/jh/reuniones" },
  { title: "Recursos oficiales", description: "Material validado", icon: BookOpen, href: "/jh/recursos" },
  { title: "Preguntas frecuentes", description: "Dudas comunes", icon: FileQuestion, href: "/jh/faq" }
];

export default async function JhHomePage() {
  const dashboard = await getJhDashboard();

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Hola, María" subtitle="Tu panel como JH de EEGGCC" />
      <section className="grid grid-cols-2 gap-3">
        <StatCard label="Horario" value={dashboard.groupName} />
        <StatCard label="Cachimbos a cargo" value={dashboard.totalStudents} />
        <StatCard label="Activos" value={dashboard.activeStudents} />
        <StatCard label="Onboarding promedio" value={`${Math.round(dashboard.averageProgress)}%`} />
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
        <SectionHeader title="Pendientes de hoy" />
        {dashboard.pendingToday.map((pending) => (
          <Card key={pending} className="text-sm font-semibold text-navy">
            {pending}
          </Card>
        ))}
      </section>
      <Card className="space-y-2 border-pastel-pink bg-pastel-pink/50">
        <h2 className="font-bold text-navy">Tu grupo necesita atencion</h2>
        {dashboard.alerts.map((alert) => (
          <p key={alert} className="text-sm text-muted-foreground">
            {alert}
          </p>
        ))}
      </Card>
    </PageContainer>
  );
}
