package com.restaurant.dto.response;

import com.restaurant.entity.UserEntity;
import com.restaurant.enums.RoleEnum;

public class UserResponse {

    private Long id;
    private String username;
    private String fullName;
    private String phone;
    private RoleEnum role;
    private String status;

    public UserResponse() {}

    public UserResponse(Long id, String username, String fullName, String phone, RoleEnum role, String status) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
        this.status = status;
    }

    public static UserResponse fromEntity(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPhone(),
                user.getRole(),
                user.getStatus()
        );
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhone() {
        return phone;
    }

    public RoleEnum getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }
}
