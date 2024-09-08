package com.educationPlatform.userservice.security;

import com.educationPlatform.userservice.filter.JwtAuthenticationFilter;
import com.educationPlatform.userservice.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private final UserDetailService userDetailService;
    @Autowired
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(UserDetailService userDetailService, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailService = userDetailService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/api/user/login/**","/api/user/register/**")
                                .permitAll()
//                                .requestMatchers(HttpMethod.GET,"api/hotel/","api/contract/","api/roomType/", "api/supplements/", "api/user/*").permitAll()
//                                .requestMatchers(HttpMethod.POST,"api/hotel/*").hasAnyAuthority("ADMIN")
//                                .requestMatchers(HttpMethod.GET,"api/contract/", "api/booking/","api/roomType", "api/hotel").permitAll()//hasAnyAuthority("USER")
//                                .requestMatchers(HttpMethod.POST,"api/booking/*").hasAnyAuthority("USER")
//                                .requestMatchers(HttpMethod.PUT,"api/booking/*").hasAnyAuthority("USER")
                                .anyRequest()
                                .authenticated()
                )
                .userDetailsService(userDetailService)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
}


}
