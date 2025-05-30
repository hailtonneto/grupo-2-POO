package com.brokendev.backend.dto.register;

public record RegisterResponseDTO(
        String name,
        String email,
        String message
) {
}
