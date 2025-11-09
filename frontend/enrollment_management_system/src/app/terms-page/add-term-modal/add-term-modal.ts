import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { TermsService } from '../../../service/terms.service';
import { Term } from '../../../models/ems.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-term-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-term-modal.html',
  styleUrl: './add-term-modal.scss',
})
export class AddTermModal {
  @ViewChild('addTermModal') addTermModal!: ElementRef;
  @ViewChild('openTermButton') openTermButton!: ElementRef<HTMLButtonElement>;
  termService = inject(TermsService);
  response = output<Term>();  
  termForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.termForm = this.formBuilder.group({
      termCode: [''],
      startDate: [''],
      endDate: [''],
      isDeleted: [false],
    })
  }

  openModal() {
    const modal = new Modal(this.addTermModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addTermModal.nativeElement);
    modal?.hide();

    this.openTermButton?.nativeElement.focus();
  }

  addTerm() {
    this.termService.addTerm(this.termForm.value).subscribe((data) => {
      this.response.emit(data);
      this.termForm.reset();
      this.closeModal();
    });
  }
}
