package com.brokendev.backend.controllers;


import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.account.AccountBalanceResponseDTO;
import com.brokendev.backend.dto.account.AccountDepositRequestDTO;
import com.brokendev.backend.dto.account.AccountDepositResponseDTO;
import com.brokendev.backend.dto.account.TransactionStatementResponseDTO;
import com.brokendev.backend.dto.boleto.BoletoPaymentRequestDTO;
import com.brokendev.backend.dto.boleto.BoletoPaymentResponseDTO;
import com.brokendev.backend.dto.pixTransfer.PixTransferRequestDTO;
import com.brokendev.backend.dto.pixTransfer.PixTransferResponseDTO;
import com.brokendev.backend.services.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "transferência pix", description = "realiza a transferência pix para outra conta")
    @PostMapping("/pix/transfer")
    public ResponseEntity<PixTransferResponseDTO> transferPix(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid PixTransferRequestDTO request) {
        PixTransferResponseDTO response = accountService.transferPix(user.getEmail(), request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "pagamento de boleto", description = "realiza o pagamento de boleto informado pelo usuário")
    @PostMapping("/boleto/pay")
    public ResponseEntity<BoletoPaymentResponseDTO> payBoleto(
            @AuthenticationPrincipal User user,
            @RequestBody @Valid BoletoPaymentRequestDTO request) {
        BoletoPaymentResponseDTO response = accountService.payBoleto(user.getEmail(), request);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Extrato da conta",
            description = "Retorna o extrato/histórico de transações da conta do usuário autenticado."
    )
    @GetMapping("/statement")
    public ResponseEntity<List<TransactionStatementResponseDTO>> getStatement(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(accountService.getStatement(user.getEmail()));
    }
}