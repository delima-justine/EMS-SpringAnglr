import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Room } from '../../models/ems.model';
import { RoomService } from '../../service/room.service';
import { AddRoomModal } from "./add-room-modal/add-room-modal";
import { UpdateRoomModal } from "./update-room-modal/update-room-modal";

@Component({
  selector: 'app-rooms-page',
  imports: [TopNav, AddRoomModal, UpdateRoomModal],
  templateUrl: './rooms-page.html',
  styleUrl: './rooms-page.scss',
})
export class RoomsPage implements OnInit {
  @ViewChild('sortOrder') sortOrder!: ElementRef;
  rooms = signal(<Room[]>[]);
  roomService = inject(RoomService);

  ngOnInit(): void {
    this.getRooms();
  }

  // Get Rooms
  getRooms() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms.set(data);
    });
  }

  // Soft Delete Room
  deleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId).subscribe(() => {
      this.getRooms();
    });
  }

  // Handle Add Room Response
  onRoomAdded(newRoom: Room) {
    this.rooms.update((rooms) => [...rooms, newRoom]);
  }

  // Handle Update Room Response
  onRoomUpdated(updatedRoom:Room) {
    this.rooms.update((rooms) => rooms.map((room) => 
      room.roomId === updatedRoom.roomId ? updatedRoom : room
    ));
  }

  searchRooms(keyword: string) {
    this.roomService.searchRooms(keyword).subscribe((searchedRooms) => {
      this.rooms.set(searchedRooms);
    });
  }

  sortRooms() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case 'asc':
        this.roomService.sortRoomsAsc().subscribe((sortedRooms) => {
          this.rooms.set(sortedRooms);
        });
        break;
      case 'desc':
        this.roomService.sortRoomsAsc().subscribe((sortedRooms) => {
          this.rooms.set(sortedRooms.reverse());
        });
        break;
    }
  }
}
