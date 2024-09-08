package com.example.course_service.Dtos;

import com.example.course_service.Category;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
    @Id
    private String courseId;
    private String courseName;
    private Category category;
    private String courseDuration;
    private String description;
    private String contentId;
    private String certificateId;
    private double price;
    private String instructor;

}
