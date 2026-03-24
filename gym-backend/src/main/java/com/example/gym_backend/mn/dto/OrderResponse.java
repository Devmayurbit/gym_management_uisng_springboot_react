package com.example.gym_backend.mn.dto;

public record OrderResponse(
        String keyId,
        String orderId,
        Integer amount,
        String currency,
        String planCode
) {
}
