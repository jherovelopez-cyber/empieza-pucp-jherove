import { cfJhs, contentResources, ids } from "@/features/demo/demo-data";

export async function getCfDashboard() {
  return {
    activeJhs: 18,
    assignedGroups: 24,
    averageOnboarding: 81,
    pending: [
      "Asignar 3 horarios sin JH",
      "Publicar guia de primera semana",
      "Confirmar reunion de coordinacion"
    ],
    alerts: [
      "2 horarios aun no tienen JH asignado",
      "5 JH no completan su checklist base"
    ]
  };
}

export async function getCfJhs() {
  return cfJhs;
}

export async function getCfContent(facultyId = ids.faculty) {
  return contentResources.filter((content) => content.facultyId === facultyId);
}
