package com.example.kensyu.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*;

import com.example.kensyu.model.User;
import com.example.kensyu.repository.UserRepository;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;


@CrossOrigin(origins = "http://localhost:3000",
             allowCredentials = "true")
@RestController
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userRepository.save(user);
        return "User registered successfully";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();    
    }

    @PostMapping("/login")
    public String login(@RequestBody User request, HttpSession session) {
        System.out.println("ログイン処理に入ったよ！"); 
        System.out.println("login session id: " + session.getId());//　セッションエラー確認用

        User user = userRepository.findByEmail(request.getEmail());

        System.out.println("===== login debug =====");
        System.out.println("request password: " + request.getPassword());
        System.out.println("db password: " + (user != null ? user.getPassword() : "user null"));

        if (user != null && user.getPassword().equals(request.getPassword())) {
            session.setAttribute("user", user);
            return "ログインが成功しました";
        } else {
            return "ログインが失敗しました";
        }
    }

    // ログインユーザーの情報を取得
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        System.out.println("me session id: " + session.getId());//　セッションエラー確認用
        System.out.println("user: " + session.getAttribute("user"));//　セッションエラー確認用
        Object user = session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(401).body("not logged in");
        }

        return ResponseEntity.ok(user);
    }
    // ログアウト処理
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "logout success";
    }

}