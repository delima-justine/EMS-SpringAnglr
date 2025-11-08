package com.pupt.ems.ems.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pupt.ems.ems.exception.ResourceNotFoundException;
import com.pupt.ems.ems.model.Room;
import com.pupt.ems.ems.repository.RoomRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class RoomController {

  @Autowired
  private RoomRepository roomRepository;
  
  // Working: Get all rooms
  @GetMapping("/rooms")
  public List<Room> getAllRooms() {
    return roomRepository.findAllActiveRooms();
  }

  // Working: Get room by ID
  @GetMapping("/rooms/{id}")
  public ResponseEntity<Room> getRoomById(@PathVariable Integer id) {
    Room room = roomRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Room Not Found"));
    return ResponseEntity.ok(room);
  }

  // Working: Create/Add new room
  @PostMapping("/rooms")
  public Room createRoom(@RequestBody Room room) {
    return roomRepository.save(room);
  }

  // Working: Update Room By ID
  @PutMapping("/rooms/{id}")
  public ResponseEntity<Room> updateRoom(@PathVariable Integer id,
    @RequestBody Room roomData) 
  {
    Room room = roomRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Failed to update"));

    room.setBuilding(roomData.getBuilding());
    room.setRoomCode(roomData.getRoomCode());
    room.setCapacity(roomData.getCapacity());

    Room updatedRoom = roomRepository.save(room);
    return ResponseEntity.ok(updatedRoom);
  }

  // Working: Soft Delete Room By ID
  @DeleteMapping("/rooms/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteRoom(@PathVariable Integer id) {
    roomRepository.softDeleteRoomById(id);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
