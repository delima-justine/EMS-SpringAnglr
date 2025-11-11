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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pupt.ems.ems.exception.ResourceNotFoundException;
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

  // Create/Add new Course Prerequisite
  @PostMapping(value = "/course-prerequisites")
  public CoursePrerequisite createCoursePrerequisite(@RequestBody CoursePrerequisite coursePrerequisite) {
    return coursePrerequisiteRepository.save(coursePrerequisite);
  }

  // Get Course Prerequisites by Course ID
  @GetMapping(value = "/course-prerequisites/{courseId}")
  public ResponseEntity<List<CoursePrerequisite>> getCoursePrerequisitesByCourseId(@PathVariable Integer courseId) {
    List<CoursePrerequisite> coursePrerequisites = coursePrerequisiteRepository.findByIdCourseId(courseId);
    if (coursePrerequisites.isEmpty()) {
      throw new ResourceNotFoundException("Course Prerequisites not found with course id :" + courseId);
    }
    return ResponseEntity.ok(coursePrerequisites);
  }

  // Delete Course Prerequisite by ID
  @DeleteMapping(value = "/course-prerequisites/{courseId}/{prereqId}")
  public ResponseEntity<Map<String, Boolean>> deleteCoursePrerequisite(
    @PathVariable Integer courseId, @PathVariable Integer prereqId)
  {
    int rowsUpdated = coursePrerequisiteRepository.softDeleteById(courseId, prereqId);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", rowsUpdated > 0);
    return ResponseEntity.ok(response);
  }

  @GetMapping(value = "/course-prerequisites/asc")
  public List<CoursePrerequisite> getCoursePrerequisitesAsc() {
    return coursePrerequisiteRepository.getCoursePrerequisitesAsc();
  }
}