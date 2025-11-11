package com.pupt.ems.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Room;
import jakarta.transaction.Transactional;

public interface RoomRepository extends JpaRepository<Room, Integer> {
  // Custom query methods can be defined here

  @Query("SELECT r FROM Room r WHERE r.isDeleted = false")
  List<Room> findAllActiveRooms();

  //Soft delete method
  @Modifying
  @Transactional
  @Query("UPDATE Room r SET r.isDeleted = true WHERE r.roomId = ?1")
  void softDeleteRoomById(Integer id);

  @Query(
    value = "SELECT * FROM tbl_room WHERE (building LIKE CONCAT('%', ?1, '%') OR room_code LIKE CONCAT('%', ?1, '%')) AND is_deleted = false", nativeQuery = true)
  List<Room> searchRoomsByBuildingOrCode(String keyword);
}