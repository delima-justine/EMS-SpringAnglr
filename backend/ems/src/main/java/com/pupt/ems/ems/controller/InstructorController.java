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
import com.pupt.ems.ems.model.Instructor;
import com.pupt.ems.ems.repository.InstructorRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class InstructorController {

  @Autowired
  private InstructorRepository instructorRepository;

  // Working: Get all instructors
  @GetMapping(value = "/instructors")
  public List<Instructor> getAllInstructors() {
    return instructorRepository.getAllExistingInstructors();
  }

  // Working: Create/Add new instructor
  @PostMapping(value = "/instructors")
  public Instructor createInstructor(@RequestBody Instructor instructor) {
    return instructorRepository.save(instructor);
  }

  // Working: Get instructor by ID
  @GetMapping("/instructors/{id}")
  public ResponseEntity<Instructor> getInstructorById(@PathVariable Integer id) {
    Instructor instructor = instructorRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(
        "Instructor not found"));

    return ResponseEntity.ok(instructor);
  }

  // Working: Update instructor by ID
  @PutMapping("/instructors/{id}")
  public ResponseEntity<Instructor> updateInstructor(@PathVariable Integer id,
      @RequestBody Instructor instructorData) {
    Instructor instructor = instructorRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(
        "Failed to update instructor"));

    instructor.setLastName(instructorData.getLastName());
    instructor.setFirstName(instructorData.getFirstName());
    instructor.setEmail(instructorData.getEmail());
    instructor.setDepartmentId(instructorData.getDepartmentId());

    Instructor updatedInstructor = instructorRepository.save(instructor);
    return ResponseEntity.ok(updatedInstructor);
  }

  // Working: Soft Delete instructor by ID
  @DeleteMapping("/instructors/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteInstructor(@PathVariable Integer id) {
    instructorRepository.softDeleteInstructorById(id);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/instructors/search")
  public List<Instructor> searchInstructorsByName(@RequestParam String name) {
    return instructorRepository.findByFullNameContainingNative(name);
  }
}
