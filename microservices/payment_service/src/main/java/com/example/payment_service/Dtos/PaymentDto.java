package com.example.payment_service.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    @Id
    private ObjectId paymentId;
    private String cardNo;
    private String expiryDate;
    private int cvc;
    private String name;
    private double amount;
}
