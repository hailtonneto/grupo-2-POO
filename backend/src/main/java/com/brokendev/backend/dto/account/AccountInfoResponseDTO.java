package com.brokendev.backend.dto.account;

import java.math.BigDecimal;

public record AccountInfoResponseDTO(
        Long id,
        BigDecimal balance
) {
}
