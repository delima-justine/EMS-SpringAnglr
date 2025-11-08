package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Enrollment;

import jakarta.transaction.Transactional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
  // Custom query methods (if needed) can be defined here

  @Query("SELECT e FROM Enrollment e WHERE e.isDeleted = false")
  List<Enrollment> findAllActiveEnrollments();

  // Soft delete enrollment by ID
  @Modifying
  @Transactional
  @Query("UPDATE Enrollment e SET e.isDeleted = true WHERE e.id = ?1")
  void softDeleteById(Integer id);
}
