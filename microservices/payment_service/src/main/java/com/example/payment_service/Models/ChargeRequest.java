package com.example.payment_service.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChargeRequest {
    private String amount;
    private String currency;
    private String source;
    private String description;

    // Getters and setters

    public Map<String, Object> toMap() {
        Map<String, Object> item = new HashMap<>();
        item.put("amount", amount);
        item.put("currency", currency);
        item.put("source", source);
        item.put("description", description);
        return item;
    }
}
