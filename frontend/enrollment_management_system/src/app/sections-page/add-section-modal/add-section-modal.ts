import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        FormGroup, 
        ReactiveFormsModule,
        FormControl,
        FormBuilder,
        Validators
      } from '@angular/forms';
import { SectionService } from '../../../service/section.service';
import { Course, Instructor, Room, Section, Term } from '../../../models/ems.model';
import { InstructorService } from '../../../service/instructor.service';
import { Backend } from '../../../service/backend';
import { TermsService } from '../../../service/terms.service';
import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-add-section-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-section-modal.html',
  styleUrl: './add-section-modal.scss',
})
export class AddSectionModal implements OnInit {
  @ViewChild('addSectionModal') addSectionModal!: ElementRef;
  @ViewChild('openSectionButton') addSectionButton!: ElementRef<HTMLButtonElement>;
  sectionForm: FormGroup;
  response = output<Section>();
  sectionService = inject(SectionService);
  courseService = inject(Backend);
  termService = inject(TermsService);
  roomService = inject(RoomService);
  instructorService = inject(InstructorService);
  courses = signal(<Course[]>[])
  instructors = signal(<Instructor[]>[]);
  terms = signal(<Term[]>[]);
  rooms = signal(<Room[]>[]);

  constructor(private formBuilder: FormBuilder) {
    this.sectionForm = this.formBuilder.group({
      sectionCode: [''],
      courseId: [''],
      termId: [''],
      instructorId: [''],
      dayPattern: [''],
      startTime: [''],
      endTime: [''],
      roomId: [''],
      maxCapacity: [''],
      isDeleted: [false]
    });
  }

  ngOnInit(): void {
    this.getCourses();
    this.getInstructors();
    this.getTerms();
    this.getRooms();
  }

  openModal() {
    const modal = new Modal(this.addSectionModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addSectionModal.nativeElement);
    modal?.hide();

    this.addSectionButton?.nativeElement.focus();
  }

  addSection() {
    this.sectionService.addSection(this.sectionForm.value)
      .subscribe((newSection: Section) => {
        this.response.emit(newSection);
        this.sectionForm.reset();
        this.closeModal();
    });
  }

  getCourses() {
    this.courseService.sortCoursesAsc().subscribe(courses => {
      this.courses.set(courses);
    });
  }

  getInstructors() {
    this.instructorService.sortInstructorsByNameAsc().subscribe(instructors => {
      this.instructors.set(instructors);
    });
  }

  getTerms() {
    this.termService.sortTermsAsc().subscribe(fetchedTerms => {
      this.terms.set(fetchedTerms);
    });
  }

  getRooms() {
    this.roomService.sortRoomsAsc().subscribe(rooms => {
      this.rooms.set(rooms);
    });
  }
}
