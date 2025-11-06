package com.pupt.ems.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pupt.ems.ems.model.Course;
import com.pupt.ems.ems.repository.CourseRepository;

@RestController
@RequestMapping("/api")
public class CourseController {

  @Autowired
  private CourseRepository courseRepository;

  @GetMapping("/home")
  public String home() {
    return "Welcome to the Enrollment Management System API";
  }

  @GetMapping(value = "/courses")
  public List<Course> getAllCourses() {
    return courseRepository.findAll();
  }
}
