package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_enrollment")
public class Enrollment {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "enrollment_id")
  private Integer enrollmentId;

  @Column(name = "student_id")
  private Integer studentId;

  @Column(name = "section_id")
  private Integer sectionId;

  @Column(name = "date_enrolled")
  private String dateEnrolled;

  @Column(name = "status")
  private String status;

  @Column(name = "letter_grade")
  private String letterGrade;
  
  @Column(name = "is_deleted")
  private Boolean isDeleted;

  public Integer getEnrollmentId() {
    return enrollmentId;
  }

  public void setEnrollmentId(Integer enrollmentId) {
    this.enrollmentId = enrollmentId;
  }

  public Integer getStudentId() {
    return studentId;
  }

  public void setStudentId(Integer studentId) {
    this.studentId = studentId;
  }

  public Integer getSectionId() {
    return sectionId;
  }

  public void setSectionId(Integer sectionId) {
    this.sectionId = sectionId;
  }

  public String getDateEnrolled() {
    return dateEnrolled;
  }

  public void setDateEnrolled(String dateEnrolled) {
    this.dateEnrolled = dateEnrolled;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getLetterGrade() {
    return letterGrade;
  }
  
  public void setLetterGrade(String letterGrade) {
    this.letterGrade = letterGrade;
  }

  public Boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
