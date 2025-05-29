package com.brokendev.backend.dto.pixTransfer;

import com.brokendev.backend.enums.PixKeyType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PixTransferRequestDTO(
        @NotNull(message = "A chave PIX é obrigatória")
        String pixKey,

        @NotNull(message = "O tipo da chave PIX é obrigatório")
        PixKeyType pixKeyType,

        @NotNull(message = "O valor é obrigatório")
        @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero")
        BigDecimal amount
) {
}
