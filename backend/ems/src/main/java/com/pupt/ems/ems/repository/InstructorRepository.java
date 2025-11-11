package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Instructor;
import jakarta.transaction.Transactional;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
  // Define custom query methods here

  @Query("SELECT i FROM Instructor i WHERE i.isDeleted = false ORDER BY i.instructorId DESC")
  List<Instructor> getAllExistingInstructors();

  // Soft Delete Instructor by ID
  @Modifying
  @Transactional
  @Query("UPDATE Instructor i SET i.isDeleted = true WHERE i.instructorId = ?1")
  void softDeleteInstructorById(Integer instructorId);

  @Query(
      value = "SELECT * FROM tbl_instructor WHERE (CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', ?1, '%') OR " +
              "CONCAT(last_name, ' ', first_name) LIKE CONCAT('%', ?1, '%')) AND is_deleted = false",
      nativeQuery = true
  )
  List<Instructor> findByFullNameContainingNative(String name);
}
