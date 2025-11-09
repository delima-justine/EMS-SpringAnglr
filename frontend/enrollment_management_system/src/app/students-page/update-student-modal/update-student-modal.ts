import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormControl,
        FormGroup,
        FormBuilder,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Student } from '../../../models/ems.model';
import { StudentService } from '../../../service/student.service';

@Component({
  selector: 'app-update-student-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-student-modal.html',
  styleUrl: './update-student-modal.scss',
})
export class UpdateStudentModal {
  @ViewChild('updateStudentModal') updateStudentModal!: ElementRef;
  @ViewChild('openStudentModalButton') openStudentModalButton!: ElementRef<HTMLButtonElement>;
  studentForm: FormGroup;
  studentService = inject(StudentService);
  studentId = input(<number>(0));
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
      yearLevel: [],
      programId: [],
      isDeleted: [false]
    });
  }

  openModal() {
    const modal = new Modal(this.updateStudentModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateStudentModal.nativeElement);
    modal?.hide();

    this.openStudentModalButton.nativeElement.focus();
  }

  openUpdateModal() {
    if(!this.studentId()) return;
    
    this.openModal();
    this.studentService.getStudentById(this.studentId())
      .subscribe((student: Student) => {
        this.studentForm.setValue({
          studentNo: student.studentNo,
          firstName: student.firstName,
          middleName: student.middleName,
          lastName: student.lastName,
          email: student.email,
          birthDate: student.birthDate,
          gender: student.gender,
          yearLevel: student.yearLevel,
          programId: student.programId,
          isDeleted: student.isDeleted
      }); 
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.studentId(), this.studentForm.value)
      .subscribe((updatedStudent: Student) => {
        this.response.emit(updatedStudent);
        console.log(updatedStudent);
        this.studentForm.reset();
        this.closeModal();
    });
  }
}
