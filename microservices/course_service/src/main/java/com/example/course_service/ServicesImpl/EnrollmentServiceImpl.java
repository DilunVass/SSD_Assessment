package com.example.course_service.ServicesImpl;

import com.example.course_service.Dtos.EnrollmentRequest;
import com.example.course_service.Models.Course;
import com.example.course_service.Models.Enrollment;
import com.example.course_service.Repositories.CourseRepository;
import com.example.course_service.Repositories.EnrollmentRepository;
import com.example.course_service.Services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

//    public Course enrollStudent(EnrollmentRequest enrollmentRequest) {
//
//        Enrollment enrollment = new Enrollment();
//        enrollment.setStudentId(enrollmentRequest.getStudentId());
//
//        List<String> courseIdList = enrollmentRequest.getCourseIdList();
//        List<Course> courseList = courseRepository.findAllById(courseIdList);
////        courseRepository.findAllById(courseIdList);
////
////        for(String courseId: courseIdList){
////            Course
////            courseRepository.findAllById(courseIdList);
////
////        }
//        enrollment.setCourseList(courseList);
////        enrollment.setCourseId(enrollmentRequest.getCourseId());
////        enrollment.setEnrollmentType(enrollmentRequest.getEnrollmentType());
//        enrollment.setEnrollmentDate(LocalDate.now());
//        enrollmentRepository.save(enrollment);
//
//        // Fetch the enrolled course and return
//        return courseRepository.findById(enrollmentRequest.getCourseId()).orElseThrow(() -> new IllegalArgumentException("Course not found"));
//    }

    public Course enrollStudent(EnrollmentRequest enrollmentRequest) {
        String studentId = enrollmentRequest.getStudentId();
        String courseId = enrollmentRequest.getCourseId();

        // Find existing enrollment document for the student
        Enrollment enrollment = enrollmentRepository.findByStudentId(studentId)
                .orElse(new Enrollment()); // Create new enrollment if not found

        // Update the course list
        List<Course> courseList = enrollment.getCourseList();
        if (courseList == null) {
            courseList = new ArrayList<>();
        }
        // Check if the course is already enrolled
        if (courseList.stream().noneMatch(course -> course.getCourseId().equals(courseId))) {
            Course newCourse = courseRepository.findById(courseId)
                    .orElseThrow(() -> new IllegalArgumentException("Course not found"));
            courseList.add(newCourse);
        }

        // Update the enrollment document
        enrollment.setStudentId(studentId);
        enrollment.setCourseList(courseList);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollmentRepository.save(enrollment);

        // Return the enrolled course
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));
    }


    public String unEnrollStudent(String studentId, String courseId) {
        Query query = new Query(Criteria.where("studentId").is(studentId).and("courseId").is(courseId));
        mongoTemplate.remove(query, "enrollments");

        return "Unenrollement successful";
    }
}
