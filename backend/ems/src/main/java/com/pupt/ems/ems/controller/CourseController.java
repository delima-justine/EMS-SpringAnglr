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
import com.pupt.ems.ems.model.Course;
import com.pupt.ems.ems.repository.CourseRepository;

@CrossOrigin(origins = "http://localhost:4200")
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
    return courseRepository.getAllExistingCourses();
  }

  // Create/Add new course
  @PostMapping(value = "/courses")
  public Course createCourse(@RequestBody Course course) {
    return courseRepository.save(course);
  }

  // Get course by ID
  @GetMapping(value = "/courses/{id}")
  public ResponseEntity<Course> getCourseById(@PathVariable Integer id) {
    Course course = courseRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + id));
    return ResponseEntity.ok(course);
  }

  // Update Course by ID
  @PutMapping("/courses/{id}")
  public ResponseEntity<Course> updateCourse(@PathVariable Integer id, 
      @RequestBody Course courseData) {
    Course course = courseRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + id));

    course.setCourseCode(courseData.getCourseCode());
    course.setCourseTitle(courseData.getCourseTitle());
    course.setUnits(courseData.getUnits());
    course.setLectureHours(courseData.getLectureHours());
    course.setLabHours(courseData.getLabHours());
    course.setDepartmentId(courseData.getDepartmentId());

    Course updatedCourse = courseRepository.save(course);
    return ResponseEntity.ok(updatedCourse);
  }

  // Delete Course by ID
  @DeleteMapping("/courses/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteCourse(@PathVariable Integer id) {
    Course course = courseRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Course not found with id :" + id));

      courseRepository.softDeleteById(id);
      Map<String, Boolean> response = new HashMap<>();
      response.put("deleted", Boolean.TRUE);
      return ResponseEntity.ok(response);
  }
}
