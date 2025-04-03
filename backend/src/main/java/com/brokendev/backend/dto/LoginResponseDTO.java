package com.brokendev.backend.dto;

public record LoginResponseDTO(
        String name,
        String email,
        String token

) {
}
