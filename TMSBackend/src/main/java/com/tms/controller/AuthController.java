package com.tms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;
import com.tms.entity.User;
import com.tms.dto.LoginRequest;
import com.tms.dto.RegisterRequest;
import com.tms.service.AuthService;
import com.tms.util.CaptchaUtil;

import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register User
    @PostMapping(value="/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String registerUser(@ModelAttribute RegisterRequest request) {
        return authService.registerUser(request);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (user != null) {

            Map<String, Object> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("photo", user.getPhoto());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid Credentials");
    }

    // Generate Captcha
    @GetMapping("/captcha")
    public String getCaptcha() {
        return CaptchaUtil.generateCaptcha(6);
    }
}