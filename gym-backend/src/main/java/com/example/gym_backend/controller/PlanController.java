package com.example.gym_backend.controller;

import com.example.gym_backend.dto.PlanRequest;
import com.example.gym_backend.model.Plan;
import com.example.gym_backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private PlanRepository planRepo;

    // ✅ Update plan
    @PutMapping("/{id}")
    public ResponseEntity<Plan> updatePlan(
            @PathVariable Long id,
            @RequestBody PlanRequest updated) {

        Plan plan = planRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        plan.setName(updated.getName());
        plan.setPrice(updated.getPrice());

        return ResponseEntity.ok(planRepo.save(plan));
    }

    // ✅ Delete plan
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlan(@PathVariable Long id) {
        if (!planRepo.existsById(id)) {
            throw new RuntimeException("Plan not found with ID: " + id);
        }
        planRepo.deleteById(id);
        return ResponseEntity.ok("Plan deleted with ID: " + id);
    }
}
