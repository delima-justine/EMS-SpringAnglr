import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { CoursePrereqService } from '../../../service/course-prereq.service';
import { Course, CoursePrerequisite } from '../../../models/ems.model';
import { Backend } from '../../../service/backend';

@Component({
  selector: 'app-add-cp-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cp-modal.html',
  styleUrl: './add-cp-modal.scss',
})
export class AddCpModal implements OnInit {
  @ViewChild('addCoursePrereqModal') addCoursePrereqModal!: ElementRef;
  courses = signal(<Course[]>[])
  coursePrerequisites = signal(<CoursePrerequisite[]>[]);
  coursePrereqForm: FormGroup;
  formBuilder = inject(FormBuilder);
  coursePrereqService = inject(CoursePrereqService);
  courseService = inject(Backend);

  constructor() {
    this.coursePrereqForm = this.formBuilder.group({
      id: this.formBuilder.group ({
        courseId: [''],
        prereqCourseId: ['']
      }),
      isDeleted: [0],
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  openModal() {
    const modal = new Modal(this.addCoursePrereqModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addCoursePrereqModal.nativeElement);
    modal?.hide();
    this.coursePrereqForm.reset();
  }

  addCoursePrerequisite() {
    this.coursePrereqService.addCoursePrerequisite(this.coursePrereqForm.value)
      .subscribe((created: CoursePrerequisite) => {
        console.log(created);
        this.coursePrereqForm.reset();
      });
  }

  getCourses() {
    this.courseService.sortCoursesAsc()
      .subscribe((courseData: Course[]) => {
        this.courses.set(courseData);
    });
  }
}
