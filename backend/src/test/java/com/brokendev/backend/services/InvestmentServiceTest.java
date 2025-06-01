package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Investment;
import com.brokendev.backend.dto.investment.InvestmentRequestDTO;
import com.brokendev.backend.dto.investment.InvestmentResponseDTO;
import com.brokendev.backend.enums.InvestmentType;
import com.brokendev.backend.exception.*;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.InvestmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvestmentServiceTest {

    @Mock private InvestmentRepository investmentRepository;
    @Mock private AccountRepository accountRepository;

    @InjectMocks
    private InvestmentService investmentService;

    private Account account;
    private Investment investment;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setId(1L);
        account.setBalance(new BigDecimal("1000.00"));

        investment = new Investment();
        investment.setId(10L);
        investment.setInvestor(account);
        investment.setType(InvestmentType.CDB);
        investment.setAmount(new BigDecimal("100.00"));
        investment.setInvestmentDate(LocalDateTime.now().minusDays(31));
        investment.setExpectedReturn(new BigDecimal("110.00"));
        investment.setMaturityDate(LocalDateTime.now().minusDays(1));
        investment.setRedeemed(false);
    }

    // invest - sucesso
    @Test
    void invest_givenValidRequest_whenSufficientBalance_thenReturnInvestmentResponse() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(investmentRepository.save(any(Investment.class))).thenAnswer(invocation -> {
            Investment inv = invocation.getArgument(0);
            inv.setId(10L);
            return inv;
        });

        InvestmentRequestDTO request = new InvestmentRequestDTO(InvestmentType.CDB, new BigDecimal("100.00"));

        InvestmentResponseDTO response = investmentService.invest("user@email.com", request);

        assertThat(response.type()).isEqualTo(InvestmentType.CDB);
        assertThat(response.amount()).isEqualByComparingTo("100.00");
        assertThat(response.expectedReturn()).isGreaterThan(new BigDecimal("100.00"));
        assertThat(account.getBalance()).isEqualByComparingTo("900.00");
    }

    // invest - saldo insuficiente
    @Test
    void invest_givenInsufficientBalance_whenInvestAttempted_thenThrowException() {
        account.setBalance(new BigDecimal("50.00"));
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));

        InvestmentRequestDTO request = new InvestmentRequestDTO(InvestmentType.CDB, new BigDecimal("100.00"));

        assertThatThrownBy(() -> investmentService.invest("user@email.com", request))
                .isInstanceOf(InsufficientBalanceException.class)
                .hasMessage("Saldo insuficiente para investir");
    }

    // invest - conta não encontrada
    @Test
    void invest_givenInvalidUser_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());
        InvestmentRequestDTO request = new InvestmentRequestDTO(InvestmentType.CDB, new BigDecimal("100.00"));

        assertThatThrownBy(() -> investmentService.invest("notfound@email.com", request))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("Conta não encontrada");
    }

    // listInvestments - sucesso
    @Test
    void listInvestments_givenValidUser_whenAccountExists_thenReturnList() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findByInvestor(account)).thenReturn(List.of(investment));

        List<InvestmentResponseDTO> list = investmentService.listInvestments("user@email.com");

        assertThat(list).hasSize(1);
        assertThat(list.get(0).id()).isEqualTo(10L);
    }

    // listInvestments - conta não encontrada
    @Test
    void listInvestments_givenInvalidUser_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> investmentService.listInvestments("notfound@email.com"))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("Conta não encontrada");
    }

    // redeemInvestment - sucesso
    @Test
    void redeemInvestment_givenValidRequest_whenMaturedAndNotRedeemed_thenReturnResponse() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findById(10L)).thenReturn(Optional.of(investment));
        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(investmentRepository.save(any(Investment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        InvestmentResponseDTO response = investmentService.redeemInvestment("user@email.com", 10L);

        assertThat(response.redeemed()).isTrue();
        assertThat(account.getBalance()).isEqualByComparingTo("1110.00");
    }

    // redeemInvestment - conta não encontrada
    @Test
    void redeemInvestment_givenInvalidUser_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> investmentService.redeemInvestment("notfound@email.com", 10L))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("Conta não encontrada");
    }

    // redeemInvestment - investimento não encontrado
    @Test
    void redeemInvestment_givenInvalidInvestmentId_whenNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> investmentService.redeemInvestment("user@email.com", 99L))
                .isInstanceOf(InvestmentNotFoundException.class)
                .hasMessage("Investimento não encontrado");
    }

    // redeemInvestment - investimento não pertence ao usuário
    @Test
    void redeemInvestment_givenOtherUser_whenOwnershipInvalid_thenThrowException() {
        Account otherAccount = new Account();
        otherAccount.setId(2L);
        investment.setInvestor(otherAccount);

        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findById(10L)).thenReturn(Optional.of(investment));

        assertThatThrownBy(() -> investmentService.redeemInvestment("user@email.com", 10L))
                .isInstanceOf(InvestmentOwnershipException.class)
                .hasMessage("Investimento não pertence ao usuário");
    }

    // redeemInvestment - já resgatado
    @Test
    void redeemInvestment_givenAlreadyRedeemed_whenRedeemAttempted_thenThrowException() {
        investment.setRedeemed(true);

        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findById(10L)).thenReturn(Optional.of(investment));

        assertThatThrownBy(() -> investmentService.redeemInvestment("user@email.com", 10L))
                .isInstanceOf(InvestmentAlreadyRedeemedException.class)
                .hasMessage("Investimento já foi resgatado");
    }

    // redeemInvestment - não venceu ainda
    @Test
    void redeemInvestment_givenNotMatured_whenRedeemAttempted_thenThrowException() {
        investment.setMaturityDate(LocalDateTime.now().plusDays(1));
        investment.setRedeemed(false);

        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(investmentRepository.findById(10L)).thenReturn(Optional.of(investment));

        assertThatThrownBy(() -> investmentService.redeemInvestment("user@email.com", 10L))
                .isInstanceOf(InvestmentNotMaturedException.class)
                .hasMessage("Investimento ainda não venceu");
    }
}