import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Enrollment } from '../../../models/ems.model';
import { EnrollmentService } from '../../../service/enrollment.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-enrollment-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-enrollment-modal.html',
  styleUrl: './add-enrollment-modal.scss',
})
export class AddEnrollmentModal {
  @ViewChild('addEnrollmentModal') addEnrollmentModal!: ElementRef;
  enrollmentForm: FormGroup;
  formBuilder = inject(FormBuilder);
  enrollmentService = inject(EnrollmentService);
  response = output<Enrollment>();

  constructor() {
    this.enrollmentForm = this.formBuilder.group({
      studentId: [0],
      sectionId: [0],
      dateEnrolled: [''],
      status: [''],
      letterGrade: [''],
      isDeleted: [false]
    })
  }

  openModal() {
    const modal = new Modal(this.addEnrollmentModal.nativeElement);
    modal.show();
  }
  
  closeModal() {
    const modal = Modal.getInstance(this.addEnrollmentModal.nativeElement);
    modal?.hide();
    this.enrollmentForm.reset();
  }

  addEnrollment() {
    this.enrollmentService.addEnrollment(this.enrollmentForm.value)
      .subscribe((createdEnrollment: Enrollment) => {
        console.log('Created Enrollment:', createdEnrollment);
        this.enrollmentForm.reset();
        this.closeModal();
        this.response.emit(createdEnrollment);
      })
  }
}
