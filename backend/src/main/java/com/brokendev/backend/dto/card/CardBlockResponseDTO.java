package com.brokendev.backend.dto.card;

public record CardBlockResponseDTO(
        Long id,
        boolean blocked,
        String message
) {
}
