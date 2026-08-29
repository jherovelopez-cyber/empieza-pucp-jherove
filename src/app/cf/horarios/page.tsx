import { getCfGroups } from "@/features/cf/cf.repository";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { StatCard } from "@/components/layout/stat-card";
import { GroupsClient } from "@/features/cf/groups-client";
export default async function CfGroupsPage() { const groups = await getCfGroups(); return <PageContainer className="space-y-6"><AppHeader title="Horarios" subtitle="Cobertura de grupos EEGGCC" /><section className="grid grid-cols-3 gap-3"><StatCard label="Total" value={groups.length} /><StatCard label="Sin asignar" value={groups.filter((g) => g.status === "unassigned").length} /><StatCard label="En riesgo" value={groups.filter((g) => g.status === "risk").length} /></section><GroupsClient initialGroups={groups} /></PageContainer>; }
