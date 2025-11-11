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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pupt.ems.ems.exception.ResourceNotFoundException;
import com.pupt.ems.ems.model.Term;
import com.pupt.ems.ems.repository.TermRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TermController {

  @Autowired
  private TermRepository termRepository;

  // Working: Get all terms
  @GetMapping(value = "/terms")
  public List<Term> getAllTerms() {
    return termRepository.findAllActiveTerms();
  }

  // Working: Get Terms by ID
  @GetMapping(value = "/terms/{id}")
  public ResponseEntity<Term> getTermById(@PathVariable Integer id) {
    Term term = termRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Term not found with id :" + id));
    return ResponseEntity.ok(term);
  }

  // Working: Create/Add new Term
  @PostMapping(value = "/terms")
  public Term createTerm(@RequestBody Term term) {
    return termRepository.save(term);
  }

  // Working: Update Term by ID
  @PutMapping("/terms/{id}")
  public ResponseEntity<Term> updateTerm(@PathVariable Integer id,
    @RequestBody Term termData)
  {
    Term term = termRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Term not found"));

    term.setTermCode(termData.getTermCode());
    term.setStartDate(termData.getStartDate());
    term.setEndDate(termData.getEndDate());

    Term updatedTerm = termRepository.save(term);
    return ResponseEntity.ok(updatedTerm);
  }

  // Working: Soft Delete Term by ID
  @DeleteMapping(value = "/terms/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteTerm(@PathVariable Integer id) {
    termRepository.softDeleteById(id);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }

  @GetMapping(value = "/terms/search")
  public List<Term> searchTermsByCode(@RequestParam String keyword) {
    return termRepository.searchTermsByCode(keyword);
  }

  @GetMapping("/terms/asc")
  public List<Term> getAllTermsAsc() {
    return termRepository.findAllActiveTermsAsc();
  }
}
