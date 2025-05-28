package com.brokendev.backend.domain;

import com.brokendev.backend.enums.BoletoPaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "boleto_payments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoletoPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Account payer;

    private String barcode;

    private BigDecimal amount;

    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING)
    private BoletoPaymentStatus status;

    private String description;
}
