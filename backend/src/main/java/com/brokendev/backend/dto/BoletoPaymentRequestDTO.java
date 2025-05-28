package com.brokendev.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record BoletoPaymentRequestDTO(
        @NotBlank(message = "O código de barras é obrigatório")
        String barcode,

        @NotNull(message = "O valor é obrigatório")
        @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero")
        BigDecimal amount
) {
}
