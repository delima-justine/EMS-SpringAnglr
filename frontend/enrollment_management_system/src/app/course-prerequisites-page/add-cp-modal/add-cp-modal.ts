import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Modal } from 'bootstrap';
import { CoursePrereqService } from '../../../service/course-prereq.service';
import { CoursePrerequisite } from '../../../models/ems.model';

@Component({
  selector: 'app-add-cp-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cp-modal.html',
  styleUrl: './add-cp-modal.scss',
})
export class AddCpModal {
  @ViewChild('addCoursePrereqModal') addCoursePrereqModal!: ElementRef;
  coursePrereqForm: FormGroup;
  formBuilder = inject(FormBuilder);
  coursePrereqService = inject(CoursePrereqService);

  constructor() {
    this.coursePrereqForm = this.formBuilder.group({
      id: this.formBuilder.group ({
        courseId: [''],
        prereqCourseId: ['']
      }),
      isDeleted: [0],
    });
  }

  openModal() {
    const modal = new Modal(this.addCoursePrereqModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addCoursePrereqModal.nativeElement);
    modal?.hide();
    this.coursePrereqForm.reset();
  }

  addCoursePrerequisite() {
    this.coursePrereqService.addCoursePrerequisite(this.coursePrereqForm.value)
      .subscribe((created: CoursePrerequisite) => {
        console.log(created);
        this.coursePrereqForm.reset();
      });
    // console.log(this.coursePrereqForm.value);
  }
}
