package com.pupt.ems.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pupt.ems.ems.model.Department;
import com.pupt.ems.ems.repository.DepartmentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class DepartmentController {

  @Autowired
  private DepartmentRepository departmentRepository;

  @GetMapping(value = "/departments")
  public List<Department> getAllDepartments() {
    return departmentRepository.getAllExistingDepartments();
  }
}
