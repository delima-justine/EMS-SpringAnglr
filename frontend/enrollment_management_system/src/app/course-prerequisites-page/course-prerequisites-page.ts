import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { CoursePrerequisite } from '../../models/ems.model';
import { CoursePrereqService } from '../../service/course-prereq.service';
import { AddCpModal } from "./add-cp-modal/add-cp-modal";

@Component({
  selector: 'app-course-prerequisites-page',
  imports: [TopNav, AddCpModal],
  templateUrl: './course-prerequisites-page.html',
  styleUrl: './course-prerequisites-page.scss',
})
export class CoursePrerequisitesPage implements OnInit {
  coursePrerequisites = signal(<CoursePrerequisite[]>[]);
  coursePrereqService = inject(CoursePrereqService);

  ngOnInit() {
    this.getCoursePrerequisites();
  }

  getCoursePrerequisites() {
    this.coursePrereqService.getCoursePrerequisites()
      .subscribe(prereqData => {
        this.coursePrerequisites.set(prereqData);
    });
  }

  deleteCoursePrerequisite(courseId: number, prereqCourseId: number) {
    this.coursePrereqService.deleteCoursePrerequisite(courseId, prereqCourseId)
    .subscribe(coursePrerequisiteData => {
      console.log(coursePrerequisiteData);
      this.getCoursePrerequisites();
    })
  }
}
