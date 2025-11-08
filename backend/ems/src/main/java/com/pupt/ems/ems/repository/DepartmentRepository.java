package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

  @Query("SELECT d FROM Department d WHERE d.isDeleted = false")
  List<Department> getAllExistingDepartments();
}
