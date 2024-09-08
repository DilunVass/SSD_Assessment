package com.example.personalize_learning_service.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "progress")
public class Progress {
    @Id
    private ObjectId progressId;
    private String studentId;
    private String courseId;
    private double noOfSections;
    private double noOfSectionsCovered;
    private boolean isCompleted = false;
    private double progressPercentage;

}
