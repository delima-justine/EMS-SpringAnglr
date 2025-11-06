package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "course_title")
    private String courseTitle;

    @Column(name = "units")
    private int units;

    @Column(name = "lecture_hours")
    private int lectureHours;

    @Column(name = "lab_hours")
    private int labHours;

    @Column(name = "dept_id")
    private int departmentId;

    @Column(name = "is_deleted")
    private int isDeleted;

    public Integer getCourseId() {
      return courseId;
    }

    public void setCourseId(Integer courseId) {
      this.courseId = courseId;
    }

    public String getCourseCode() {
      return courseCode;
    }

    public void setCourseCode(String courseCode) {
      this.courseCode = courseCode;
    }

    public String getCourseTitle() {
      return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
      this.courseTitle = courseTitle;
    }

    public int getUnits() {
      return units;
    }

    public void setUnits(int units) {
      this.units = units;
    }
    
    public int getLectureHours() {
      return lectureHours;
    }

    public void setLectureHours(int lectureHours) {
      this.lectureHours = lectureHours;
    }

    public int getLabHours() {
      return labHours;
    }

    public void setLabHours(int labHours) {
      this.labHours = labHours;
    }

    public int getDepartmentId() {
      return departmentId;
    }

    public void setDepartmentId(int departmentId) {
      this.departmentId = departmentId;
    }
    
    public int getIsDeleted() {
      return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
      this.isDeleted = isDeleted;
    }
}
