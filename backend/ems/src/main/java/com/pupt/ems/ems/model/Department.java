package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_department")
public class Department {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "dept_id")
  private Integer departmentId;

  @Column(name = "dept_code")
  private String departmentCode;

  @Column(name = "dept_name")
  private String departmentName;

  @Column(name = "is_deleted")
  private boolean isDeleted;

  public void setDepartmentId(Integer departmentId) {
    this.departmentId = departmentId;
  }

  public void setDepartmentCode(String departmentCode) {
    this.departmentCode = departmentCode;
  }

  public void setDepartmentName(String departmentName) {
    this.departmentName = departmentName;
  }

  public boolean isDeleted() { return isDeleted; }
  public void setIsDeleted(boolean isDeleted) { this.isDeleted = isDeleted; }

  public Integer getDepartmentId() {
    return departmentId;
  }

  public String getDepartmentCode() {
    return departmentCode;
  }

  public String getDepartmentName() {
    return departmentName;
  }
}
