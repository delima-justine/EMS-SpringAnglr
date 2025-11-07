package com.pupt.ems.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.pupt.ems.ems.model.CoursePrerequisite;
import com.pupt.ems.ems.model.CoursePrerequisiteId;

public interface CoursePrerequisiteRepository extends JpaRepository<CoursePrerequisite, CoursePrerequisiteId> {

  @Query("SELECT c FROM CoursePrerequisite c WHERE c.isDeleted = 0")
  List<CoursePrerequisite> getCoursePrerequisites();
}
