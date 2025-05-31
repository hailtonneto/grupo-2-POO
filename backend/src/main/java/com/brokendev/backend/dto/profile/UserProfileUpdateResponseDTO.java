package com.brokendev.backend.dto.profile;

public record UserProfileUpdateResponseDTO(
        String name,
        String email,
        String telephone
) {
}
