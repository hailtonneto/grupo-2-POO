package com.brokendev.backend.controllers;

import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.investment.InvestmentRequestDTO;
import com.brokendev.backend.dto.investment.InvestmentResponseDTO;
import com.brokendev.backend.services.InvestmentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;

    @Operation(
            summary = "investir alguma quantia",
            description = "permite o usuário investir alguma quantia de seu saldo."
    )
    @PostMapping
    public ResponseEntity<InvestmentResponseDTO> invest(
            @AuthenticationPrincipal User user,
            @RequestBody InvestmentRequestDTO request) {
        return ResponseEntity.ok(investmentService.invest(user.getEmail(), request));
    }

    @Operation(
            summary = "listar investimentos",
            description = "lista todos os investimentos feito pelo usuário"
    )
    @GetMapping
    public ResponseEntity<List<InvestmentResponseDTO>> listInvestments(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(investmentService.listInvestments(user.getEmail()));
    }

    @Operation(
            summary = "Resgatar investimento",
            description = "Permite ao usuário resgatar um investimento vencido."
    )
    @PostMapping("/{id}/redeem")
    public ResponseEntity<InvestmentResponseDTO> redeemInvestment(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        return ResponseEntity.ok(investmentService.redeemInvestment(user.getEmail(), id));
    }

}
