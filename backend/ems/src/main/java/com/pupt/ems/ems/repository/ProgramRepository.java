package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Program;

import jakarta.transaction.Transactional;

public interface ProgramRepository extends JpaRepository<Program, Integer> {
  // Additional query methods can be defined here if needed

  @Query("SELECT p FROM Program p WHERE p.isDeleted = false")
  List<Program> getAllExistingPrograms();

  // Soft Delete by Program ID
  @Modifying
  @Transactional
  @Query("UPDATE Program p SET p.isDeleted = true WHERE p.programId = ?1")
  int softDeleteById(Integer programId); // returns number of rows updated
}
