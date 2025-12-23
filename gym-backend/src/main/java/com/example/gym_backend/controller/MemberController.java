package com.example.gym_backend.controller;

import com.example.gym_backend.model.Member;
import com.example.gym_backend.model.Plan;
import com.example.gym_backend.model.Trainer;
import com.example.gym_backend.repository.MemberRepository;
import com.example.gym_backend.repository.PlanRepository;
import com.example.gym_backend.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberRepository memberRepo;

    @Autowired
    private TrainerRepository trainerRepo;

    @Autowired
    private PlanRepository planRepo;

    // ✅ Get all members
    @GetMapping
    public ResponseEntity<List<Member>> getAll() {
        return ResponseEntity.ok(memberRepo.findAll());
    }

    // ✅ Get member by ID
    @GetMapping("/{id}")
    public ResponseEntity<Member> getById(@PathVariable Long id) {
        Member member = memberRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Member not found with ID: " + id));
        return ResponseEntity.ok(member);
    }

    // ✅ Add a new member
    @PostMapping
    public ResponseEntity<Member> addMember(@RequestBody Member member) {
        Trainer trainer = trainerRepo.findById(member.getTrainerId())
                .orElseThrow(() -> new RuntimeException("❌ Trainer not found"));
        Plan plan = planRepo.findById(member.getPlanId())
                .orElseThrow(() -> new RuntimeException("❌ Plan not found"));

        member.setTrainer(trainer);
        member.setPlan(plan);

        return ResponseEntity.ok(memberRepo.save(member));
    }

    // ✅ Update member details
    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member updatedMember) {
        Member existing = memberRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Member not found with ID: " + id));

        existing.setName(updatedMember.getName());
        existing.setAge(updatedMember.getAge());
        existing.setPhone(updatedMember.getPhone());

        if (updatedMember.getTrainerId() != null) {
            Trainer trainer = trainerRepo.findById(updatedMember.getTrainerId())
                    .orElseThrow(() -> new RuntimeException("❌ Trainer not found"));
            existing.setTrainer(trainer);
        }

        if (updatedMember.getPlanId() != null) {
            Plan plan = planRepo.findById(updatedMember.getPlanId())
                    .orElseThrow(() -> new RuntimeException("❌ Plan not found"));
            existing.setPlan(plan);
        }

        return ResponseEntity.ok(memberRepo.save(existing));
    }

    // ✅ Delete a member
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable Long id) {
        if (!memberRepo.existsById(id)) {
            throw new RuntimeException("❌ Cannot delete. Member ID not found: " + id);
        }
        memberRepo.deleteById(id);
        return ResponseEntity.ok("✅ Member deleted successfully with ID: " + id);
    }
}
