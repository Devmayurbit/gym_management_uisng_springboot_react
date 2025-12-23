package com.example.gym_backend.controller;

import com.example.gym_backend.model.Trainer;
import com.example.gym_backend.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    @Autowired
    private TrainerRepository trainerRepo;

    // ✅ Get all trainers
    @GetMapping
    public ResponseEntity<List<Trainer>> getAll() {
        return ResponseEntity.ok(trainerRepo.findAll());
    }

    // ✅ Get trainer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getById(@PathVariable Long id) {
        Trainer trainer = trainerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));
        return ResponseEntity.ok(trainer);
    }

    // ✅ Add trainer
    @PostMapping
    public ResponseEntity<Trainer> addTrainer(@RequestBody Trainer trainer) {
        return ResponseEntity.ok(trainerRepo.save(trainer));
    }

    // ✅ Update trainer
    @PutMapping("/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long id, @RequestBody Trainer updated) {
        Trainer trainer = trainerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + id));

        trainer.setName(updated.getName());
        trainer.setSpecialization(updated.getSpecialization());
        trainer.setPhone(updated.getPhone());

        return ResponseEntity.ok(trainerRepo.save(trainer));
    }

    // ✅ Delete trainer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable Long id) {
        if (!trainerRepo.existsById(id)) {
            throw new RuntimeException("Trainer not found with ID: " + id);
        }
        trainerRepo.deleteById(id);
        return ResponseEntity.ok("Trainer deleted with ID: " + id);
    }
}
