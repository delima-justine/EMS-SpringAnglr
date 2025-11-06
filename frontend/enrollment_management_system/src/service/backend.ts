import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Course } from '../models/ems.model';

@Injectable({
  providedIn: 'root',
})
export class Backend {
  http = inject(HttpClient);

  getCourses() {
    const coursesUrl = "http://localhost:8080/api/courses";
    return this.http.get<Course[]>(coursesUrl); 
  }
}
