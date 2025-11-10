package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Department;

import jakarta.transaction.Transactional;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

  @Query("SELECT d FROM Department d WHERE d.isDeleted = false")
  List<Department> getAllExistingDepartments();

  @Query(value = "SELECT * FROM tbl_department WHERE dept_name LIKE CONCAT('%', :department_name, '%') AND is_deleted = 0", nativeQuery = true)
  List<Department> findByDepartmentNameContainingAndNotDeleted(String department_name);

  @Modifying
  @Transactional
  @Query("UPDATE Department d SET d.isDeleted = true WHERE d.departmentId = ?1")
  int softDeleteById(Integer id);
}
