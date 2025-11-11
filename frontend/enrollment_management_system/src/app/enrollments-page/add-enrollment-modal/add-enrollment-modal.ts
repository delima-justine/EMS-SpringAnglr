import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Enrollment, Section, Student } from '../../../models/ems.model';
import { EnrollmentService } from '../../../service/enrollment.service';
import { Modal } from 'bootstrap';
import { StudentService } from '../../../service/student.service';
import { SectionService } from '../../../service/section.service';

@Component({
  selector: 'app-add-enrollment-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-enrollment-modal.html',
  styleUrl: './add-enrollment-modal.scss',
})
export class AddEnrollmentModal implements OnInit {
  @ViewChild('addEnrollmentModal') addEnrollmentModal!: ElementRef;
  enrollmentForm: FormGroup;
  formBuilder = inject(FormBuilder);
  enrollmentService = inject(EnrollmentService);
  studentService = inject(StudentService);
  sectionService = inject(SectionService);
  response = output<Enrollment>();
  students = signal(<Student[]>[]);
  sections = signal(<Section[]>[]);

  constructor() {
    this.enrollmentForm = this.formBuilder.group({
      studentId: [0],
      sectionId: [0],
      dateEnrolled: [''],
      status: [''],
      letterGrade: [''],
      isDeleted: [false]
    })
  }

  ngOnInit(): void {
    this.getStudents();
    this.getSections();
  }

  openModal() {
    const modal = new Modal(this.addEnrollmentModal.nativeElement);
    modal.show();
  }
  
  closeModal() {
    const modal = Modal.getInstance(this.addEnrollmentModal.nativeElement);
    modal?.hide();
    this.enrollmentForm.reset();
  }

  addEnrollment() {
    this.enrollmentService.addEnrollment(this.enrollmentForm.value)
      .subscribe((createdEnrollment: Enrollment) => {
        console.log('Created Enrollment:', createdEnrollment);
        this.enrollmentForm.reset();
        this.closeModal();
        this.response.emit(createdEnrollment);
      })
  }

  getStudents() {
    this.studentService.sortStudentsAsc()
      .subscribe(studentsData => {
        this.students.set(studentsData);
      });
  }

  getSections() {
    this.sectionService.sortSectionsAsc()
      .subscribe(sectionsData => {
        this.sections.set(sectionsData);
      });
  }
}
