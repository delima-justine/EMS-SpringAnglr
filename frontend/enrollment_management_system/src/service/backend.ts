import { HttpClient } from '@angular/common/http';
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
}
