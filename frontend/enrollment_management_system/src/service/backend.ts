import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  private courseUrl = "http://localhost:8080/api/courses";
  http = inject(HttpClient);

  getCourses() {
    return this.http.get<Course[]>(this.courseUrl);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.courseUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`);
  }

  searchCourses(query: string): Observable<Course[]> {
    const params = new HttpParams().set('course_title', query);
    return this.http.get<Course[]>(`${this.courseUrl}/search`, { params });
  }
}
