import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Instructor } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  instructorUrl = 'http://localhost:8080/api/instructors';
  http = inject(HttpClient);

  getInstructors() {
    return this.http.get<Instructor[]>(this.instructorUrl);
  }

  getInstructorById(instructorId: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.instructorUrl}/${instructorId}`);
  }

  addInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.instructorUrl, instructor);
  }

  updateInstructor(instructorId: number, instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.instructorUrl}/${instructorId}`, instructor);
  }

  deleteInstructor(instructorId: number): Observable<Instructor> {
    return this.http.delete<Instructor>(`${this.instructorUrl}/${instructorId}`);
  }

  searchInstructor(name: String): Observable<Instructor[]> {
    const params = new HttpParams().set('name', name.toString());
    return this.http.get<Instructor[]>(`${this.instructorUrl}/search`, { params });
  }

  sortInstructorsByNameAsc(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.instructorUrl}/asc`);
  }
}
