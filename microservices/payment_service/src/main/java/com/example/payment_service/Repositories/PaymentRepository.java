package com.example.payment_service.Repositories;

import com.example.payment_service.Models.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, Long> {
}
