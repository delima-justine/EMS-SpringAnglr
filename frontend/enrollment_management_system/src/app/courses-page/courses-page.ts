import { AfterViewInit, Component, ElementRef, inject, OnChanges, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Backend } from '../../service/backend';
import { Course } from '../../models/ems.model';
import { ActivatedRoute, Router } from "@angular/router";
import { AddModal } from "./add-modal/add-modal";
import { UpdateModal } from "./update-modal/update-modal";

@Component({
  selector: 'app-courses-page',
  imports: [TopNav, AddModal, UpdateModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('sortOrder') sortOrder!: ElementRef
  courses = signal(<Course[]>[]);
  courseIdSent = signal<number>(0);
  backendService = inject(Backend);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  // On component initialization, set up route param 
  // subscription and fetch courses
  ngOnInit(): void {
    this.getCourses();
  }

  // After the view initializes, fetch the courses
  ngAfterViewInit(): void {
    this.getCourses();
  }

  ngOnChanges(): void {
    this.getCourses();
  }

  // Fetches the list of courses from the backend
  getCourses() {
    this.backendService.getCourses()
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }

  // Adds the newly created course to the courses list
  onCourseSaved(createdCourse: Course) {
    this.courses.update(list => [...list, createdCourse]);
  }

  // Updates the course in the courses list after an update
  onCourseUpdated(updatedCourse: Course) {
    this.courses.update(list => list.map(course => 
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    ));
  }

  deleteCourse(courseId: number) {
    this.backendService.deleteCourse(courseId)
      .subscribe(() => {
        this.courses.update(
            list => list.filter(course => course.courseId !== courseId)
        );
      })
  }

  searchCourses(query: string) {
    console.log("Searching for:", query);
    this.backendService.searchCourses(query)
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }

  sortCourses() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case "asc":
        this.backendService.sortCoursesAsc()
          .subscribe(coursesData => {
            this.courses.set(coursesData);
          });
        break;
      case "desc":
        this.backendService.sortCoursesAsc()
          .subscribe(coursesData => {
            this.courses.set(coursesData.reverse());
          });
        break;
    }
  }
}
