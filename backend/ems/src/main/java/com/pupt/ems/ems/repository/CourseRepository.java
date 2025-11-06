package com.pupt.ems.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pupt.ems.ems.model.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {

}
