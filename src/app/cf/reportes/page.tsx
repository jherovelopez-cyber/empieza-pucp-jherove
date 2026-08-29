import { getCfReports } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/feedback/status-badge";

export default async function CfReportsPage() {
  const report = await getCfReports();
  return <PageContainer className="space-y-6">
    <AppHeader title="Reportes" subtitle="Indicadores de acompañamiento EEGGCC" />
    <section className="grid grid-cols-2 gap-3"><StatCard label="Onboarding promedio" value={`${report.averageOnboarding}%`} /><StatCard label="Cachimbos alcanzados" value={`${report.reachedStudents}/${report.totalStudents}`} /><StatCard label="Cobertura JH" value={`${report.assignedCoverage}%`} /><StatCard label="JH en riesgo" value={report.riskJhs.length} /></section>
    <section className="space-y-3"><SectionHeader title="Avance por hito" />{report.metrics.map((metric) => <Card key={metric.label} className="space-y-2"><div className="flex justify-between text-sm"><span className="font-semibold text-navy">{metric.label}</span><strong>{metric.value}%</strong></div><div className="h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${metric.value}%` }} /></div></Card>)}</section>
    <section className="space-y-3"><SectionHeader title="JH que requieren seguimiento" subtitle="Ordenados por menor avance" />{report.riskJhs.slice(0, 4).map((jh) => <Card key={jh.id} className="flex items-center justify-between gap-3"><div><h2 className="font-bold text-navy">{jh.fullName}</h2><p className="text-sm text-muted-foreground">{jh.groupName ?? "Sin horario"} · Checklist {jh.checklistProgress}</p></div><StatusBadge tone="pink">Riesgo</StatusBadge></Card>)}</section>
  </PageContainer>;
}
