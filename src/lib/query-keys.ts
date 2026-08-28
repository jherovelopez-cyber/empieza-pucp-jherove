export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const
  },
  onboarding: {
    student: (studentId: string) => ["onboarding", "student", studentId] as const
  },
  grades: {
    course: (studentId: string, courseId: string) =>
      ["grades", "course", studentId, courseId] as const
  },
  map: {
    places: ["map", "places"] as const
  },
  jh: {
    group: (jhId: string) => ["jh", "group", jhId] as const,
    checklist: (jhId: string) => ["jh", "checklist", jhId] as const
  },
  cf: {
    jhs: (facultyId: string) => ["cf", "jhs", facultyId] as const,
    content: (facultyId: string) => ["cf", "content", facultyId] as const
  }
};
