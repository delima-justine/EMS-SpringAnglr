import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Term } from '../../../models/ems.model';
import { TermsService } from '../../../service/terms.service';

@Component({
  selector: 'app-update-term-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-term-modal.html',
  styleUrl: './update-term-modal.scss',
})
export class UpdateTermModal {
  @ViewChild('updateTermModal') updateTermModal!: ElementRef;
  @ViewChild('openTermButton') openTermButton!: ElementRef<HTMLButtonElement>;
  termService = inject(TermsService);
  response = output<Term>();  
  termForm: FormGroup;
  termId = input(<number>(0));

  constructor(private formBuilder: FormBuilder) {
    this.termForm = this.formBuilder.group({
      termCode: [''],
      startDate: [''],
      endDate: [''],
      isDeleted: [false],
    })
  }

  openModal() {
    const modal = new Modal(this.updateTermModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateTermModal.nativeElement);
    modal?.hide();

    this.openTermButton?.nativeElement.focus();
  }

  openUpdateModal() {
    if(!this.termId()) return;

    this.openModal();

    this.termService.getTermById(this.termId())
      .subscribe((termData) => {
        this.termForm.setValue({
          termCode: termData.termCode,
          startDate: termData.startDate,
          endDate: termData.endDate,
          isDeleted: termData.isDeleted,
        });
      });
  }

  updateTerm() {
    this.termService.updateTerm(this.termId(), this.termForm.value)
      .subscribe((termData: Term) => {
        this.response.emit(termData);
        this.termForm.reset();
        this.closeModal();
      })
  }
}
