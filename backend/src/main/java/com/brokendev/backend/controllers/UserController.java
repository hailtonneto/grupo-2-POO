package com.brokendev.backend.controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "Auth-Info", description = "Endpoint para verificar se o usuário com token válido possui acesso")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    @Operation(summary = "Verificação", description = "verifica se o usuário tem acesso autorizado")
    @GetMapping
    public ResponseEntity<String> getUser(){
        return ResponseEntity.ok("success");
    }
}