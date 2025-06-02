package com.brokendev.backend.dto.notification;

import java.time.LocalDateTime;

public record NotificationResponseDTO(
        Long id,
        String title,
        String message,
        LocalDateTime createdAt,
        boolean read
) {
}
