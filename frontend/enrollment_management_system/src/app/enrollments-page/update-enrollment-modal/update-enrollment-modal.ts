import { Enrollment } from '../../../models/ems.model';
import { EnrollmentService } from '../../../service/enrollment.service';
import { Modal } from 'bootstrap';
import { 
      Component, 
      ElementRef, 
      inject, 
      input, 
      output, 
      ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';

@Component({
  selector: 'app-update-enrollment-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-enrollment-modal.html',
  styleUrl: './update-enrollment-modal.scss',
})
export class UpdateEnrollmentModal {
  @ViewChild('updateEnrollmentModal') updateEnrollmentModal!: ElementRef;
  enrollmentForm: FormGroup;
  enrollmentId = input(<number>(0));
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
    const modal = new Modal(this.updateEnrollmentModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateEnrollmentModal.nativeElement);
    modal?.hide();
    this.enrollmentForm.reset();
  }

  openUpdateModal() {
    if(!this.enrollmentId()) return;

    this.openModal();
    this.enrollmentService.getEnrollmentById(this.enrollmentId())
      .subscribe(enrollmentData => {
        this.enrollmentForm.setValue({
          studentId: enrollmentData.studentId,
          sectionId: enrollmentData.sectionId,
          dateEnrolled: enrollmentData.dateEnrolled,
          status: enrollmentData.status,
          letterGrade: enrollmentData.letterGrade,
          isDeleted: enrollmentData.isDeleted
        });
      });
  }
 
  updateEnrollment() {
    this.enrollmentService.updateEnrollment(this.enrollmentId(), this.enrollmentForm.value)
      .subscribe(updatedEnrollment => {
        this.response.emit(updatedEnrollment);
        this.enrollmentForm.reset();
        this.closeModal();
      });
  }
}
