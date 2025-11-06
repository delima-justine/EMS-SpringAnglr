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

@Component({
  selector: 'app-courses-page',
  imports: [TopNav, ReactiveFormsModule],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit, AfterViewInit {
  courses = signal(<Course[]>[]);
  courseForm: FormGroup;
  backendService = inject(Backend);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.courseForm = this.formBuilder.group({
      courseCode: [''],
      courseTitle: [''],
      units: [''],
      lectureHours: [''],
      labHours: [''],
      departmentId: [''],
    });
  }

  ngOnInit(): void {
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

  addCourse() {
    this.backendService.addCourse(this.courseForm.value)
      .subscribe(data => {
        console.log(data); 
        this.courseForm.reset();
        this.getCourses();
    })
  }
}
