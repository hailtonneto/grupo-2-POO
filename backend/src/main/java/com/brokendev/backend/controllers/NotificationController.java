package com.brokendev.backend.controllers;


import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.notification.NotificationResponseDTO;
import com.brokendev.backend.services.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @Operation(
            summary = "listar as notificações de um usuário",
            description = "retorna uma lista com todas as notificações acerca de um usuário."
    )
    @GetMapping
    public List<NotificationResponseDTO> listNotifications(@AuthenticationPrincipal User user) {
        return notificationService.listNotifications(user);
    }

    @Operation(
            summary = "Marcar notificação como lida",
            description = "Marca a notificação informada como lida para o usuário autenticado."
    )
    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        notificationService.markAsRead(id, user);
        return ResponseEntity.noContent().build();
    }
}
