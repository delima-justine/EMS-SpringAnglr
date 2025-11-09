import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { 
        ReactiveFormsModule,
        FormGroup,
        FormBuilder,
        FormControl,
        Validators
      } from '@angular/forms';
import { Room } from '../../../models/ems.model';
import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-update-room-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './update-room-modal.html',
  styleUrl: './update-room-modal.scss',
})
export class UpdateRoomModal {
  @ViewChild('updateRoomModal') updateRoomModal!: ElementRef;
  @ViewChild('openRoomButton') openRoomButton!: ElementRef<HTMLButtonElement>;
  roomForm: FormGroup;
  roomService = inject(RoomService);
  roomId = input(<number>(0));
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
    const modal = new Modal(this.updateRoomModal.nativeElement);
    modal.show();
  }

  closeModal() {
    const modal = Modal.getInstance(this.updateRoomModal.nativeElement);
    modal?.hide();

    this.openRoomButton?.nativeElement.focus();
  }

  openRoomModal() {
    if(!this.roomId()) return;
    this.openModal();
    
    this.roomService.getRoomById(this.roomId()).subscribe((roomData) => {
      this.roomForm.setValue({
        building: roomData.building,
        roomCode: roomData.roomCode,
        capacity: roomData.capacity,
        isDeleted: roomData.isDeleted
      });
    });
  }

  updateRoom() {
    this.roomService.updateRoom(this.roomId(), this.roomForm.value)
      .subscribe((updatedRoom: Room) => {
        this.response.emit(updatedRoom);
        this.roomForm.reset();
        this.closeModal();
    });
  }
}
