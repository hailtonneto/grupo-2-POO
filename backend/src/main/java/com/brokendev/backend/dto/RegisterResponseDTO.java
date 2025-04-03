package com.brokendev.backend.dto;

public record RegisterResponseDTO(
        String name,
        String email,
        String message
) {
}
