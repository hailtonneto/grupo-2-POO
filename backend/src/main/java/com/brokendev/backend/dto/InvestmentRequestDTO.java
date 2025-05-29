package com.brokendev.backend.dto;

import com.brokendev.backend.enums.InvestmentType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record InvestmentRequestDTO(
        @NotBlank(message = "O tipo de investimento é obrigatório")
        InvestmentType type,

        @NotNull(message = "O valor é obrigatório")
        @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero")
        BigDecimal amount
) {
}
