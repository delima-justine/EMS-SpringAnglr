export type Course = {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  units: number;
  lectureHours: number;
  labHours: number;
  deptId: number;
  isDeleted: boolean;
}