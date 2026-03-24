package com.example.gym_backend.mn.service;

import com.example.gym_backend.mn.model.AppUser;
import com.example.gym_backend.mn.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final AppUserRepository userRepository;

    public DashboardService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> getDashboard(String email) {
        AppUser user = userRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return Map.of(
                "name", user.getName(),
                "xp", user.getXp(),
                "level", Math.max(1, user.getXp() / 100 + 1),
                "streakDays", user.getStreakDays(),
                "disciplineScore", user.getDisciplineScore(),
                "subscription", user.getSubscriptionStatus(),
                "analytics", List.of(45, 56, 62, 70, 78, 83, user.getDisciplineScore())
        );
    }
}
