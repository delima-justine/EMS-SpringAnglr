package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Section;

import jakarta.transaction.Transactional;

public interface SectionRepository extends JpaRepository<Section, Integer> {
  // Custom query methods (if needed) can be defined here

  @Query("SELECT s FROM Section s WHERE s.isDeleted = false")
  List<Section> findAllActiveSections();

  @Modifying
  @Transactional
  @Query("UPDATE Section s SET s.isDeleted = true WHERE s.sectionId = ?1")
  int softDeleteById(Integer sectionId); // returns number of rows updated
}
