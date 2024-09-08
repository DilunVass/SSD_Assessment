package com.example.course_service.Controllers;

import com.example.course_service.Category;
import com.example.course_service.Dtos.CourseDto;
import com.example.course_service.Models.Course;
import com.example.course_service.Services.CourseService;
import com.example.course_service.ServicesImpl.CourseServiceImpl;
import com.example.course_service.Utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

//    public CourseController(CourseServiceImpl courseServiceImpl){
//        this.courseService = courseService;
//    }

    // Endpoint to display a wide range of courses
    @GetMapping
    public ApiResponse<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return new ApiResponse<>(courses, "success", "Courses retrieved successfully");
    }

    @GetMapping("/{courseId}")
    public ApiResponse<Course> getCourseById(@PathVariable String courseId) {
        Course course = courseService.getCourseById(courseId);
        return new ApiResponse<>(course, "success", "Course retrieved successfully");
    }

    @GetMapping("/category/{category}")
    public ApiResponse<List<Course>> getCoursesByCategory(@PathVariable Category category) {
        List<Course> courses = courseService.getCoursesByCategory(category);
        return new ApiResponse<>(courses, "success", "Course retrieved successfully");
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return Arrays.asList(Category.values());
    }

    // Endpoint to create a new course
    @PostMapping
    public ApiResponse<Course> createCourse(@RequestBody CourseDto courseDto) {
        Course course = courseService.createCourse(courseDto);
        if(course != null){
            return new ApiResponse<>(course, "success", "Course Added successfully");
        }else{
            return new ApiResponse<>(null, "error", "Invalid course data");
        }
    }

    // Endpoint to update an existing course
    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable String courseId, @RequestBody Course courseDetails) {
        return courseService.updateCourse(courseId, courseDetails);
    }

    // Endpoint to delete a course
    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable String courseId) {
        courseService.deleteCourse(courseId);
    }



    // Endpoint to track student progress
//    @GetMapping("/progress/{studentId}")
//    public StudentProgress getStudentProgress(@PathVariable String studentId) {
//        return courseService.getStudentProgress(studentId);
//    }
}