package com.educationPlatform.contentservice.service;


import com.educationPlatform.contentservice.models.CourseContent;
import com.educationPlatform.contentservice.repository.CourseContentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseContentService {

    @Autowired
    private CourseContentRepository courseContentRepository;

    public List<CourseContent> createCourseContent(List<CourseContent> contents){
        List<CourseContent> contentList = new ArrayList<>(contents);
        courseContentRepository.saveAll(contentList);
        return contentList;
    }

    public List<CourseContent> getContentByCourseId(String courseId) {
        return courseContentRepository.findAllByCourseId(courseId);
    }

    public List<CourseContent> updateCourseContents(String courseId, List<CourseContent> updatedContents) {
        List<CourseContent> existingContents = courseContentRepository.findAllByCourseId(courseId);
        if (existingContents.isEmpty()) {
            return null; // Course not found
        }

        for (CourseContent updatedContent : updatedContents) {
            for (CourseContent existingContent : existingContents) {
                if (existingContent.getSectionId().equals(updatedContent.getSectionId())) {
                    existingContent.setTitle(updatedContent.getTitle());
                    existingContent.setNoOfSections(updatedContent.getNoOfSections());
                    existingContent.setTextContent(updatedContent.getTextContent());
                    existingContent.setImages(updatedContent.getImages());
                    existingContent.setVideoUrls(updatedContent.getVideoUrls());
                    courseContentRepository.save(existingContent);
                    break;
                }
            }
        }
        return existingContents;
    }

    public boolean deleteCourseContents(String courseId) {
        List<CourseContent> courseContents = courseContentRepository.findAllByCourseId(courseId);
        if (courseContents.isEmpty()) {
            return false; // Course not found
        }

        courseContentRepository.deleteByCourseId(courseId);
        return true;
    }

    public double getNoOfSectionsByCourseId(String courseId) {
        List<CourseContent> courseContents = courseContentRepository.findAllByCourseId(courseId);

        if (!courseContents.isEmpty()) {
            return courseContents.get(0).getNoOfSections();
        } else {
            return 0.0;
        }
    }

}
