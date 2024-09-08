package com.educationPlatform.userservice.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse <T, U>{
    private T data;
    private U userData;
    private int statusCode;
    private String message;
}
