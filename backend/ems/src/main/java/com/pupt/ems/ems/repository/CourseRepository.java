package com.pupt.ems.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import com.pupt.ems.ems.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

  @Query("SELECT c FROM Course c WHERE c.isDeleted = 0 ORDER BY c.courseId DESC")
  List<Course> getAllExistingCourses();

  @Query("SELECT c FROM Course c WHERE c.isDeleted = 0 ORDER BY c.courseId ASC")
  List<Course> getAllExistingCoursesAsc();

  @Query(value = "SELECT * FROM tbl_course WHERE course_title LIKE  CONCAT('%', :course_title, '%') AND is_deleted = 0", nativeQuery = true)
  List<Course> findByCourseTitleContainingAndNotDeleted(@Param("course_title") String course_title);

  @Modifying
  @Transactional
  @Query("UPDATE Course c SET c.isDeleted = 1 WHERE c.courseId = ?1")
  int softDeleteById(Integer courseId); // returns number of rows updated
}
