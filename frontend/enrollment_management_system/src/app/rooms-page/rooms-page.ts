import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Room } from '../../models/ems.model';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-rooms-page',
  imports: [TopNav],
  templateUrl: './rooms-page.html',
  styleUrl: './rooms-page.scss',
})
export class RoomsPage implements OnInit {
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
  deleteRooms(roomId: number) {
    this.roomService.deleteRoom(roomId).subscribe(() => {
      this.getRooms();
    });
  }
}
