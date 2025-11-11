import { Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
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
import { Backend } from '../../../service/backend';
import { InstructorService } from '../../../service/instructor.service';
import { RoomService } from '../../../service/room.service';
import { TermsService } from '../../../service/terms.service';

@Component({
  selector: 'app-update-section-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-section-modal.html',
  styleUrl: './update-section-modal.scss',
})
export class UpdateSectionModal implements OnInit {
  @ViewChild('updateSectionModal') updateSectionModal!: ElementRef;
  @ViewChild('openSectionButton') openSectionButton!: ElementRef<HTMLButtonElement>;
  sectionForm: FormGroup;
  sectionService = inject(SectionService);
  sectionId = input(<number>(0));
  response = output<Section>();
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
    const modal = new Modal(this.updateSectionModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateSectionModal.nativeElement);
    modal?.hide();

    this.openSectionButton?.nativeElement.focus();
  }

  openUpdateModal() {
    if(!this.sectionId()) return;

    this.openModal();

    this.sectionService.getSectionById(this.sectionId())
      .subscribe((sectionData: Section) => {
        this.sectionForm.setValue({
          sectionCode: sectionData.sectionCode,
          courseId: sectionData.courseId,
          termId: sectionData.termId,
          instructorId: sectionData.instructorId,
          dayPattern: sectionData.dayPattern,
          startTime: sectionData.startTime,
          endTime: sectionData.endTime, 
          roomId: sectionData.roomId,
          maxCapacity: sectionData.maxCapacity,
          isDeleted: sectionData.isDeleted
        });
      });
  }

  updateSection() {
    this.sectionService.updateSection(this.sectionId(), this.sectionForm.value)
      .subscribe((updatedSection: Section) => {
        this.response.emit(updatedSection);
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
