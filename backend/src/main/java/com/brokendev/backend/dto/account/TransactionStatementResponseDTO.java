package com.brokendev.backend.dto.account;

import com.brokendev.backend.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionStatementResponseDTO(
        TransactionType type,
        BigDecimal amount,
        LocalDateTime date,
        String description
) {
}
