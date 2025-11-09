import { Component, ElementRef, inject, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { RoomService } from '../../../service/room.service';
import { Room } from '../../../models/ems.model';

@Component({
  selector: 'app-add-room-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-room-modal.html',
  styleUrl: './add-room-modal.scss',
})
export class AddRoomModal {
  @ViewChild('addRoomModal') addRoomModal!: ElementRef;
  @ViewChild('openRoomButton') addRoomButton!: ElementRef<HTMLButtonElement>;
  roomForm: FormGroup;
  roomService = inject(RoomService);
  response = output<Room>();

  constructor(private formBuilder: FormBuilder) {
    this.roomForm = this.formBuilder.group({
      building: [''],
      roomCode: [''],
      capacity: [''],
      isDeleted: [false]
    });
  }

  openModal() {
    const modal = new Modal(this.addRoomModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.addRoomModal.nativeElement);
    modal?.hide();

    this.addRoomButton?.nativeElement.focus();
  }

  addRoom() {
    this.roomService.addRoom(this.roomForm.value)
      .subscribe((createdRoom: Room) => {
        this.response.emit(createdRoom);
        this.roomForm.reset();
        this.closeModal();
    });
  }
}
