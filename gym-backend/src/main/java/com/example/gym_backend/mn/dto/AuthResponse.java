package com.example.gym_backend.mn.dto;

import com.example.gym_backend.mn.model.SubscriptionStatus;

public record AuthResponse(
        String token,
        UserSummary user
) {
    public record UserSummary(Long id, String name, String email, String role, SubscriptionStatus subscription) {
    }
}
