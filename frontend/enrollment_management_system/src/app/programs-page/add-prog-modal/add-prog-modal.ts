import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { Department, Program } from '../../../models/ems.model';
import { ProgramService } from '../../../service/program.service';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { DepartmentService } from '../../../service/department.service';

@Component({
  selector: 'app-add-prog-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-prog-modal.html',
  styleUrl: './add-prog-modal.scss',
})
export class AddProgModal implements OnInit {
  @ViewChild('addProgramModal') addProgramModal!: ElementRef;
  @ViewChild('openProgramButton') addProgramButton!: ElementRef<HTMLButtonElement>;
  programForm: FormGroup;
  programService = inject(ProgramService);
  deptService = inject(DepartmentService);
  response = output<Program>();
  departments = signal(<Department[]>[]);

  constructor(private formBuilder: FormBuilder) {
    this.programForm = this.formBuilder.group({
      programCode: [''],
      programName: [''],
      departmentId: [''],
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  openModal() {
    const modal = new Modal(this.addProgramModal.nativeElement);
    modal.show();
  }
  
  closeModal() {
    const modal = Modal.getInstance(this.addProgramModal.nativeElement);
    modal?.hide(); 

    this.addProgramButton?.nativeElement.focus();
  }

  addProgram() {
    this.programService.addProgram(this.programForm.value)
      .subscribe((createdProgram: Program) => {
        this.response.emit(createdProgram);
        this.programForm.reset();
        this.closeModal();
      })
  }

  getDepartments() {
    this.deptService.getDepartments().subscribe((departments) => {
      this.departments.set(departments);
    });
  }
}
