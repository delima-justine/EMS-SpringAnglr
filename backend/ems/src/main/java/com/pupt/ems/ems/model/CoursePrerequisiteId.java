package com.pupt.ems.ems.model;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CoursePrerequisiteId implements Serializable {

  @Column(name = "course_id")
  private Integer courseId;

  @Column(name = "prereq_course_id")
  private Integer prereqCourseId;

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
}
