import Modal from 'bootstrap/js/dist/modal';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  imports: [CommonModule],
  templateUrl: './add-modal.html',
  styleUrls: ['./add-modal.scss'], // fixed key
})
export class AddModal {
  @ViewChild('addCourseModal') addCourseModal!: ElementRef;

  openModal() {
    const modal = new Modal(this.addCourseModal.nativeElement);
    modal.show();
  }
}
