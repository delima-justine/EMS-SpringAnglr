package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.Student;

import jakarta.transaction.Transactional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
  // Custom query methods can be defined here

  @Query("SELECT s FROM Student s WHERE s.isDeleted = false")
  List<Student> findAllActiveStudents();

  @Query(value = "SELECT * FROM tbl_student WHERE CONCAT(first_name, ' ', middle_name, ' ', last_name) LIKE CONCAT('%', ?1, '%') AND is_deleted = false", nativeQuery = true)
  List<Student> searchStudentsByName(String keyword);

  // Soft Delete Method
  @Modifying
  @Transactional
  @Query("UPDATE Student s SET s.isDeleted = true WHERE s.studentId = ?1")
  void softDeleteStudent(Integer studentId);
}
