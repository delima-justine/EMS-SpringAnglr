import Modal from 'bootstrap/js/dist/modal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input, output, signal, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Backend } from '../../../service/backend';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../models/ems.model';

@Component({
  selector: 'app-add-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-modal.html',
  styleUrls: ['./add-modal.scss'],
})
export class AddModal {
  @ViewChild('addCourseModal') addCourseModal!: ElementRef;
  courseId = input(<number>(0));
  response = output<Course>();
  courseForm: FormGroup;
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

  openModal() {
    const modal = new Modal(this.addCourseModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addCourseModal.nativeElement);
    modal?.hide();
    this.courseForm.reset();
  }

  addCourse() {
    this.backendService.addCourse(this.courseForm.value)
      .subscribe((created: Course) => {
        console.log(created);
        this.courseForm.reset();

        this.response.emit(created);
      });
  }
  
  // openUpdateCourseModal(courseId?: number) {
  //   if (!courseId) return;

  //   // set the signal immediately so the template/modal can use it right away
  //   this.courseId.set(courseId);

  //   // update the URL (navigation is async; we already set the signal)
  //   this.router.navigate(['/courses', courseId]);

  //   console.log("Course ID (clicked):", this.courseId());

  //   this.backendService.getCourseById(courseId)
  //     .subscribe(courseData => {
  //       console.log("Fetched course data:", courseData);
  //       this.courseForm.setValue({
  //         courseCode: courseData.courseCode,
  //         courseTitle: courseData.courseTitle,
  //         units: courseData.units,
  //         lectureHours: courseData.lectureHours,
  //         labHours: courseData.labHours,
  //         departmentId: courseData.departmentId,
  //       })
  //     });
  // }
}
