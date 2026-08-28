export type UserRole = "student" | "jh" | "cf";

export type SourceType = "official" | "cf" | "jh";

export type OnboardingPhase =
  | "before_classes"
  | "first_week"
  | "first_month"
  | "during_semester";

export type ChecklistStatus = "completed" | "pending" | "scheduled";

export type ContentStatus = "draft" | "published" | "scheduled";

export type DemoUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  facultyId?: string;
  avatarUrl?: string;
};

export type Faculty = {
  id: string;
  name: string;
  code: string;
  letter: string;
};

export type Semester = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
};

export type Group = {
  id: string;
  name: string;
  facultyId: string;
  jhId?: string;
  semesterId: string;
};

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  category: OnboardingPhase;
  sortOrder: number;
  availableFrom?: string;
  sourceType: SourceType;
  official: boolean;
  active: boolean;
};

export type StudentOnboarding = {
  studentId: string;
  stepId: string;
  completed: boolean;
  completedAt?: string;
};

export type StudentSummary = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  completedSteps: number;
  totalSteps: number;
  risk: boolean;
  active: boolean;
};

export type JhChecklistItem = {
  id: string;
  jhId: string;
  title: string;
  description: string;
  status: ChecklistStatus;
  completedAt?: string;
};

export type Announcement = {
  id: string;
  authorId: string;
  targetType: "all" | "faculty" | "group";
  targetId?: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  semesterId: string;
  firstCycle: boolean;
};

export type AssessmentScheme = {
  id: string;
  courseId: string;
  name: string;
};

export type Assessment = {
  id: string;
  schemeId: string;
  name: string;
  shortName: string;
  category: "PA" | "PD" | "E1" | "E2";
  weight: number;
  sortOrder: number;
};

export type StudentGrade = {
  id: string;
  studentId: string;
  assessmentId: string;
  grade: number;
};

export type CampusPlace = {
  id: string;
  name: string;
  type: "academic" | "service" | "food" | "health" | "library";
  facultyId?: string;
  buildingCode?: string;
  latitude: number;
  longitude: number;
  description?: string;
};

export type CampusNode = {
  id: string;
  latitude: number;
  longitude: number;
};

export type CampusRoute = {
  id: string;
  from: string;
  to: string;
  nodeIds: string[];
  distanceMeters: number;
};

export type ContentResource = {
  id: string;
  title: string;
  description: string;
  body: string;
  sourceType: SourceType;
  authorId?: string;
  facultyId?: string;
  status: ContentStatus;
  scope: string;
  reviewedPercent: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CfJhSummary = {
  id: string;
  fullName: string;
  groupName?: string;
  status: string;
  checklistProgress: string;
  risk: boolean;
};
