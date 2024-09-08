package com.educationPlatform.userservice.repository;

import com.educationPlatform.userservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserBy_id(String userId);

//    Optional<User> findUserByUser_name(String username);

}
