package com.example.gym_backend.mn.controller;

import com.example.gym_backend.mn.dto.OrderRequest;
import com.example.gym_backend.mn.dto.OrderResponse;
import com.example.gym_backend.mn.dto.VerifyPaymentRequest;
import com.example.gym_backend.mn.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/order")
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) throws Exception {
        return ResponseEntity.ok(paymentService.createOrder(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verify(
            Authentication auth,
            @Valid @RequestBody VerifyPaymentRequest request
    ) throws Exception {
        return ResponseEntity.ok(paymentService.verifyPayment(auth.getName(), request));
    }
}
