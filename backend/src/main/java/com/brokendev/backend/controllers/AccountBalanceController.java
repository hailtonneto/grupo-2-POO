package com.brokendev.backend.controllers;


import com.brokendev.backend.dto.AccountBalanceResponseDTO;
import com.brokendev.backend.services.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountBalanceController {

    private final AccountService accountService;

    @GetMapping("/balance")
    public ResponseEntity<AccountBalanceResponseDTO>getBalance(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(accountService.getBalance(userDetails.getUsername()));

    }
}
