package com.educationPlatform.userservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @JsonProperty("user_name")
    private String user_name;
    private String first_name, last_name, contact_no, email, password, base64ProfileImg;
    private String[] courses;
}