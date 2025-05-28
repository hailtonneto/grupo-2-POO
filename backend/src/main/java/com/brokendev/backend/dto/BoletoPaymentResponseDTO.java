package com.brokendev.backend.dto;

import com.brokendev.backend.enums.BoletoPaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BoletoPaymentResponseDTO(
        String barcode,
        BigDecimal amount,
        LocalDateTime paymentDate,
        BoletoPaymentStatus status,
        String description
) {
}
