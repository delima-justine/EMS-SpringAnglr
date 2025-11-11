import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Room } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomUrl = 'http://localhost:8080/api/rooms';
  http = inject(HttpClient);

  getRooms() {
    return this.http.get<Room[]>(this.roomUrl);
  }

  getRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomUrl}/${roomId}`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomUrl, room);
  }

  updateRoom(roomId: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.roomUrl}/${roomId}`, room);
  }

  deleteRoom(roomId: number): Observable<Room> {
    return this.http.delete<Room>(`${this.roomUrl}/${roomId}`);
  }

  searchRooms(keyword: string): Observable<Room[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Room[]>(`${this.roomUrl}/search`, { params });
  }
}
