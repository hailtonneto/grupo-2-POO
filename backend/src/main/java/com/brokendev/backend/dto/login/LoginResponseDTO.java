package com.brokendev.backend.dto.login;

public record LoginResponseDTO(
        String name,
        String email,
        String token

) {
}
