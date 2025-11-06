export type Course = {
  course_id: string;
  course_code: string;
  course_title: string;
  units: number;
  lecture_hours: number;
  lab_hours: number;
  dept_id: number;
  is_deleted: boolean;
}