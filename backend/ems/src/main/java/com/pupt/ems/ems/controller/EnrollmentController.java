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
import com.pupt.ems.ems.model.Enrollment;
import com.pupt.ems.ems.repository.EnrollmentRepository;

@CrossOrigin(origins = "https://localhost:4200")
@RestController
@RequestMapping("/api")
public class EnrollmentController {

  @Autowired
  private EnrollmentRepository enrollmentRepository;

  @GetMapping(value = "/enrollments")
  public List<Enrollment> getAllEnrollments() {
    return enrollmentRepository.findAllActiveEnrollments();
  }

  // Create new enrollment
  @PostMapping(value = "/enrollments")
  public Enrollment createEnrollment(@RequestBody Enrollment enrollment) {
    return enrollmentRepository.save(enrollment);
  }

  // Get enrollment by ID
  @GetMapping(value = "/enrollments/{id}")
  public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Integer id) {
    Enrollment enrollment = enrollmentRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));

    return ResponseEntity.ok(enrollment);
  }

  // Update Enrollment by ID
  @PutMapping(value = "/enrollments/{id}")
  public ResponseEntity<Enrollment> updateEnrollment
    (@PathVariable Integer id, @RequestBody Enrollment enrollment) 
  {
    Enrollment existingEnrollment = enrollmentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found id: " + id));

    existingEnrollment.setStudentId(enrollment.getStudentId());
    existingEnrollment.setSectionId(enrollment.getSectionId());
    existingEnrollment.setStatus(enrollment.getStatus());
    existingEnrollment.setDateEnrolled(enrollment.getDateEnrolled());
    existingEnrollment.setLetterGrade(enrollment.getLetterGrade());

    Enrollment updatedEnrollment = enrollmentRepository.save(existingEnrollment);
    return ResponseEntity.ok(updatedEnrollment);
  }

  // Soft Delete Enrollment by ID
  @DeleteMapping(value = "/enrollments/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteEnrollment
    (@PathVariable Integer id)
  {
    enrollmentRepository.softDeleteById(id);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
