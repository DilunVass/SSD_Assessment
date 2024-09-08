package com.example.course_service.Services;

import com.example.course_service.Dtos.EnrollmentRequest;
import com.example.course_service.Models.Course;

public interface EnrollmentService {

    Course enrollStudent(EnrollmentRequest enrollmentRequest);

    String unEnrollStudent(String studentId, String courseId);
}
