package com.example.personalize_learning_service.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressDto {
    private String studentId;
    private String courseId;
    private double noOfSectionsCovered;
}
