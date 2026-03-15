package com.tms.service;

import com.tms.dto.RegisterRequest;
import com.tms.entity.User;

public interface AuthService {

    String registerUser(RegisterRequest request);

    User login(String email, String password);
}