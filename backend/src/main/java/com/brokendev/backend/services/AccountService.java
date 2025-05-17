package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.AccountBalanceResponseDTO;
import com.brokendev.backend.dto.AccountDepositResponseDTO;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public AccountBalanceResponseDTO getBalance(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = accountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return new AccountBalanceResponseDTO(account.getBalance());
    }

    public AccountDepositResponseDTO deposit(String email, BigDecimal amount){
        Account account = accountRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        return new AccountDepositResponseDTO(account.getBalance(), "Depósito realizado com sucesso!");
    }
}
