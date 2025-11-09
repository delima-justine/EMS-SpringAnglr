import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Instructor } from '../../../models/ems.model';
import { InstructorService } from '../../../service/instructor.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-update-instructor-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-instructor-modal.html',
  styleUrl: './update-instructor-modal.scss',
})
export class UpdateInstructorModal {
  @ViewChild('updateInstructorModal') updateInstructorModal!: ElementRef;
  @ViewChild('openInstructorButton') openInstructorButton!: ElementRef<HTMLButtonElement>;
  instructorForm: FormGroup;
  instructorService = inject(InstructorService);
  response = output<Instructor>();
  instructorId = input(<number>(0));

  constructor(private formBuilder: FormBuilder) {
    this.instructorForm = this.formBuilder.group({
      lastName: [''],
      firstName: [''],
      email: [''],
      departmentId: [''],
      isDeleted: [false],
    });
  }

  openModal() {
    const modal = new Modal(this.updateInstructorModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateInstructorModal.nativeElement);
    modal?.hide(); 

    this.openInstructorButton?.nativeElement.focus();
  }

  openUpdateModal() {
    if(!this.instructorId()) return;

    this.openModal();
    this.instructorService.getInstructorById(this.instructorId())
      .subscribe((instructorData: Instructor) => {
        this.instructorForm.setValue({
          lastName: instructorData.lastName,
          firstName: instructorData.firstName,
          email: instructorData.email,
          departmentId: instructorData.departmentId,
          isDeleted: instructorData.isDeleted,
      });
    });
  }

  updateInstructor() {
    this.instructorService.updateInstructor(this.instructorId(), this.instructorForm.value)
      .subscribe((updatedInstructor: Instructor) => {
        this.response.emit(updatedInstructor);
        this.instructorForm.reset();
        this.closeModal();
    });
  }
}
