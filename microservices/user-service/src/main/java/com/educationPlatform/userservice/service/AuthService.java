package com.educationPlatform.userservice.service;

import com.educationPlatform.userservice.dto.AuthenticationResponse;
import com.educationPlatform.userservice.enums.UserRole;
import com.educationPlatform.userservice.model.User;
import com.educationPlatform.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request){
        User user = new User();
        user.setUser_name(request.getUser_name());
        user.setFirst_name(request.getFirst_name());
        user.setLast_name(request.getLast_name());
        user.setEmail(request.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));
        user.setContact_no(request.getContact_no());
        user.setBase64ProfileImg(request.getBase64ProfileImg());
//        user.setUserRole(request.getUserRole());
        user.setUserRole(UserRole.ADMIN);

        user = userRepository.save(user);

        String token = jwtService.generateToken(user);
        String userId = user.get_id();

        return new AuthenticationResponse(token, userId);

//        UserDTO userDTO = new UserDTO();
//        userDTO.setFirstName(createdUser.getFirstName());
//        userDTO.setLastName(createdUser.getLastName());
//        userDTO.setEmail(createdUser.getEmail());
//        userDTO.setPassword(createdUser.getPassword());
//        userDTO.setMobileNo(createdUser.getMobileNo());
//        userDTO.setRole(createdUser.getRole());
//
//        return userDTO;
    }

    public AuthenticationResponse authenticate(User request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findUserByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);
        String userId = user.get_id();

        return new AuthenticationResponse(token, userId);
    }
}