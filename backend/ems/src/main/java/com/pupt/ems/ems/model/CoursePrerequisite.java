package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_course_prerequisite")
public class CoursePrerequisite {

  @EmbeddedId
  private CoursePrerequisiteId id;

  @Column(name = "is_deleted")
  private Integer isDeleted;

  public CoursePrerequisiteId getId() {
    return id;
  }

  public void setId(CoursePrerequisiteId id) {
    this.id = id;
  }

  public Integer getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Integer isDeleted) {
    this.isDeleted = isDeleted;
  }
}
