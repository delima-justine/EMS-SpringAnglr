import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
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
  @ViewChild('sortOrder') sortOrder!: ElementRef;
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

  sortCoursePrerequisites() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case 'asc':
        this.coursePrereqService.sortCoursePrerequisitesAsc()
          .subscribe(prereqData => {
            this.coursePrerequisites.set(prereqData);
        });
        break;
      case 'desc':
        this.coursePrereqService.sortCoursePrerequisitesAsc()
          .subscribe(prereqData => {
            this.coursePrerequisites.set(prereqData.reverse());
        });
        break;
    }
  }

  onCourseAdded(addedCourse: CoursePrerequisite) {
    this.coursePrerequisites.update(prereqs => [...prereqs, addedCourse]);
    this.getCoursePrerequisites();
  }
}
