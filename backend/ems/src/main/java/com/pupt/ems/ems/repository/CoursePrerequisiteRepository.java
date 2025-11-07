package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.CoursePrerequisite;
import com.pupt.ems.ems.model.CoursePrerequisiteId;
import jakarta.transaction.Transactional;

public interface CoursePrerequisiteRepository extends JpaRepository<CoursePrerequisite, CoursePrerequisiteId> {

  @Query("SELECT c FROM CoursePrerequisite c WHERE c.isDeleted = 0")
  List<CoursePrerequisite> getCoursePrerequisites();

  List<CoursePrerequisite> findByIdCourseId(Integer courseId);

  @Modifying
  @Transactional
  @Query("UPDATE CoursePrerequisite c SET c.isDeleted = 1 WHERE c.id.courseId = ?1 AND c.id.prereqCourseId = ?2")
  int softDeleteById(Integer courseId, Integer prereqCourseId); // returns number of rows updated
}
