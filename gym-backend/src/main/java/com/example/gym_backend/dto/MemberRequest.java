package com.example.gym_backend.dto;

import lombok.Data;

@Data
public class MemberRequest {
    private String name;
    private int age;
    private String phone;
    private Long trainerId;
    private Long planId;
}
