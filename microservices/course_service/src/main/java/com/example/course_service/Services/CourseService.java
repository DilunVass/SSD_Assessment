package com.example.course_service.Services;

import com.example.course_service.Category;
import com.example.course_service.Dtos.CourseDto;
import com.example.course_service.Models.Course;
import java.util.List;

public interface CourseService {

    List<Course> getAllCourses();

    Course createCourse(CourseDto courseDto);

    Course updateCourse(String courseId, Course courseDetails);

    void deleteCourse(String courseId);

    Course getCourseById(String courseId);

    List<Course> getCoursesByCategory(Category category);
}

