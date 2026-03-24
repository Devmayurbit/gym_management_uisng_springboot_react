package com.example.gym_backend.mn.controller;

import com.example.gym_backend.mn.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/plans")
    public ResponseEntity<List<Map<String, Object>>> plans() {
        return ResponseEntity.ok(subscriptionService.getPlans());
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status(Authentication auth) {
        return ResponseEntity.ok(subscriptionService.getStatus(auth.getName()));
    }
}
