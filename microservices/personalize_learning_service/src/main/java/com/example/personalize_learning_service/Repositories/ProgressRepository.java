package com.example.personalize_learning_service.Repositories;

import com.example.personalize_learning_service.Models.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProgressRepository extends MongoRepository<Progress, Long> {
//    double getProgressPercentageByStudentIdAndCourseId(String studentId, String courseId);

    Progress getProgressByStudentIdAndCourseId(String studentId, String courseId);

    Optional<Progress> findByStudentIdAndCourseId(String studentId, String courseId);

    Optional<Progress> findProgressPercentageByStudentIdAndCourseId(String studentId, String courseId);
}
