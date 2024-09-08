package com.educationPlatform.contentservice.controllers;


import com.educationPlatform.contentservice.models.CourseContent;
import com.educationPlatform.contentservice.service.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/contents")
public class CourseContentController {

    @Autowired
    CourseContentService service;

    @PostMapping
    public List<CourseContent> addContent(@RequestBody List<CourseContent> contents){
        return service.createCourseContent(contents);
    }

    @GetMapping("/{courseId}")
    public List<CourseContent> getContentByCourseId(@PathVariable String courseId){
        List<CourseContent> contents = service.getContentByCourseId(courseId);
        return contents;
    }

    @GetMapping("/noOfSections/{courseId}")
    public double getNoOfSectionsByCourseId(@PathVariable String courseId){
        return service.getNoOfSectionsByCourseId(courseId);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<?> updateCourseContent(@PathVariable String courseId, @RequestBody List<CourseContent> updatedContents) {
        List<CourseContent> updatedContentsResponse = service.updateCourseContents(courseId, updatedContents);
        if (updatedContentsResponse != null) {
            return ResponseEntity.ok(updatedContentsResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> deleteCourseContent(@PathVariable String courseId) {
        boolean deleted = service.deleteCourseContents(courseId);
        if (deleted) {
            return ResponseEntity.ok("Course content deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
