package com.example.gym_backend.mn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "mn_payment_records")
public class PaymentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AppUser user;

    private String orderId;

    private String paymentId;

    private String signature;

    private Integer amount;

    private String currency;

    private String planCode;

    private String status;

    private LocalDateTime createdAt = LocalDateTime.now();
}
