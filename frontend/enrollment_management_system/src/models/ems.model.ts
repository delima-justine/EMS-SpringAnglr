export type Course = {
  courseId?: string;
  courseCode: string;
  courseTitle: string;
  units: number;
  lectureHours: number;
  labHours: number;
  departmentId: number;
  isDeleted?: boolean;
}