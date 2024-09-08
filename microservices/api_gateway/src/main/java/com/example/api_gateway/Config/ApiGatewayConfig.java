package com.example.api_gateway.Config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user_service", r -> r.path("/api/user/**")
                        .uri("http://localhost:8087"))
                .route("content_service", r -> r.path("/api/content/**")
                        .uri("http://localhost:8089"))
                .route("course_service", r -> r.path("/api/courses/**")
                        .uri("http://localhost:8083"))
                .route("payment_service", r -> r.path("/api/payments/**")
                        .uri("http://localhost:8084"))
                .build();
    }

}
