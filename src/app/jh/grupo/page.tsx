import { getJhGroup } from "@/features/jh/jh.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { GroupClient } from "@/features/jh/group-client";

export default async function JhGroupPage() {
  const students = await getJhGroup();
  const active = students.filter((student) => student.active).length;
  const risk = students.filter((student) => student.risk).length;

  return (
    <PageContainer className="space-y-6">
      <AppHeader title="Mi horario" subtitle="Cachimbos del H-204 · EEGGCC" />
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="Registrados" value={students.length} />
        <StatCard label="Activos" value={active} />
        <StatCard label="Por acompanar" value={risk} />
      </section>
      <GroupClient students={students} />
    </PageContainer>
  );
}
