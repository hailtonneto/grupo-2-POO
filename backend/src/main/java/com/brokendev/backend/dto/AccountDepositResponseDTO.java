package com.brokendev.backend.dto;

import java.math.BigDecimal;

public record AccountDepositResponseDTO(
        BigDecimal newBalance,
        String message
) {
}
