package com.brokendev.backend.dto.account;

import java.math.BigDecimal;

public record AccountDepositResponseDTO(
        BigDecimal newBalance,
        String message
) {
}
