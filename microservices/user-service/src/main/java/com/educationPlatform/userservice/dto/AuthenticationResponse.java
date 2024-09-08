package com.educationPlatform.userservice.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String token;
    private String userId;

//    private String firstName;
//    private String lastName;
//    private String email;
//    private String password;
//    private String mobileNo;
//    private UserRole role;

    public AuthenticationResponse(String token, String userId) {

        this.token = token;
        this.userId =userId;
}
}