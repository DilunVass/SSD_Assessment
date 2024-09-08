package com.example.course_service.Controllers;

import com.example.course_service.Dtos.EnrollmentRequest;
import com.example.course_service.Models.Course;
import com.example.course_service.Services.EnrollmentService;
import com.example.course_service.ServicesImpl.EnrollmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Endpoint to enroll a student in a course
    @PostMapping("/enroll")
    public Course enrollStudent(@RequestBody EnrollmentRequest enrollmentRequest) {
        return enrollmentService.enrollStudent(enrollmentRequest);
    }

    @DeleteMapping
    public String unEnrollStudent(@PathVariable String studentId,
                                @PathVariable String courseId) {
        return enrollmentService.unEnrollStudent(studentId, courseId);
    }
}
