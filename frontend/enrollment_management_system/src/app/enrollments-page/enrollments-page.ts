import { Component, inject, OnInit, signal } from '@angular/core';
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
  }

  // Handler for when an enrollment is updated
  onEnrollmentUpdated(updatedEnrollment: Enrollment) {
    this.enrollments.update(currentEnrollments => 
      currentEnrollments.map(enrollment => 
        enrollment.enrollmentId === updatedEnrollment.enrollmentId ? 
        updatedEnrollment : enrollment
      )
    );
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
}
