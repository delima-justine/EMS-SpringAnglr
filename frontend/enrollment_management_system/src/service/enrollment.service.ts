import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enrollment } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrollmentUrl = "http://localhost:8080/api/enrollments";
  http = inject(HttpClient);

  getEnrollments() {
    return this.http.get<Enrollment[]>(this.enrollmentUrl);
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.enrollmentUrl}/${id}`);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.enrollmentUrl, enrollment);
  }

  updateEnrollment(id: number, enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.enrollmentUrl}/${id}`, enrollment);
  }

  deleteEnrollment(id: number): Observable<Enrollment> {
    return this.http.delete<Enrollment>(`${this.enrollmentUrl}/${id}`);
  }

  searchEnrollmentByStudentId(studentId: number): Observable<Enrollment[]> {
    const params = new HttpParams().set('student_id', studentId);
    return this.http.get<Enrollment[]>(`${this.enrollmentUrl}/search`, { params });
  }
}
