import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { InstructorService } from '../../../service/instructor.service';
import { Instructor } from '../../../models/ems.model';

@Component({
  selector: 'app-add-instructor-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-instructor-modal.html',
  styleUrl: './add-instructor-modal.scss',
})
export class AddInstructorModal {
  @ViewChild('addInstructorModal') addInstructorModal!: ElementRef;
  @ViewChild('openInstructorButton') addInstructorButton!: ElementRef<HTMLButtonElement>;
  instructorForm: FormGroup;
  instructorService = inject(InstructorService);
  response = output<Instructor>();

  constructor(private formBuilder: FormBuilder) {
    this.instructorForm = this.formBuilder.group({
      lastName: [''],
      firstName: [''],
      middleName: [''],
      email: [''],
      departmentId: [''],
      isDeleted: [false],
    });
  }

  openModal() {
    const modal = new Modal(this.addInstructorModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addInstructorModal.nativeElement);
    modal?.hide(); 

    this.addInstructorButton?.nativeElement.focus();
  }

  addInstructor() {
    console.log("Add Instructor");
    this.instructorService.addInstructor(this.instructorForm.value)
      .subscribe((createdInstructor: Instructor) => {
        this.instructorForm.reset();
        this.response.emit(createdInstructor);
        this.closeModal();
      })
  }
}
