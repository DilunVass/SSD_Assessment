//package com.hendisantika.onlinebanking.service;
//
//
//
//import com.hendisantika.onlinebanking.dto.AuthenticationResponse;
//import com.hendisantika.onlinebanking.entity.User;
//import com.hendisantika.onlinebanking.repository.UserDao;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthService {
//
//
//    @Autowired
//    private final UserDao userRepository;
//
//    @Autowired
//    private final PasswordEncoder passwordEncoder;
//    @Autowired
//    private final JwtService jwtService;
//    @Autowired
//    private final AuthenticationManager authenticationManager;
//
//    public AuthService(UserDao userRepository1, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
//        this.userRepository = userRepository1;
//
//        this.passwordEncoder = passwordEncoder;
//        this.jwtService = jwtService;
//        this.authenticationManager = authenticationManager;
//    }
//
//    public AuthenticationResponse authenticate(User request){
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//
//        User user = userRepository.findByEmail(request.getEmail());
//        String token = jwtService.generateToken(user);
//        Long userId = user.getUserId();
//
//        return new AuthenticationResponse(token, userId);
//    }
//
//
//}

package com.hendisantika.onlinebanking.service;

import com.hendisantika.onlinebanking.dto.AuthenticationResponse;
import com.hendisantika.onlinebanking.dto.AuthenticationRequest;
import com.hendisantika.onlinebanking.entity.User;
import com.hendisantika.onlinebanking.repository.UserDao;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserDao userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserDao userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail());
        String token = jwtService.generateToken(user);
        Long userId = user.getUserId();

        System.out.println(token);

        return new AuthenticationResponse(token, userId);
    }
}

