package com.example.personalize_learning_service.Controllers;

import com.example.personalize_learning_service.Dtos.ProgressDto;
import com.example.personalize_learning_service.Models.Progress;
import com.example.personalize_learning_service.Services.ProgressService;
import com.example.personalize_learning_service.Utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @PostMapping
    public ApiResponse<Progress> setProgress(@RequestBody ProgressDto progressDto){
        Progress progress = progressService.setProgress(progressDto);
        return new ApiResponse<>(progress, 201, "Progress set successfully");
    }

    @GetMapping
    public ApiResponse<Double> getProgressByStudentAndCourse(@RequestBody ProgressDto progressDto){
        double response = progressService.getProgressByStudentAndCourse(progressDto);
        return new ApiResponse<>(response, 200, "Progress retrieved successfully");
    }

    @PutMapping
    public ApiResponse<Progress> updateProgress(@RequestBody ProgressDto progressDto){
        Progress progress = progressService.updateProgress(progressDto);
        return new ApiResponse<>(progress, 201, "Progress updated successfully");
    }

}
