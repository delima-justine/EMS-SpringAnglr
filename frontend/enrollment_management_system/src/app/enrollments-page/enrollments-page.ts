import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Enrollment } from '../../models/ems.model';
import { EnrollmentService } from '../../service/enrollment.service';

@Component({
  selector: 'app-enrollments-page',
  imports: [TopNav],
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
        console.log('Enrollments fetched:', enrollmentsData);
      });
  }
}
