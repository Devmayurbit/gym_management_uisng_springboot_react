package com.example.gym_backend.mn.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderRequest(
        @NotNull Integer amount,
        @NotBlank String currency,
        @NotBlank String planCode
) {
}
