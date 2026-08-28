import {
  assessments,
  assessmentSchemes,
  courses,
  ids,
  studentGrades
} from "@/features/demo/demo-data";

export async function getStudentCourseGrades(studentId = ids.student, courseId = "course-amga") {
  const course = courses.find((candidate) => candidate.id === courseId);
  const scheme = assessmentSchemes.find((candidate) => candidate.courseId === courseId);
  const schemeAssessments = assessments.filter((assessment) => assessment.schemeId === scheme?.id);
  const grades = studentGrades.filter((grade) => grade.studentId === studentId);

  return { course, scheme, assessments: schemeAssessments, grades };
}
