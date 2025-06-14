package com.brokendev.backend.controllers;

import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.card.CardBlockResponseDTO;
import com.brokendev.backend.dto.card.CardCreateRequestDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;
import com.brokendev.backend.services.CardService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @Operation(
            summary = "Criar cartão",
            description = "Gera um novo cartão para o usuário autenticado. O nome do titular pode ser informado no corpo da requisição."
    )
    @PostMapping
    public ResponseEntity<CardResponseDTO> createCard(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid CardCreateRequestDTO request) {
        return ResponseEntity.ok(cardService.createCard(user.getEmail(), request));
    }

    @Operation(
            summary = "Listar cartões",
            description = "Retorna todos os cartões vinculados à conta do usuário autenticado."
    )
    @GetMapping
    public ResponseEntity<List<CardResponseDTO>> listCards(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cardService.listCards(user.getEmail()));
    }

    @Operation(summary = "Bloquear cartão", description = "Bloqueia o cartão pelo ID.")
    @PatchMapping("/{id}/block")
    public ResponseEntity<CardBlockResponseDTO> blockCard(@PathVariable Long id) {
        return ResponseEntity.ok(cardService.blockCard(id));
    }

    @Operation(summary = "Desbloquear cartão", description = "Desbloqueia o cartão pelo ID.")
    @PatchMapping("/{id}/unblock")
    public ResponseEntity<CardBlockResponseDTO> unblockCard(@PathVariable Long id) {
        return ResponseEntity.ok(cardService.unblockCard(id));
    }
}
