package com.pupt.ems.ems.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_course_prerequisite")
public class CoursePrerequisite {
  private Integer courseId;
  private Integer prereqCourseId;
  private Boolean isDeleted;

  // Getters and Setters
  public Integer getCourseId() {
    return courseId;
  }

  public void setCourseId(Integer courseId) {
    this.courseId = courseId;
  }

  public Integer getPrereqCourseId() {
    return prereqCourseId;
  }

  public void setPrereqCourseId(Integer prereqCourseId) {
    this.prereqCourseId = prereqCourseId;
  }

  public Boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
