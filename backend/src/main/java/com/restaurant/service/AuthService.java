package com.restaurant.service;

import com.restaurant.dto.request.LoginRequest;
import com.restaurant.dto.response.LoginResponse;
import com.restaurant.dto.response.UserResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    UserResponse getCurrentUser(String username);
}
