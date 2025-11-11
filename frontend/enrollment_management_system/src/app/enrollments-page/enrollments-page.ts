import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Enrollment } from '../../models/ems.model';
import { EnrollmentService } from '../../service/enrollment.service';
import { AddEnrollmentModal } from "./add-enrollment-modal/add-enrollment-modal";
import { UpdateEnrollmentModal } from "./update-enrollment-modal/update-enrollment-modal";

@Component({
  selector: 'app-enrollments-page',
  imports: [TopNav, AddEnrollmentModal, UpdateEnrollmentModal],
  templateUrl: './enrollments-page.html',
  styleUrl: './enrollments-page.scss',
})
export class EnrollmentsPage implements OnInit {
  @ViewChild('sortOrder') sortOrder!: ElementRef;
  enrollments = signal(<Enrollment[]>[]);
  enrollmentService = inject(EnrollmentService);

  ngOnInit() {
    this.getEnrollments();
  }

  // Get Enrollments from the backend
  getEnrollments() {
    this.enrollmentService.getEnrollments()
      .subscribe(enrollmentsData => {
        this.enrollments.set(enrollmentsData);
      });
  }

  // Handler for when a new enrollment is added
  onEnrollmentAdded(newEnrollment: Enrollment) {
    this.enrollments.update(
      currentEnrollments => [...currentEnrollments, newEnrollment]);
    this.getEnrollments();
  }

  // Handler for when an enrollment is updated
  onEnrollmentUpdated(updatedEnrollment: Enrollment) {
    this.enrollments.update(currentEnrollments => 
      currentEnrollments.map(enrollment => 
        enrollment.enrollmentId === updatedEnrollment.enrollmentId ? 
        updatedEnrollment : enrollment
      )
    );

    this.getEnrollments();
  }

  // Handler for when an enrollment is deleted
  deleteEnrollment(enrollmentId: number) {
    this.enrollmentService.deleteEnrollment(enrollmentId)
      .subscribe(() => {
        this.enrollments.update(currentEnrollments => 
          currentEnrollments.filter(enrollment => 
            enrollment.enrollmentId !== enrollmentId)
        );
      });
  }

  searchEnrollmentsByStudentId(studentId: number) {
    this.enrollmentService.searchEnrollmentByStudentId(studentId)
      .subscribe(enrollmentsData => {
        this.enrollments.set(enrollmentsData);
    });
  }

  sortEnrollments() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case 'asc':
        this.enrollmentService.sortEnrollmentsByIDAsc()
          .subscribe(sortedEnrollments => {
            this.enrollments.set(sortedEnrollments);
        });
        break;
      case 'desc':
        this.enrollmentService.sortEnrollmentsByIDAsc()
          .subscribe(sortedEnrollments => {
            this.enrollments.set(sortedEnrollments.reverse());
        });
        break;
    }
  }
}
