package com.pupt.ems.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pupt.ems.ems.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

}
