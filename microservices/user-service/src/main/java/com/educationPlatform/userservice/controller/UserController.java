package com.educationPlatform.userservice.controller;

import com.educationPlatform.userservice.dto.AuthenticationResponse;
import com.educationPlatform.userservice.dto.UserDTO;
import com.educationPlatform.userservice.model.User;
import com.educationPlatform.userservice.repository.UserRepository;
import com.educationPlatform.userservice.service.AuthService;
import com.educationPlatform.userservice.service.UserService;
import com.educationPlatform.userservice.util.ApiResponse;
import com.educationPlatform.userservice.util.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService service;
    
    @Autowired
    private UserRepository userRepository;

    public UserController(UserService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Object> addUser(@RequestBody UserDTO dto){

        ResponseEntity response = null;

        try{
            response = service.addUser(dto);
            System.out.println(response);
            return new ResponseEntity<>(response, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        try {
            return new ResponseEntity<List<User>>(service.getAllUsers(), HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUser(@PathVariable("id") String userId){
        try{
            User user = service.getUser(userId);
            return ResponseEntity.ok(user);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Autowired
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthenticationResponse> register(@RequestBody User request){
//        UserDTO createdUser = authService.createUser(signupRequest);
//        if(createdUser == null)
       AuthenticationResponse response = authService.register(request);
//            return new ResponseEntity<>("User is not created. Try again later!!", HttpStatus.BAD_REQUEST);
        return new ApiResponse<>(response, 201, "Course retrieved successfully");
    }

    @PostMapping("/login")
    public LoginResponse<AuthenticationResponse, User> login(
            @RequestBody User request
            
    ){
        User user = null;
        AuthenticationResponse response = authService.authenticate(request);
        if (response != null){
            Optional<User> ex = userRepository.findUserByEmail(request.getEmail());
            user = ex.get();
        }
//        ResponseEntity.ok(authService.authenticate(request));
        return new LoginResponse<>(response,user, 201,"user login success");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") String userId, @RequestBody User userDTO){
        ApiResponse res = service.updateUser(userId, userDTO);

        if (userDTO != null){
            return ResponseEntity.ok(res);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Object> deleteUser(@PathVariable("id") String userId){
//        try{
//            User deletedUser = service.deleteUser(userId);
//            return ResponseEntity.ok(deletedUser);
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//    }


}
