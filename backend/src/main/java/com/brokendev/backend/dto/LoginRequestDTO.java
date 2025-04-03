package com.brokendev.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @Email(message = "E-mail inválido")
        @NotBlank(message = "campo e-mail é obrigatório")
        String email,

        @NotBlank(message = "a senha é obrigatória")
        String password
) {
}
