package com.pupt.ems.ems.controller;

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
import com.pupt.ems.ems.model.Student;
import com.pupt.ems.ems.repository.StudentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class StudentController {

  @Autowired
  private StudentRepository studentRepository;

  // Working: Get All Students
  @GetMapping(value = "/students")
  public List<Student> getAllStudents() {
    return studentRepository.findAllActiveStudents();
  }

  // Working: Get Student by ID
  @GetMapping(value = "/students/{id}")
  public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
    Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student Not Found"));
    return ResponseEntity.ok(student);
  }

  // Working: Create/Add new Student
  @PostMapping(value = "/students")
  public Student createStudent(@RequestBody Student student) {
    return studentRepository.save(student);
  }

  // Working: Update Student by ID
  @PutMapping("/students/{id}")
  public ResponseEntity<Student> updateStudent(@PathVariable Integer id,
    @RequestBody Student studentData)
  {
    Student existingStudent = studentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Failed to update"));

    existingStudent.setStudentNo(studentData.getStudentNo());
    existingStudent.setLastName(studentData.getLastName());
    existingStudent.setFirstName(studentData.getFirstName());
    existingStudent.setMiddleName(studentData.getMiddleName());
    existingStudent.setEmail(studentData.getEmail());
    existingStudent.setBirthDate(studentData.getBirthDate());
    existingStudent.setGender(studentData.getGender());
    existingStudent.setProgramId(studentData.getProgramId());

    Student updatedStudent = studentRepository.save(existingStudent);
    return ResponseEntity.ok(updatedStudent);
  }

  // Working: Soft Delete Student by ID
  @DeleteMapping("/students/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Integer id) {
    studentRepository.softDeleteStudent(id);
    Map<String, Boolean> response = Map.of("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
