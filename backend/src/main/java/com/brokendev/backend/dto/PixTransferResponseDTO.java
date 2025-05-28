package com.brokendev.backend.dto;

import com.brokendev.backend.enums.PixKeyType;
import com.brokendev.backend.enums.PixTransactionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PixTransferResponseDTO(
        String senderEmail,
        String receiverEmail,
        BigDecimal amount,
        LocalDateTime timestamp,
        PixTransactionStatus status,
        String description,
        PixKeyType pixKeyType,
        String pixKey
) {
}
