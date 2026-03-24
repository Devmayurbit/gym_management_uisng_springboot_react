package com.example.gym_backend.mn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "mn_users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_USER;

    private Integer xp = 0;

    private Integer streakDays = 0;

    private Integer disciplineScore = 50;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus subscriptionStatus = SubscriptionStatus.NONE;

    private String otpCode;

    private LocalDateTime otpExpiry;

    private boolean otpVerified = false;
}
