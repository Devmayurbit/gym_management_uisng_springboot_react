package com.example.gym_backend.mn.repository;

import com.example.gym_backend.mn.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findTopByUserIdOrderByIdDesc(Long userId);
    Optional<Subscription> findByRazorpayOrderId(String razorpayOrderId);
}
