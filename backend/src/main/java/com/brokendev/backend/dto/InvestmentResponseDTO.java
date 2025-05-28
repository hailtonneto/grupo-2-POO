package com.brokendev.backend.dto;

import com.brokendev.backend.enums.InvestmentType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InvestmentResponseDTO(
        Long id,
        InvestmentType type,
        BigDecimal amount,
        LocalDateTime investmentDate,
        BigDecimal expectedReturn,
        LocalDateTime maturityDate,
        boolean redeemed
) {
}
