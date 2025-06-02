package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.dto.account.TransactionStatementResponseDTO;
import com.brokendev.backend.dto.dashboard.DashboardResponseDTO;
import com.brokendev.backend.exception.AccountNotFoundException;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private AccountRepository accountRepository;
    @Mock private AccountService accountService;

    @InjectMocks
    private DashboardService dashboardService;

    private com.brokendev.backend.domain.User user;
    private Account account;

    @BeforeEach
    void setUp() {
        user = new com.brokendev.backend.domain.User();
        user.setId(1L);
        user.setName("Test User");
        user.setEmail("user@email.com");

        account = new Account();
        account.setId(10L);
        account.setUser(user);
        account.setBalance(new BigDecimal("1000.00"));
    }

    // getDashboard - sucesso
    @Test
    void getDashboard_givenValidUserEmail_whenUserAndAccountExist_thenReturnDashboard() {
        when(userRepository.findByEmail("user@email.com")).thenReturn(Optional.of(user));
        when(accountRepository.findByUser(user)).thenReturn(Optional.of(account));

        List<TransactionStatementResponseDTO> transactions = List.of(
                new TransactionStatementResponseDTO(null, new BigDecimal("100.00"), null, "desc1"),
                new TransactionStatementResponseDTO(null, new BigDecimal("200.00"), null, "desc2"),
                new TransactionStatementResponseDTO(null, new BigDecimal("300.00"), null, "desc3"),
                new TransactionStatementResponseDTO(null, new BigDecimal("400.00"), null, "desc4"),
                new TransactionStatementResponseDTO(null, new BigDecimal("500.00"), null, "desc5"),
                new TransactionStatementResponseDTO(null, new BigDecimal("600.00"), null, "desc6")
        );
        when(accountService.getStatement("user@email.com")).thenReturn(transactions);

        DashboardResponseDTO response = dashboardService.getDashboard("user@email.com");

        assertThat(response.name()).isEqualTo("Test User");
        assertThat(response.email()).isEqualTo("user@email.com");
        assertThat(response.balance()).isEqualByComparingTo("1000.00");
        assertThat(response.lastTransactions()).hasSize(5);
        assertThat(response.lastTransactions().get(0).amount()).isEqualByComparingTo("100.00");
    }

    // getDashboard - usuário não encontrado
    @Test
    void getDashboard_givenInvalidUserEmail_whenUserNotFound_thenThrowException() {
        when(userRepository.findByEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> dashboardService.getDashboard("notfound@email.com"))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage("usuário não encontrado");
    }

    // getDashboard - conta não encontrada
    @Test
    void getDashboard_givenUserWithoutAccount_whenAccountNotFound_thenThrowException() {
        when(userRepository.findByEmail("user@email.com")).thenReturn(Optional.of(user));
        when(accountRepository.findByUser(user)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> dashboardService.getDashboard("user@email.com"))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("conta não encontrada");
    }
}