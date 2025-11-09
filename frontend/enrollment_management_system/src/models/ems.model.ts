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

export type Enrollment = {
  enrollmentId?: number;
  studentId: number;
  sectionId: number;
  dateEnrolled: string;
  status: string;
  letterGrade: string;
  isDeleted?: boolean;
}

export type Instructor = {
  instructorId?: number;
  lastName: string;
  firstName: string;
  email: string;
  departmentId: number;
  isDeleted?: boolean;
}

export type Program = {
  programId?: number;
  programCode: string;
  programName: string;
  departmentId: number;
  isDeleted?: boolean;
}

export type Section = {
  sectionId?: number;
  sectionCode: string;
  courseId: number;
  termId: number;
  instructorId: number;
  dayPattern: string;
  startTime: string;
  endTime: string;
  roomId: number;
  maxCapacity: number;
  isDeleted?: boolean;
}