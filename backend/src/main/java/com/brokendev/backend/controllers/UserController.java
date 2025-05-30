package com.brokendev.backend.controllers;


import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.profile.UserProfileResponseDTO;
import com.brokendev.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Tag(name = "Auth-Info", description = "Endpoint para verificar se o usuário com token válido possui acesso")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "Verificação", description = "verifica se o usuário tem acesso autorizado")
    @GetMapping
    public ResponseEntity<Map<String, String>> getUser() {
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @Operation(
            summary = "Perfil do usuário",
            description = "Retorna os dados do usuário autenticado, incluindo conta e cartões."
    )
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponseDTO> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getProfile(user));
    }
}