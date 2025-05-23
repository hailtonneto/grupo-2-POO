package com.brokendev.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
        @NotBlank(message = "o campo 'nome' é obrigatório")
        String name,

        @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 números")
        @NotBlank(message = "CPF é obrigatório")
        String cpf,

        @Email(message = "E-mail inválido")
        @NotBlank(message = "e-mail é obrigatório")
        String email,


        @NotBlank(message = "A senha é obrigatória")
        @Size(min= 6, message = "A senha deve ter no mínimo 6 caracteres")
        String password,

        @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 digitos")
        @NotBlank(message = "O campo telefone é obrigatório")
        String telephone
) {
}
