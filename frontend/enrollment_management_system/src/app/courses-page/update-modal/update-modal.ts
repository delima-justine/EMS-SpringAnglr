import { Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { Backend } from '../../../service/backend';
import { Course, Department } from '../../../models/ems.model';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../service/department.service';

@Component({
  selector: 'app-update-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-modal.html',
  styleUrl: './update-modal.scss',
})
export class UpdateModal implements OnInit {
  @ViewChild('updateCourseModal') updateCourseModal!: ElementRef;
  departments = signal(<Department[]>[]);
  courseId = input(<number>(0));
  courseForm: FormGroup;
  updateCourseResponse = output<Course>();
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

  openUpdateModal() {
    const modal = new Modal(this.updateCourseModal.nativeElement);
    modal.show();
  }

  closeUpdateModal() {
    const modal = Modal.getInstance(this.updateCourseModal.nativeElement);
    modal?.hide();
    this.courseForm.reset();
  }

  openUpdateCourseModal() {
    if (!this.courseId) return;

    this.backendService.getCourseById(this.courseId())
      .subscribe(courseData => {
        console.log("Fetched course data:", courseData);
        this.courseForm.setValue({
          courseCode: courseData.courseCode,
          courseTitle: courseData.courseTitle,
          units: courseData.units,
          lectureHours: courseData.lectureHours,
          labHours: courseData.labHours,
          departmentId: courseData.departmentId,
        })
      });

      this.openUpdateModal();
  }

  updateCourse() {
    this.backendService.updateCourse(this.courseId(), this.courseForm.value)
      .subscribe((updatedCourse: Course) => {
        console.log("Updated course:", updatedCourse);
        this.courseForm.reset();
        this.closeUpdateModal();

        this.updateCourseResponse.emit(updatedCourse);
      });
  }

  getDepartments() {
    this.deptService.getDepartments().subscribe((data) => {
      this.departments.set(data);
    });
  }
}
