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
}
