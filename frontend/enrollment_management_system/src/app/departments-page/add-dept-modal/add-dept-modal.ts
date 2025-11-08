import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { DepartmentService } from '../../../service/department.service';
import { Department } from '../../../models/ems.model';

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
  departmentService = inject(DepartmentService);
  response = output<Department>();

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
    this.departmentService.addDepartment(this.departmentForm.value)
      .subscribe((createdDepartment: Department) => {
        this.departmentForm.reset();
        this.closeModal();
        this.response.emit(createdDepartment);
      })
  }
}
