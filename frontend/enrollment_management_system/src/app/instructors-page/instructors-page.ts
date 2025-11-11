import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Instructor } from '../../models/ems.model';
import { InstructorService } from '../../service/instructor.service';
import { AddInstructorModal } from "./add-instructor-modal/add-instructor-modal";
import { UpdateInstructorModal } from "./update-instructor-modal/update-instructor-modal";

@Component({
  selector: 'app-instructors-page',
  imports: [TopNav, AddInstructorModal, UpdateInstructorModal],
  templateUrl: './instructors-page.html',
  styleUrl: './instructors-page.scss',
})
export class InstructorsPage implements OnInit {
  instructors = signal(<Instructor[]>[]);
  instructorService = inject(InstructorService);

  // Fetch Instructors on Init
  ngOnInit() {
    this.getInstructors();
  }

  // Get All Instructors
  getInstructors() {
    this.instructorService.getInstructors()
      .subscribe(instructorsData => {
        this.instructors.set(instructorsData);
    });
  }

  // Soft Delete Instructor
  deleteInstructor(instructorId: number) {
    this.instructorService.deleteInstructor(instructorId)
      .subscribe(() => {
        this.getInstructors();
    });
  }

  // Handle Added Instructor Event
  onInstructorAdded(newInstructor: Instructor) {
    this.instructors.update(list => [...list, newInstructor]);
  }

  // Handle Updated Instructor Event
  onInstructorUpdated(updatedInstructor: Instructor) {
    this.instructors.update(list => list.map(instructor => 
      instructor.instructorId === updatedInstructor.instructorId 
        ? updatedInstructor : instructor));
  }

  searchInstructor(name: string) {
    this.instructorService.searchInstructor(name)
      .subscribe(searchResults => {
        this.instructors.set(searchResults);
      })
  }
}
