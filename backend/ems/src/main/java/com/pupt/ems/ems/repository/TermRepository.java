package com.pupt.ems.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.pupt.ems.ems.model.Term;

import jakarta.transaction.Transactional;

public interface TermRepository extends JpaRepository<Term, Integer> {
  // Custom query methods can be defined here

  @Query("SELECT t FROM Term t WHERE t.isDeleted = false")
  List<Term> findAllActiveTerms();

  // Soft delete method
  @Modifying
  @Transactional
  @Query("UPDATE Term t SET t.isDeleted = true WHERE t.termId = ?1")
  int softDeleteById(Integer termId); // returns number of rows updated
}
