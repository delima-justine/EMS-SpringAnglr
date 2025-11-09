import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { Program } from '../../../models/ems.model';
import { ProgramService } from '../../../service/program.service';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-prog-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-prog-modal.html',
  styleUrl: './add-prog-modal.scss',
})
export class AddProgModal {
  @ViewChild('addProgramModal') addProgramModal!: ElementRef;
  @ViewChild('openProgramButton') addProgramButton!: ElementRef<HTMLButtonElement>;
  programForm: FormGroup;
  programService = inject(ProgramService);
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
}
