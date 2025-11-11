import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
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
  @ViewChild('sortOrder') sortOrder!: ElementRef;
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
    this.getInstructors();
  }

  // Handle Updated Instructor Event
  onInstructorUpdated(updatedInstructor: Instructor) {
    this.instructors.update(list => list.map(instructor => 
      instructor.instructorId === updatedInstructor.instructorId 
        ? updatedInstructor : instructor));

    this.getInstructors();
  }

  searchInstructor(name: string) {
    this.instructorService.searchInstructor(name)
      .subscribe(searchResults => {
        this.instructors.set(searchResults);
      })
  }

  sortInstructors() {
    const sortValue = this.sortOrder.nativeElement.value;

    switch(sortValue) {
      case 'asc':
        this.instructorService.sortInstructorsByNameAsc()
          .subscribe(sortedInstructors => {
            this.instructors.set(sortedInstructors);
          });
        break;
      case 'desc':
        this.instructorService.sortInstructorsByNameAsc()
          .subscribe(sortedInstructors => {
            this.instructors.set(sortedInstructors.reverse());
          });
        break;
    }
  }
}
