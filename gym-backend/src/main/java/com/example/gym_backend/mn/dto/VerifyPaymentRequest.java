package com.example.gym_backend.mn.dto;

import jakarta.validation.constraints.NotBlank;

public record VerifyPaymentRequest(
        @NotBlank String razorpayOrderId,
        @NotBlank String razorpayPaymentId,
        @NotBlank String razorpaySignature,
        @NotBlank String planCode
) {
}
