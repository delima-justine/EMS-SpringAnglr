import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        FormGroup, 
        ReactiveFormsModule,
        FormControl,
        FormBuilder,
        Validators
      } from '@angular/forms';
import { SectionService } from '../../../service/section.service';
import { Section } from '../../../models/ems.model';

@Component({
  selector: 'app-add-section-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-section-modal.html',
  styleUrl: './add-section-modal.scss',
})
export class AddSectionModal {
  @ViewChild('addSectionModal') addSectionModal!: ElementRef;
  @ViewChild('openSectionButton') addSectionButton!: ElementRef<HTMLButtonElement>;
  sectionForm: FormGroup;
  sectionService = inject(SectionService);
  response = output<Section>();

  constructor(private formBuilder: FormBuilder) {
    this.sectionForm = this.formBuilder.group({
      sectionId: [''],
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
}
