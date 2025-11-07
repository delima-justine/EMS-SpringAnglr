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

@Component({
  selector: 'app-courses-page',
  imports: [TopNav, ReactiveFormsModule, AddModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit, AfterViewInit {
  courses = signal(<Course[]>[]);
  courseId = signal<number>(0);
  backendService = inject(Backend);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // react to route param changes
    this.activatedRoute.paramMap.subscribe(params => {
      const idStr = params.get('courseId');
      this.courseId.set(idStr ? Number(idStr) : 0);
    });

    this.getCourses();
  }

  ngAfterViewInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.backendService.getCourses()
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }

  onCourseSaved(createdCourse: Course) {
    this.courses.update(list => [...list, createdCourse]);
  }

  // closeUpdateCourseModal(previousRoute: string) {
  //   this.router.navigate([ previousRoute || '/courses']);
  //   this.courseForm.reset();
  // }
}
