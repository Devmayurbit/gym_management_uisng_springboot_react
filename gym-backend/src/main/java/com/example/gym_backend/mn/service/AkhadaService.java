package com.example.gym_backend.mn.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AkhadaService {

    public Map<String, Object> getContent() {
        return Map.of(
                "mantra", "Buddhir Balam Yasho Dhairyam Hanumat Smaranad Bhavet",
                "workouts", List.of(
                        Map.of("name", "Dand-Baithak Circuit", "reps", "5 rounds"),
                        Map.of("name", "Gada Swing", "reps", "4 x 20"),
                        Map.of("name", "Farmer Sandbag Walk", "reps", "6 x 40m")
                ),
                "dietPlans", List.of(
                        "Sattu + milk + dates",
                        "Paneer bhurji + millet roti",
                        "Moong khichdi + ghee + curd"
                ),
                "challenges", List.of(
                        "108 Surya Namaskar challenge",
                        "Daily Brahma Muhurat wake-up streak",
                        "No-sugar 21 day discipline challenge"
                )
        );
    }
}
