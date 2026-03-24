package com.example.gym_backend.mn.controller;

import com.example.gym_backend.mn.service.AkhadaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/akhada")
public class AkhadaController {

    private final AkhadaService akhadaService;

    public AkhadaController(AkhadaService akhadaService) {
        this.akhadaService = akhadaService;
    }

    @GetMapping("/content")
    public ResponseEntity<Map<String, Object>> getContent() {
        return ResponseEntity.ok(akhadaService.getContent());
    }
}
