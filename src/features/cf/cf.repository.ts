import { cfGroups, cfJhs, cfOnboardingMetrics, contentResources, ids } from "@/features/demo/demo-data";

export async function getCfDashboard() {
  return {
    activeJhs: cfJhs.filter((jh) => Boolean(jh.groupName)).length,
    totalJhs: cfJhs.length,
    assignedGroups: cfGroups.filter((group) => group.status !== "unassigned").length,
    totalGroups: cfGroups.length,
    riskGroups: cfGroups.filter((group) => group.status === "risk").length,
    averageOnboarding: 76,
    pending: [
      "Asignar JH a los horarios H-401 y H-406",
      "Revisar la guía de correo PUCP antes de publicarla",
      "Confirmar reunión de coordinación con JH en riesgo"
    ],
    alerts: [
      "2 horarios todavía no tienen JH asignado",
      "3 horarios presentan cobertura menor al 50%",
      "Renato y Lucía requieren seguimiento de checklist"
    ]
  };
}

export async function getCfJhs() {
  return cfJhs;
}

export async function getCfContent(facultyId = ids.faculty) {
  return contentResources.filter((content) => content.facultyId === facultyId);
}

export async function getCfGroups() {
  return cfGroups;
}

export async function getCfReports() {
  const riskJhs = cfJhs
    .filter((jh) => jh.risk)
    .sort((a, b) => Number.parseInt(a.checklistProgress) - Number.parseInt(b.checklistProgress));
  return {
    averageOnboarding: 76,
    reachedStudents: 211,
    totalStudents: 244,
    assignedCoverage: 75,
    metrics: cfOnboardingMetrics,
    riskJhs
  };
}
