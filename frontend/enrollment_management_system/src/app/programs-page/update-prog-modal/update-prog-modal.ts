import { Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { ProgramService } from '../../../service/program.service';
import { Department, Program } from '../../../models/ems.model';
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
  selector: 'app-update-prog-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-prog-modal.html',
  styleUrl: './update-prog-modal.scss',
})
export class UpdateProgModal implements OnInit{
  @ViewChild('updateProgramModal') updateProgramModal!: ElementRef;
  @ViewChild('openProgramButton') updateProgramButton!: ElementRef<HTMLButtonElement>;
  programForm: FormGroup;
  programService = inject(ProgramService);
  deptService = inject(DepartmentService);
  programId = input(<number>(0));
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
    const modal = new Modal(this.updateProgramModal.nativeElement);
    modal.show();
  }
  
  closeModal() {
    const modal = Modal.getInstance(this.updateProgramModal.nativeElement);
    modal?.hide(); 

    this.updateProgramButton?.nativeElement.focus();
  }

  openUpdateModal() {
    if(!this.programId()) return;
    this.openModal();

    this.programService.getProgramById(this.programId())
      .subscribe((program: Program) => {
        this.programForm.setValue({
          programCode: program.programCode,
          programName: program.programName,
          departmentId: program.departmentId,
          isDeleted: program.isDeleted
      });
    });
  }

  updateProgram() {
    this.programService.updateProgram(this.programId(), this.programForm.value)
      .subscribe((updatedProgram: Program) => {
        this.response.emit(updatedProgram);
        this.programForm.reset();
        this.closeModal();
    });
  }

  getDepartments() {
    this.deptService.getDepartments().subscribe((departments) => {
      this.departments.set(departments);
    });
  }
}