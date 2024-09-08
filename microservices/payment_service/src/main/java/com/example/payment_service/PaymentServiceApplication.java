package com.example.payment_service;

import com.stripe.Stripe;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(PaymentServiceApplication.class, args);
        Stripe.apiKey = "sk_test_51PDRvh09KM04Jx5gDjWwfxMxGpiQIkiAkZPAtLTOToLQGAehoZOhbHayRD8mC50QRnvcmloo1v7E9ruuj80UDPYr00DfanLGL0";
	}

}
