package com.restaurant.controller;

import com.restaurant.dto.response.ApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

    @Value("${app.name:Restaurant Management System API}")
    private String appName;

    @Value("${app.version:1.0.0-MVP}")
    private String appVersion;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> statusData = new LinkedHashMap<>();
        statusData.put("status", "UP");
        statusData.put("appName", appName);
        statusData.put("version", appVersion);
        statusData.put("serverTime", OffsetDateTime.now());

        return ResponseEntity.ok(ApiResponse.ok("Hệ thống Backend đang hoạt động bình thường", statusData));
    }
}
