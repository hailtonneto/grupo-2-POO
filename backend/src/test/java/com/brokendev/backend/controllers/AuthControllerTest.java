package com.brokendev.backend.controllers;

import com.brokendev.backend.dto.login.LoginRequestDTO;
import com.brokendev.backend.dto.login.LoginResponseDTO;
import com.brokendev.backend.dto.register.RegisterRequestDTO;
import com.brokendev.backend.dto.register.RegisterResponseDTO;
import com.brokendev.backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private com.brokendev.backend.infra.security.SecurityFilter securityFilter;

    @Test
    void devePermitirLoginComCredenciaisValidas() throws Exception {
        // Arrange
        LoginRequestDTO loginRequest = new LoginRequestDTO("usuario@email.com", "senha123");
        LoginResponseDTO loginResponse = new LoginResponseDTO("usuario", "usuario@email.com", "jwt-token-exemplo");

        Mockito.when(userService.login(any(LoginRequestDTO.class))).thenReturn(loginResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("usuario"))
                .andExpect(jsonPath("$.email").value("usuario@email.com"))
                .andExpect(jsonPath("$.token").value("jwt-token-exemplo"));
    }

    @Test
    void devePermitirRegistroComDadosValidos() throws Exception {
        // Arrange
        RegisterRequestDTO registerRequest = new RegisterRequestDTO("novo Usuário", "12345678901", "novousuario@email.com", "senhaforte123", "81123456789");
        RegisterResponseDTO registerResponse = new RegisterResponseDTO("novo Usuário","novousuario@email.com","Usuário registrado com sucesso!");

        Mockito.when(userService.register(any(RegisterRequestDTO.class))).thenReturn(registerResponse);

        // Act & Assert
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("novo Usuário"))
                .andExpect(jsonPath("$.email").value("novousuario@email.com"))
                .andExpect(jsonPath("$.message").value("Usuário registrado com sucesso!"));
    }
}
