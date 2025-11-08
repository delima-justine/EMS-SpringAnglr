package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_section")
public class Section {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "section_id")
  private Integer sectionId;

  @Column(name = "section_code")
  private String sectionCode;

  @Column(name = "course_id")
  private Integer courseId;

  @Column(name = "term_id")
  private Integer termId;

  @Column(name = "instructor_id")
  private Integer instructorId;

  @Column(name = "day_pattern")
  private String dayPattern;

  @Column(name = "start_time")  
  private String startTime;

  @Column(name = "end_time")
  private String endTime;

  @Column(name = "room_id")
  private String roomId;

  @Column(name = "max_capacity")
  private Integer maxCapacity;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

  public Integer getSectionId() {
    return sectionId;
  }

  public void setSectionId(Integer sectionId) {
    this.sectionId = sectionId;
  }
   
  public String getSectionCode() {
    return sectionCode;
  }

  public void setSectionCode(String sectionCode) {
    this.sectionCode = sectionCode;
  }

  public Integer getCourseId() {
    return courseId;
  }

  public void setCourseId(Integer courseId) {
    this.courseId = courseId;
  }

  public Integer getTermId() {
    return termId;
  }

  public void setTermId(Integer termId) {
    this.termId = termId;
  }

  public Integer getInstructorId() {
    return instructorId;
  }

  public void setInstructorId(Integer instructorId) {
    this.instructorId = instructorId;
  }

  public String getDayPattern() {
    return dayPattern;
  }

  public void setDayPattern(String dayPattern) {
    this.dayPattern = dayPattern;
  }

  public String getStartTime() {
    return startTime;
  }
  
  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }

  public Integer getMaxCapacity() {
    return maxCapacity;
  }

  public void setMaxCapacity(Integer maxCapacity) {
    this.maxCapacity = maxCapacity;
  }

  public Boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
