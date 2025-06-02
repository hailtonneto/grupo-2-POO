package com.brokendev.backend.dto.profile;

public record UserProfileUpdateDTO(
        String name,
        String email,
        String telephone
) {
}
