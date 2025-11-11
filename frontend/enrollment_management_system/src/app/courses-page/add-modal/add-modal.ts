import Modal from 'bootstrap/js/dist/modal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Backend } from '../../../service/backend';
import { Course, Department } from '../../../models/ems.model';
import { DepartmentService } from '../../../service/department.service';

@Component({
  selector: 'app-add-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-modal.html',
  styleUrls: ['./add-modal.scss'],
})
export class AddModal implements OnInit {
  @ViewChild('addCourseModal') addCourseModal!: ElementRef;
  courseId = input(<number>(0));
  response = output<Course>();
  departments = signal(<Department[]>[]);
  courseForm: FormGroup;
  backendService = inject(Backend);
  deptService = inject(DepartmentService);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.courseForm = this.formBuilder.group({
      courseCode: [''],
      courseTitle: [''],
      units: [''],
      lectureHours: [''],
      labHours: [''],
      departmentId: [''],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  openModal() {
    const modal = new Modal(this.addCourseModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addCourseModal.nativeElement);
    modal?.hide();
    this.courseForm.reset();
  }

  addCourse() {
    this.backendService.addCourse(this.courseForm.value)
      .subscribe((created: Course) => {
        console.log(created);
        this.courseForm.reset();

        this.response.emit(created);
      });
  }

  getDepartments() {
    this.deptService.getDepartments().subscribe((data) => {
      this.departments.set(data);
    })
  }
}
