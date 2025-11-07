import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-cp-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cp-modal.html',
  styleUrl: './add-cp-modal.scss',
})
export class AddCpModal {
  @ViewChild('addCoursePrereqModal') addCoursePrereqModal!: ElementRef;
  coursePrereqForm: FormGroup;
  formBuilder = inject(FormBuilder);

  constructor() {
    this.coursePrereqForm = this.formBuilder.group({
      courseId: [''],
      prerequisiteId: ['']
    });
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
    console.log(this.coursePrereqForm.value);
    console.log(this.coursePrereqForm.valid);
  }
}
