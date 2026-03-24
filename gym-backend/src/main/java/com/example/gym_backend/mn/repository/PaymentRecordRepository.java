package com.example.gym_backend.mn.repository;

import com.example.gym_backend.mn.model.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
}
