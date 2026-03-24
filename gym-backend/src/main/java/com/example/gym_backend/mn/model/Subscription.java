package com.example.gym_backend.mn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "mn_subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AppUser user;

    private String planCode;

    private Integer amount;

    private String currency;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String status;

    private LocalDateTime startedAt;

    private LocalDateTime expiresAt;
}
