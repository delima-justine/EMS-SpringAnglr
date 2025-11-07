package com.pupt.ems.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pupt.ems.ems.model.CoursePrerequisite;
import com.pupt.ems.ems.repository.CoursePrerequisiteRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CoursePrerequisitesController {

  @Autowired
  private CoursePrerequisiteRepository coursePrerequisiteRepository;

  @GetMapping(value = "/course-prerequisites")
  public List<CoursePrerequisite> getCoursePrerequisites() {
    return coursePrerequisiteRepository.getCoursePrerequisites();
  }
}
