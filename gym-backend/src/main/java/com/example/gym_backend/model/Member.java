package com.example.gym_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private String phone;

    // ✅ These fields are only used to receive IDs from JSON
    @Transient
    private Long trainerId;

    @Transient
    private Long planId;

    // ✅ Actual relationships saved in database
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;
}
