import { getCfJhs } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { JhManagementClient } from "@/features/cf/jh-management-client";

export default async function CfJhPage() {
  const jhs = await getCfJhs();
  return <PageContainer className="space-y-6">
    <AppHeader title="Gestión de JH" subtitle="Asignación y seguimiento" />
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="JH" value={jhs.length} />
      <StatCard label="Asignados" value={jhs.filter((jh) => jh.groupName).length} />
      <StatCard label="Sin asignar" value={jhs.filter((jh) => !jh.groupName).length} />
      <StatCard label="Seguimiento" value={jhs.filter((jh) => jh.risk).length} />
    </section>
    <JhManagementClient jhs={jhs} />
  </PageContainer>;
}
