export type Course = {
  courseId?: number;
  courseCode: string;
  courseTitle: string;
  units: number;
  lectureHours: number;
  labHours: number;
  departmentId: number;
  isDeleted?: boolean;
}

export type CoursePrerequisite = {
  id: {
    courseId: number;
    prereqCourseId: number;
  },
  isDeleted?: number;
}

export type Department = {
  departmentId?: number;
  departmentCode: string;
  departmentName: string;
  deleted?: boolean;
}