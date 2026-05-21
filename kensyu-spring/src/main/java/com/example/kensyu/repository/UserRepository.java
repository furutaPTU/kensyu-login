package com.example.kensyu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.kensyu.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}
