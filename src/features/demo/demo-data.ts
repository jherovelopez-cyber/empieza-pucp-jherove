import type {
  Announcement,
  Assessment,
  AssessmentScheme,
  CampusNode,
  CampusPlace,
  CampusRoute,
  CfJhSummary,
  ContentResource,
  Course,
  DemoUser,
  Faculty,
  Group,
  JhChecklistItem,
  OnboardingStep,
  Semester,
  StudentGrade,
  StudentOnboarding,
  StudentSummary
} from "@/types/domain";

export const ids = {
  faculty: "fac-ciencias",
  semester: "sem-2027-1",
  group: "grp-h-204",
  student: "usr-andrea",
  jh: "usr-maria",
  cf: "usr-cf"
};

export const demoUsers: DemoUser[] = [
  {
    id: ids.student,
    email: "student@demo.com",
    fullName: "Andrea Valdivia",
    role: "student",
    facultyId: ids.faculty
  },
  {
    id: ids.jh,
    email: "jh@demo.com",
    fullName: "María Fernanda Ríos",
    role: "jh",
    facultyId: ids.faculty
  },
  {
    id: ids.cf,
    email: "cf@demo.com",
    fullName: "Centro Federado",
    role: "cf",
    facultyId: ids.faculty
  }
];

export const faculties: Faculty[] = [
  { id: "fac-eeggll", name: "Estudios Generales Letras", code: "EEGGLL", letter: "L" },
  { id: ids.faculty, name: "Estudios Generales Ciencias", code: "EEGGCC", letter: "C" },
  { id: "fac-sociales", name: "Ciencias Sociales", code: "SOC", letter: "S" }
];

export const semesters: Semester[] = [
  {
    id: ids.semester,
    name: "2027-1",
    startDate: "2027-03-16",
    endDate: "2027-07-18",
    active: true
  }
];

export const groups: Group[] = [
  {
    id: ids.group,
    name: "H-204",
    facultyId: ids.faculty,
    jhId: ids.jh,
    semesterId: ids.semester
  }
];

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "step-mail",
    title: "Conoce tu correo PUCP",
    description: "Revisa tu cuenta institucional y configura recuperacion.",
    category: "before_classes",
    sortOrder: 1,
    sourceType: "official",
    official: true,
    active: true
  },
  {
    id: "step-platforms",
    title: "Activa tus plataformas",
    description: "Ingresa a PAIDEIA, campus virtual y servicios digitales.",
    category: "before_classes",
    sortOrder: 2,
    sourceType: "official",
    official: true,
    active: true
  },
  {
    id: "step-map",
    title: "Ubica tus salones",
    description: "Encuentra letras, pabellones y rutas frecuentes.",
    category: "first_week",
    sortOrder: 3,
    sourceType: "jh",
    official: false,
    active: true
  },
  {
    id: "step-daes",
    title: "Conoce DAES",
    description: "Identifica servicios de bienestar y acompanamiento.",
    category: "first_week",
    sortOrder: 4,
    sourceType: "official",
    official: true,
    active: true
  },
  {
    id: "step-cf",
    title: "Conoce tu Centro Federado",
    description: "Ubica canales, representantes y actividades de bienvenida.",
    category: "first_week",
    sortOrder: 5,
    sourceType: "cf",
    official: false,
    active: true
  },
  {
    id: "step-jh",
    title: "Conoce a tu JH",
    description: "Guarda su contacto y revisa los acuerdos de tu horario.",
    category: "first_week",
    sortOrder: 6,
    sourceType: "jh",
    official: false,
    active: true
  },
  {
    id: "step-paperwork",
    title: "Tramites importantes",
    description: "Ten claras las fechas de carnet, pagos y constancias.",
    category: "first_month",
    sortOrder: 7,
    sourceType: "official",
    official: true,
    active: true
  },
  {
    id: "step-wellbeing",
    title: "Servicios de bienestar",
    description: "Explora apoyo psicologico, topico y deportes.",
    category: "during_semester",
    sortOrder: 8,
    sourceType: "official",
    official: true,
    active: true
  }
];

export const studentOnboarding: StudentOnboarding[] = onboardingSteps.map((step, index) => ({
  studentId: ids.student,
  stepId: step.id,
  completed: index < 4,
  completedAt: index < 4 ? "2027-03-10T14:00:00Z" : undefined
}));

export const studentSummaries: StudentSummary[] = [
  ["Andrea Valdivia", "Completó 4/8", 4, true, true],
  ["Bruno Torres", "Completó 8/8", 8, false, true],
  ["Camila Ruiz", "Revisó 5/8", 5, false, true],
  ["Diego Mejia", "No activa correo", 2, true, true],
  ["Elena Paredes", "Sin revisar mapa", 3, true, true],
  ["Fabian Soto", "Asistencia baja", 4, true, false],
  ["Gabriela Luna", "Completó 7/8", 7, false, true],
  ["Hugo Castro", "Sin revisar", 0, true, false],
  ["Isabel Diaz", "Revisó 6/8", 6, false, true],
  ["Joaquin Vera", "Completó 8/8", 8, false, true],
  ["Kiara Flores", "Revisó 5/8", 5, false, true],
  ["Luis Mendoza", "Sin revisar mapa", 3, true, true],
  ["Micaela Prado", "Completó 8/8", 8, false, true],
  ["Nicolas Salas", "Revisó 4/8", 4, true, true],
  ["Valeria Leon", "Completó 6/8", 6, false, true]
].map(([fullName, status, completedSteps, risk, active], index) => ({
  id: index === 0 ? ids.student : `student-${index}`,
  fullName: String(fullName),
  email: `${String(fullName).split(" ")[0].toLowerCase()}@pucp.edu.pe`,
  status: String(status),
  completedSteps: Number(completedSteps),
  totalSteps: 8,
  risk: Boolean(risk),
  active: Boolean(active)
}));

export const jhChecklist: JhChecklistItem[] = [
  ["Presentacion del horario", "Compartir canales y reglas de convivencia.", "completed"],
  ["Activacion del correo PUCP", "Confirmar que todos puedan entrar.", "pending"],
  ["Uso de plataformas", "Explicar PAIDEIA y campus virtual.", "completed"],
  ["Ubica tus salones", "Recorrer letras y pabellones clave.", "scheduled"],
  ["Conoce DAES", "Derivar recursos de bienestar.", "pending"],
  ["Centro Federado", "Presentar representantes y grupos.", "completed"]
].map(([title, description, status], index) => ({
  id: `jh-check-${index}`,
  jhId: ids.jh,
  title: String(title),
  description: String(description),
  status: status as JhChecklistItem["status"],
  completedAt: status === "completed" ? "2027-03-09T16:00:00Z" : undefined
}));

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    authorId: ids.jh,
    targetType: "group",
    targetId: ids.group,
    title: "Punto de encuentro",
    content: "Nos vemos a las 8:40 frente a Biblioteca para ir juntos a Letras.",
    createdAt: "2027-03-15T12:00:00Z"
  },
  {
    id: "ann-2",
    authorId: ids.cf,
    targetType: "faculty",
    targetId: ids.faculty,
    title: "Bienvenida EEGGCC",
    content: "La guia de primera semana ya esta publicada.",
    createdAt: "2027-03-14T12:00:00Z"
  }
];

export const courses: Course[] = [
  {
    id: "course-amga",
    code: "AMGA",
    name: "Argumentacion y Metodologia General Academica",
    semesterId: ids.semester,
    firstCycle: true
  }
];

export const assessmentSchemes: AssessmentScheme[] = [
  { id: "scheme-amga", courseId: "course-amga", name: "AMGA 2027-1" }
];

export const assessments: Assessment[] = [
  ["PC1", "Practica calificada 1", "PA", 7.5],
  ["PC2", "Practica calificada 2", "PA", 7.5],
  ["PC3", "Practica calificada 3", "PA", 7.5],
  ["PC4", "Practica calificada 4", "PA", 7.5],
  ["PD1", "Practica dirigida 1", "PD", 2.5],
  ["PD2", "Practica dirigida 2", "PD", 2.5],
  ["PD3", "Practica dirigida 3", "PD", 2.5],
  ["PD4", "Practica dirigida 4", "PD", 2.5],
  ["E1", "Examen 1", "E1", 30],
  ["E2", "Examen 2", "E2", 30]
].map(([shortName, name, category, weight], index) => ({
  id: `assess-${shortName}`,
  schemeId: "scheme-amga",
  shortName: String(shortName),
  name: String(name),
  category: category as Assessment["category"],
  weight: Number(weight),
  sortOrder: index + 1
}));

export const studentGrades: StudentGrade[] = [
  ["assess-PC1", 12],
  ["assess-PC2", 14],
  ["assess-PC3", 11],
  ["assess-PC4", 13],
  ["assess-PD1", 16],
  ["assess-PD2", 15],
  ["assess-PD3", 14],
  ["assess-PD4", 15],
  ["assess-E1", 10]
].map(([assessmentId, grade], index) => ({
  id: `grade-${index}`,
  studentId: ids.student,
  assessmentId: String(assessmentId),
  grade: Number(grade)
}));

export const campusPlaces: CampusPlace[] = [
  {
    id: "place-library",
    name: "Biblioteca",
    type: "library",
    latitude: -12.0696,
    longitude: -77.0807,
    description: "Punto de referencia para estudiar y encontrarse."
  },
  {
    id: "place-daes",
    name: "DAES",
    type: "service",
    latitude: -12.0691,
    longitude: -77.0801,
    description: "Bienestar, orientacion y acompanamiento estudiantil."
  },
  {
    id: "place-cafe",
    name: "Cafeteria",
    type: "food",
    latitude: -12.0699,
    longitude: -77.0799
  },
  {
    id: "place-eegg",
    name: "Estudios Generales",
    type: "academic",
    facultyId: ids.faculty,
    buildingCode: "L",
    latitude: -12.0689,
    longitude: -77.0794
  },
  {
    id: "place-topic",
    name: "Topico",
    type: "health",
    latitude: -12.0702,
    longitude: -77.0805
  },
  {
    id: "place-letters",
    name: "Facultad de Letras",
    type: "academic",
    buildingCode: "A",
    latitude: -12.0686,
    longitude: -77.0802
  }
];

export const campusNodes: CampusNode[] = [
  { id: "n-start", latitude: -12.0697, longitude: -77.0811 },
  { id: "n-library", latitude: -12.0696, longitude: -77.0807 },
  { id: "n-daes", latitude: -12.0691, longitude: -77.0801 },
  { id: "n-eegg", latitude: -12.0689, longitude: -77.0794 },
  { id: "n-cafe", latitude: -12.0699, longitude: -77.0799 },
  { id: "n-topic", latitude: -12.0702, longitude: -77.0805 }
];

export const campusRoutes: CampusRoute[] = [
  { id: "r1", from: "n-start", to: "n-library", nodeIds: ["n-start", "n-library"], distanceMeters: 45 },
  { id: "r2", from: "n-library", to: "n-daes", nodeIds: ["n-library", "n-daes"], distanceMeters: 80 },
  { id: "r3", from: "n-daes", to: "n-eegg", nodeIds: ["n-daes", "n-eegg"], distanceMeters: 70 },
  { id: "r4", from: "n-library", to: "n-cafe", nodeIds: ["n-library", "n-cafe"], distanceMeters: 55 },
  { id: "r5", from: "n-cafe", to: "n-topic", nodeIds: ["n-cafe", "n-topic"], distanceMeters: 60 }
];

export const contentResources: ContentResource[] = [
  {
    id: "content-first-week",
    title: "Guia de primera semana",
    description: "Checklist oficial para iniciar clases con calma.",
    body: "Fechas, contactos y recomendaciones validadas para cachimbos.",
    sourceType: "official",
    facultyId: ids.faculty,
    status: "published",
    scope: "JH y cachimbos",
    reviewedPercent: 82,
    publishedAt: "2027-03-01T12:00:00Z",
    createdAt: "2027-02-15T12:00:00Z",
    updatedAt: "2027-03-01T12:00:00Z",
    url: "https://www.pucp.edu.pe/estudiante/"
  },
  {
    id: "content-map",
    title: "Mapa y letras de facultades",
    description: "Referencia rapida de pabellones y servicios.",
    body: "Incluye ubicaciones frecuentes y puntos de encuentro.",
    sourceType: "cf",
    facultyId: ids.faculty,
    status: "published",
    scope: "Cachimbos EEGGCC",
    reviewedPercent: 76,
    createdAt: "2027-02-20T12:00:00Z",
    updatedAt: "2027-03-01T12:00:00Z",
    url: "https://mapa.pucp.edu.pe/"
  },
  {
    id: "content-daes",
    title: "Conoce DAES",
    description: "Servicios de bienestar y acompanamiento.",
    body: "Cuando pedir ayuda, donde ir y que canales usar.",
    sourceType: "official",
    facultyId: ids.faculty,
    status: "scheduled",
    scope: "Todos",
    reviewedPercent: 0,
    createdAt: "2027-02-22T12:00:00Z",
    updatedAt: "2027-02-22T12:00:00Z",
    url: "https://daes.pucp.edu.pe/"
  },
  {
    id: "content-mail",
    title: "Uso del correo PUCP",
    description: "Primeros pasos para comunicacion institucional.",
    body: "Buenas practicas y problemas frecuentes.",
    sourceType: "official",
    facultyId: ids.faculty,
    status: "draft",
    scope: "JH",
    reviewedPercent: 0,
    createdAt: "2027-02-25T12:00:00Z",
    updatedAt: "2027-02-25T12:00:00Z",
    url: "https://correo.pucp.edu.pe/"
  }
];

export type JhMeeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "reunion" | "recorrido" | "recordatorio";
};

export const jhMeetings: JhMeeting[] = [
  {
    id: "meeting-1",
    title: "Bienvenida del H-204",
    date: "2027-03-16",
    time: "09:00",
    location: "Aula N-201",
    type: "reunion"
  },
  {
    id: "meeting-2",
    title: "Recorrido por el campus",
    date: "2027-03-18",
    time: "11:00",
    location: "Puerta principal",
    type: "recorrido"
  },
  {
    id: "meeting-3",
    title: "Recordatorio de inscripción de prácticas",
    date: "2027-03-19",
    time: "18:00",
    location: "Grupo del horario",
    type: "recordatorio"
  }
];

export type JhFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const jhFaqs: JhFaqItem[] = [
  {
    id: "faq-practicas",
    question: "¿Cómo inscribo prácticas?",
    answer: "Ingresa al Campus Virtual, abre la sección Matrícula y selecciona Inscripción de prácticas. Revisa el horario y confirma tu vacante antes del cierre."
  },
  {
    id: "faq-examenes",
    question: "¿Dónde veo mi horario de exámenes?",
    answer: "Puedes verlo en el Campus Virtual, dentro de Cursos y actividades > Horario de evaluaciones. Confirma siempre el aula en el anuncio oficial del curso."
  },
  {
    id: "faq-laboratorio",
    question: "¿Qué hago si no puedo asistir a un laboratorio?",
    answer: "Comunícate cuanto antes con el docente o jefe de práctica por el canal oficial del curso. Explica el motivo y consulta si corresponde una recuperación; el JH no puede justificar la inasistencia."
  }
];

export const cfJhs: CfJhSummary[] = [
  ["Maria Fernanda Rios", "H-204", "Asignado", "9/12", false],
  ["Carlos Perez", "H-101", "Checklist 9/12", "9/12", true],
  ["Lucia Salas", "H-305", "Capacitacion pendiente", "5/12", true],
  ["Jorge Ramirez", undefined, "Sin asignar", "0/12", true],
  ["Ana Belen Castro", "H-118", "Activo", "12/12", false],
  ["Sebastian Leon", undefined, "Falta contacto", "2/12", true],
  ["Daniela Chavez", "H-220", "Activo", "11/12", false],
  ["Renato Aguilar", "H-312", "Checklist pendiente", "4/12", true]
].map(([fullName, groupName, status, checklistProgress, risk], index) => ({
  id: `cf-jh-${index}`,
  fullName: String(fullName),
  groupName: groupName ? String(groupName) : undefined,
  status: String(status),
  checklistProgress: String(checklistProgress),
  risk: Boolean(risk)
}));

export type CfGroupSummary = {
  id: string;
  name: string;
  students: number;
  jhName?: string;
  coverage: number;
  status: "assigned" | "unassigned" | "risk";
};

export const cfGroups: CfGroupSummary[] = [
  { id: "group-101", name: "H-101", students: 31, jhName: "Carlos Perez", coverage: 74, status: "risk" },
  { id: "group-118", name: "H-118", students: 29, jhName: "Ana Belen Castro", coverage: 100, status: "assigned" },
  { id: ids.group, name: "H-204", students: 32, jhName: "Maria Fernanda Rios", coverage: 86, status: "assigned" },
  { id: "group-220", name: "H-220", students: 30, jhName: "Daniela Chavez", coverage: 92, status: "assigned" },
  { id: "group-305", name: "H-305", students: 34, jhName: "Lucia Salas", coverage: 42, status: "risk" },
  { id: "group-312", name: "H-312", students: 28, jhName: "Renato Aguilar", coverage: 35, status: "risk" },
  { id: "group-401", name: "H-401", students: 33, coverage: 0, status: "unassigned" },
  { id: "group-406", name: "H-406", students: 27, coverage: 0, status: "unassigned" }
];

export const cfOnboardingMetrics = [
  { label: "Correo PUCP activado", value: 88 },
  { label: "Plataformas revisadas", value: 81 },
  { label: "Mapa del campus revisado", value: 67 },
  { label: "Contacto con su JH", value: 76 }
];
