package com.educationPlatform.contentservice.repository;

import com.educationPlatform.contentservice.models.CourseContent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CourseContentRepository extends MongoRepository<CourseContent, String> {

    Optional<CourseContent> findCourseContentBy_id(String courseId);

    Optional<CourseContent> findCourseContentByCourseId(String courseId);

    List<CourseContent> findByCourseIdAndSectionId(String courseId, String sectionId);

    List<CourseContent> findAllByCourseId(String courseId);

    void deleteByCourseId(String courseId);

    double findNoOfSectionsByCourseId(String courseId);

}
