import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Backend } from '../../service/backend';
import { Course } from '../../models/ems.model';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AddModal } from "./add-modal/add-modal";
import { UpdateModal } from "./update-modal/update-modal";

@Component({
  selector: 'app-courses-page',
  imports: [TopNav, ReactiveFormsModule, AddModal, UpdateModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit, AfterViewInit {
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
}
