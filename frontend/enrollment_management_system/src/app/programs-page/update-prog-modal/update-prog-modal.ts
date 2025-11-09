import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { ProgramService } from '../../../service/program.service';
import { Program } from '../../../models/ems.model';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-update-prog-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-prog-modal.html',
  styleUrl: './update-prog-modal.scss',
})
export class UpdateProgModal {
  @ViewChild('updateProgramModal') updateProgramModal!: ElementRef;
  @ViewChild('openProgramButton') updateProgramButton!: ElementRef<HTMLButtonElement>;
  programForm: FormGroup;
  programService = inject(ProgramService);
  programId = input(<number>(0));
  response = output<Program>();

  constructor(private formBuilder: FormBuilder) {
    this.programForm = this.formBuilder.group({
      programCode: [''],
      programName: [''],
      departmentId: [''],
      isDeleted: [false]
    });
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
}