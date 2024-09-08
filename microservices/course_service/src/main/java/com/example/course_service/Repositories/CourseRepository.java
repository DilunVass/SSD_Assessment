package com.example.course_service.Repositories;

import com.example.course_service.Category;
import com.example.course_service.Models.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends MongoRepository<Course, String> {
    Course getCourseByCourseId(String courseId);

    List<Course> getAllCoursesByCategory(Category category);

    Optional<Course> findByCourseName(String courseName);
}
