package com.brokendev.backend.dto.card;

import java.time.LocalDate;

public record CardResponseDTO(
        Long id,
        String cardNumber,
        String holderName,
        String expiration,
        boolean blocked,
        LocalDate createdAt
) {
}
