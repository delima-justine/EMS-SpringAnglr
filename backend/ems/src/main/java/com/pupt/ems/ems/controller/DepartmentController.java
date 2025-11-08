package com.pupt.ems.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pupt.ems.ems.exception.ResourceNotFoundException;
import com.pupt.ems.ems.model.Department;
import com.pupt.ems.ems.repository.DepartmentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DepartmentController {

  @Autowired
  private DepartmentRepository departmentRepository;

  // Get all dept that is not flagged as deleted
  @GetMapping(value = "/departments")
  public List<Department> getAllDepartments() {
    return departmentRepository.getAllExistingDepartments();
  }

  // Create new department
  @PostMapping(value = "/departments")
  public Department createDepartment(@RequestBody Department department) {
    return departmentRepository.save(department);
  }

  // Get department by ID
  @GetMapping(value = "/departments/{id}")
  public ResponseEntity<Department> getDepartmentById(@PathVariable Integer id) {
    Department department = departmentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Department not found, id: " + id));
    return ResponseEntity.ok(department);
  }

  // Update Department
  @PutMapping(value = "/departments/{id}")
  public ResponseEntity<Department> updateDepartment
    (@PathVariable Integer id, @RequestBody Department department) 
  {
    Department existingDepartment = departmentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Department not found, id: " + id));
    existingDepartment.setDepartmentName(department.getDepartmentName());
    existingDepartment.setDepartmentCode(department.getDepartmentCode());
    departmentRepository.save(existingDepartment);
    return ResponseEntity.ok(existingDepartment);
  }
}
