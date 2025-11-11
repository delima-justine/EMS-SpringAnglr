import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentUrl = 'http://localhost:8080/api/students';
  http = inject(HttpClient);
  
  getStudent() {
    return this.http.get<Student[]>(this.studentUrl);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/${studentId}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student);
  }

  updateStudent(studentId: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentUrl}/${studentId}`, student);
  }

  deleteStudent(studentId: number): Observable<Student> {
    return this.http.delete<Student>(`${this.studentUrl}/${studentId}`);
  }

  searchStudents(keyword: string): Observable<Student[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Student[]>(`${this.studentUrl}/search`, { params });
  }
}
