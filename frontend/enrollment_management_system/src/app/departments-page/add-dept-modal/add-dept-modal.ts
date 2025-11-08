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
  selector: 'app-add-dept-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dept-modal.html',
  styleUrl: './add-dept-modal.scss',
})
export class AddDeptModal {
  @ViewChild('addDepartmentModal') addDepartmentModal!: ElementRef;
  departmentForm: FormGroup;
  formBuilder = inject(FormBuilder);

  constructor() {
    this.departmentForm = this.formBuilder.group({
      departmentCode: [''],
      departmentName: [''],
      deleted: [false],
    });
  }

  openModal() {
    const modal = new Modal(this.addDepartmentModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addDepartmentModal.nativeElement);
    modal?.hide();
    this.departmentForm.reset();
  }

  addDepartment() {
    //logic for creating data entry
    console.log(this.departmentForm.value);
    this.departmentForm.reset();
  }
}
