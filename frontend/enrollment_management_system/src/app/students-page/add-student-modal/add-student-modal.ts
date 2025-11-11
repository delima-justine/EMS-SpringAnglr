import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormControl,
        FormGroup,
        FormBuilder,
        Validators,
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { StudentService } from '../../../service/student.service';
import { Program, Student } from '../../../models/ems.model';
import { ProgramService } from '../../../service/program.service';

@Component({
  selector: 'app-add-student-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-student-modal.html',
  styleUrl: './add-student-modal.scss',
})
export class AddStudentModal implements OnInit {
  @ViewChild('addStudentModal') addStudentModal!: ElementRef;
  @ViewChild('openStudentModalButton') openStudentModalButton!: ElementRef;
  studentForm: FormGroup;
  studentService = inject(StudentService);
  programService = inject(ProgramService);
  programs = signal(<Program[]>[]);
  response = output<Student>();

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      studentNo: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      email: [''],
      birthDate: [''],
      gender: [''],
      yearLevel: [''],
      programId: [''],
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  openModal() {
    const modal = new Modal(this.addStudentModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addStudentModal.nativeElement);
    modal?.hide();

    this.openStudentModalButton.nativeElement.focus();
  }

  addStudent() {
    this.studentService.addStudent(this.studentForm.value)
      .subscribe((createdStudent: Student) => {
        this.response.emit(createdStudent);
        this.studentForm.reset();
        this.closeModal();
    });
  }

  getPrograms() {
    this.programService.sortProgramsAsc().subscribe(programs => {
      this.programs.set(programs);
    });
  }
}
