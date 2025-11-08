package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_program")
public class Program {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "program_id")
  private Integer programId;

  @Column(name = "program_code")
  private String programCode;

  @Column(name = "program_name")
  private String programName;

  @Column(name = "dept_id")
  private Integer departmentId;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

  public Integer getProgramId() {
    return programId;
  }

  public void setProgramId(Integer programId) {
    this.programId = programId;
  }

  public String getProgramCode() {
    return programCode;
  }

  public void setProgramCode(String programCode) {
    this.programCode = programCode;
  }

  public String getProgramName() {
    return programName;
  }

  public void setProgramName(String programName) {
    this.programName = programName;
  }

  public Integer getDepartmentId() {
    return departmentId;
  }

  public void setDepartmentId(Integer departmentId) {
    this.departmentId = departmentId;
  }

  public Boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
