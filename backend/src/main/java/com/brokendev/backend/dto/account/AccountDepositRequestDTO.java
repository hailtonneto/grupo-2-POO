package com.brokendev.backend.dto.account;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AccountDepositRequestDTO(
        @NotNull(message = "o valor do depósito é obrigatório")
        @DecimalMin(value = "0.01", message = "o valor deve ser maior que 0.0")
        BigDecimal amount
) {
}
