package com.pupt.ems.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_term")
public class Term {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "term_id")
  private Integer termId;

  @Column(name = "term_code")
  private String termCode;

  @Column(name = "start_date")
  private String startDate;

  @Column(name = "end_date")
  private String endDate;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

  public Integer getTermId() {
    return termId;
  }

  public void setTermId(Integer termId) {
    this.termId = termId;
  }

  public String getTermCode() {
    return termCode;
  }

  public void setTermCode(String termCode) {
    this.termCode = termCode;
  }

  public String getStartDate() {
    return startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getEndDate() {
    return endDate;
  }

  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }

  public Boolean getIsDeleted() {
    return isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }
}
