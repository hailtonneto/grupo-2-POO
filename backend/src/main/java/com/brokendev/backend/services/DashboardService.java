package com.brokendev.backend.services;

import com.brokendev.backend.dto.account.TransactionStatementResponseDTO;
import com.brokendev.backend.dto.dashboard.DashboardResponseDTO;
import com.brokendev.backend.exception.AccountNotFoundException;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;

    private final AccountRepository accountRepository;

    private final AccountService accountService;

    public DashboardResponseDTO getDashboard(String userEmail){
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("usuário não encontrado"));

        var account = accountRepository.findByUser(user)
                .orElseThrow(() -> new AccountNotFoundException("conta não encontrada"));

        List<TransactionStatementResponseDTO> lastTransactions = accountService.getStatement(userEmail)
                .stream()
                .limit(5)
                .toList();

        return new DashboardResponseDTO(
                user.getName(),
                user.getEmail(),
                account.getBalance(),
                lastTransactions
        );
    }
}
