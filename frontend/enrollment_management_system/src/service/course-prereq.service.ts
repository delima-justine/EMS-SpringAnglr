import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CoursePrerequisite } from '../models/ems.model';

@Injectable({
  providedIn: 'root',
})
export class CoursePrereqService {
  private coursePrereqUrl = "http://localhost:8080/api/course-prerequisites";
  http = inject(HttpClient);

  getCoursePrerequisites() {
    return this.http.get<CoursePrerequisite[]>(this.coursePrereqUrl);
  }
}
