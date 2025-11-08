package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Instructor;
import jakarta.transaction.Transactional;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
  // Define custom query methods here

  @Query("SELECT i FROM Instructor i WHERE i.isDeleted = false")
  List<Instructor> getAllExistingInstructors();

  // Soft Delete Instructor by ID
  @Modifying
  @Transactional
  @Query("UPDATE Instructor i SET i.isDeleted = true WHERE i.instructorId = ?1")
  void softDeleteInstructorById(Integer instructorId);
}
