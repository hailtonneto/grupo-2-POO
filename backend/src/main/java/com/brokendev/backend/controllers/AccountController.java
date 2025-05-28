package com.brokendev.backend.controllers;


import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.*;
import com.brokendev.backend.services.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @Operation(summary = "consulta de saldo", description = "consulta o saldo do usuário")
    @GetMapping("/balance")
    public ResponseEntity<AccountBalanceResponseDTO>getBalance(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(accountService.getBalance(user.getEmail()));

    }

    @Operation(summary = "depósito de valor qualquer", description = "realiza o depósito de um valor escolhido pelo usuário")
    @PostMapping("/deposit")
    public ResponseEntity<AccountDepositResponseDTO>deposit(@AuthenticationPrincipal User user, @RequestBody @Valid AccountDepositRequestDTO requestDTO) {
        AccountDepositResponseDTO responseDTO = accountService.deposit(user.getEmail(), requestDTO.amount());
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/pix/transfer")
    public ResponseEntity<PixTransferResponseDTO> transferPix(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid PixTransferRequestDTO request) {
        PixTransferResponseDTO response = accountService.transferPix(user.getEmail(), request);
        return ResponseEntity.ok(response);
    }
}