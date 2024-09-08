package com.educationPlatform.userservice.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    // Getters and setters
    private T data;
    private int statusCode;
    private String message;

//    public ApiResponse(T data, int statusCode, String message) {
//        this.data = data;
//        this.statusCode = statusCode;
//        this.message = message;
//    }
//
//    public void setData(T data) {
//        this.data = data;
//    }
//
//    public void setStatusCode(int statusCode) {
//        this.statusCode = statusCode;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
}