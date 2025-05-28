package com.brokendev.backend.dto;

import com.brokendev.backend.enums.InvestimentType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record InvestmentResponseDTO(
        Long id,
        InvestimentType type,
        BigDecimal amount,
        LocalDateTime investmentDate,
        BigDecimal expectedReturn,
        LocalDateTime maturityDate,
        boolean redeemed
) {
}
