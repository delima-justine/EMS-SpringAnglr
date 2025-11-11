import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CoursePrerequisite } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursePrereqService {
  private coursePrereqUrl = "http://localhost:8080/api/course-prerequisites";
  http = inject(HttpClient);

  getCoursePrerequisites() {
    return this.http.get<CoursePrerequisite[]>(this.coursePrereqUrl);
  }

  addCoursePrerequisite(prereq: CoursePrerequisite): Observable<CoursePrerequisite> {
    return this.http.post<CoursePrerequisite>(this.coursePrereqUrl, prereq);
  }

  deleteCoursePrerequisite(courseId: number, prereqCourseId: number): Observable<CoursePrerequisite> {
    return this.http.delete<CoursePrerequisite>(
      `${this.coursePrereqUrl}/${courseId}/${prereqCourseId}`
    );
  }

  sortCoursePrerequisitesAsc(): Observable<CoursePrerequisite[]> {
    return this.http.get<CoursePrerequisite[]>(`${this.coursePrereqUrl}/asc`);
  }
}
