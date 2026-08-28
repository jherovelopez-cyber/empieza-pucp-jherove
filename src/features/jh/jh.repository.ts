import { ids, jhChecklist, studentSummaries } from "@/features/demo/demo-data";

export async function getJhDashboard(jhId = ids.jh) {
  const total = studentSummaries.length;
  const active = studentSummaries.filter((student) => student.active).length;
  const averageProgress =
    studentSummaries.reduce((sum, student) => sum + student.completedSteps / student.totalSteps, 0) /
    total;

  return {
    groupName: "H-204",
    totalStudents: 32,
    demoListedStudents: total,
    activeStudents: active,
    averageProgress: averageProgress * 100,
    alerts: [
      "6 cachimbos aun no revisan Ubica tus salones",
      "3 aun no activan su correo PUCP"
    ],
    pendingToday: [
      "Responder preguntas frecuentes del H-204",
      "Confirmar reunion de bienvenida",
      "Revisar estudiantes sin avance"
    ],
    checklist: jhChecklist.filter((item) => item.jhId === jhId)
  };
}

export async function getJhGroup() {
  return studentSummaries;
}

export async function getJhChecklist(jhId = ids.jh) {
  return jhChecklist.filter((item) => item.jhId === jhId);
}
