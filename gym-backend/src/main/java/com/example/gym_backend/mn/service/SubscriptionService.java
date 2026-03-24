package com.example.gym_backend.mn.service;

import com.example.gym_backend.mn.model.AppUser;
import com.example.gym_backend.mn.model.Subscription;
import com.example.gym_backend.mn.model.SubscriptionStatus;
import com.example.gym_backend.mn.repository.AppUserRepository;
import com.example.gym_backend.mn.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final AppUserRepository userRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, AppUserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    public List<Map<String, Object>> getPlans() {
        return List.of(
                Map.of("code", "BASIC", "title", "Basic Sadhak", "amount", 999, "features", List.of("Akhada workouts", "Daily mantra", "Discipline tracker")),
                Map.of("code", "PREMIUM", "title", "Premium Veer", "amount", 2499, "features", List.of("Everything in Basic", "Diet plans", "Priority support"))
        );
    }

    public Map<String, Object> getStatus(String email) {
        AppUser user = userRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription latest = subscriptionRepository.findTopByUserIdOrderByIdDesc(user.getId()).orElse(null);

        return Map.of(
                "subscription", user.getSubscriptionStatus(),
                "active", user.getSubscriptionStatus() != SubscriptionStatus.NONE,
                "planCode", latest != null ? latest.getPlanCode() : "NONE",
                "validTill", latest != null && latest.getExpiresAt() != null ? latest.getExpiresAt().toString() : "N/A"
        );
    }

    public void activateSubscription(AppUser user, String planCode, String orderId, String paymentId, Integer amount, String currency) {
        Subscription sub = new Subscription();
        sub.setUser(user);
        sub.setPlanCode(planCode);
        sub.setAmount(amount);
        sub.setCurrency(currency);
        sub.setRazorpayOrderId(orderId);
        sub.setRazorpayPaymentId(paymentId);
        sub.setStatus("ACTIVE");
        sub.setStartedAt(LocalDateTime.now());
        sub.setExpiresAt(planCode.equalsIgnoreCase("PREMIUM") ? LocalDateTime.now().plusMonths(3) : LocalDateTime.now().plusMonths(1));
        subscriptionRepository.save(sub);

        user.setSubscriptionStatus(planCode.equalsIgnoreCase("PREMIUM") ? SubscriptionStatus.PREMIUM : SubscriptionStatus.BASIC);
        user.setXp(user.getXp() + (planCode.equalsIgnoreCase("PREMIUM") ? 350 : 120));
        userRepository.save(user);
    }
}
