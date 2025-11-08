import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Department } from '../../../models/ems.model';
import { DepartmentService } from '../../../service/department.service';

@Component({
  selector: 'app-update-dept-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-dept-modal.html',
  styleUrl: './update-dept-modal.scss',
})
export class UpdateDeptModal {
  @ViewChild('updateDepartmentModal') updateDepartmentModal!: ElementRef;
  departmentForm: FormGroup;
  formBuilder = new FormBuilder();
  departmentService = inject(DepartmentService);
  departmentId = input(<number>(0));
  response = output<Department>();

  constructor() {
    this.departmentForm = this.formBuilder.group({
      departmentCode: [''],
      departmentName: [''],
      deleted: [false],
    });
  }

  openModal() {
    const modal = new Modal(this.updateDepartmentModal.nativeElement);
    modal.show();
  }
  
  closeModal() {
    const modal = Modal.getInstance(this.updateDepartmentModal.nativeElement);
    modal?.hide();
    this.departmentForm.reset();
  }

  openUpdateDepartmentModal() {
    if (!this.departmentId) return;

    this.openModal();

    this.departmentService.getDepartmentById(this.departmentId())
      .subscribe(deptData => {
        this.departmentForm.setValue({
          departmentCode: deptData.departmentCode,
          departmentName: deptData.departmentName,
          deleted: deptData.deleted,
        });
      });
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.departmentId(), this.departmentForm.value)
      .subscribe(updatedDept => {
        console.log("Updated department data:", updatedDept);
        this.response.emit(updatedDept);
        this.departmentForm.reset();
        this.closeModal();
      })
  }
}
