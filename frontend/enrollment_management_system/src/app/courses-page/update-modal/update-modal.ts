import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Backend } from '../../../service/backend';
import { Course } from '../../../models/ems.model';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-modal.html',
  styleUrl: './update-modal.scss',
})
export class UpdateModal {
  @ViewChild('updateCourseModal') updateCourseModal!: ElementRef;
  courseId = input(<number>(0));
  courseForm: FormGroup;
  updateCourseResponse = output<Course>();
  backendService = inject(Backend);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

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

  openUpdateModal() {
    const modal = new Modal(this.updateCourseModal.nativeElement);
    modal.show();
  }

  closeUpdateModal() {
    const modal = Modal.getInstance(this.updateCourseModal.nativeElement);
    modal?.hide();
    this.courseForm.reset();
  }

  openUpdateCourseModal() {
    if (!this.courseId) return;

    this.backendService.getCourseById(this.courseId())
      .subscribe(courseData => {
        console.log("Fetched course data:", courseData);
        this.courseForm.setValue({
          courseCode: courseData.courseCode,
          courseTitle: courseData.courseTitle,
          units: courseData.units,
          lectureHours: courseData.lectureHours,
          labHours: courseData.labHours,
          departmentId: courseData.departmentId,
        })
      });

      this.openUpdateModal();
  }

  updateCourse() {
    this.backendService.updateCourse(this.courseId(), this.courseForm.value)
      .subscribe((updatedCourse: Course) => {
        console.log("Updated course:", updatedCourse);
        this.courseForm.reset();
        this.closeUpdateModal();

        this.updateCourseResponse.emit(updatedCourse);
      });
  }
}
