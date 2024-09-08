package com.example.payment_service.Controllers;

import com.example.payment_service.Dtos.PaymentDto;
import com.example.payment_service.Models.ChargeRequest;
import com.example.payment_service.Models.Payment;
import com.example.payment_service.Services.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @PostMapping("/charge")
    public ResponseEntity<String> chargeCustomer(@RequestBody ChargeRequest chargeRequest) {
        try {
            Charge charge = Charge.create(chargeRequest.toMap());
            return ResponseEntity.ok("Charge successful: " + charge.getId());
        } catch (StripeException e) {
            return ResponseEntity.status(400).body("Charge failed: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> makePayment(@RequestBody PaymentDto paymentDto) {
        try {
            Payment returnPayment = paymentService.makePayment(paymentDto);
            return ResponseEntity.ok("Charge successful: " + returnPayment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Charge failed: " + e.getMessage());
        }
    }
}
