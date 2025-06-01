package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.BoletoPayment;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.account.AccountBalanceResponseDTO;
import com.brokendev.backend.dto.account.AccountDepositResponseDTO;
import com.brokendev.backend.dto.boleto.BoletoPaymentRequestDTO;
import com.brokendev.backend.dto.boleto.BoletoPaymentResponseDTO;
import com.brokendev.backend.dto.pixTransfer.PixTransferRequestDTO;
import com.brokendev.backend.enums.BoletoPaymentStatus;
import com.brokendev.backend.enums.PixKeyType;
import com.brokendev.backend.exception.AccountNotFoundException;
import com.brokendev.backend.exception.InsufficientBalanceException;
import com.brokendev.backend.exception.PixTransferNotAllowedException;
import com.brokendev.backend.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock private AccountRepository accountRepository;
    @Mock private UserRepository userRepository;
    @Mock private PixTransactionRepository pixTransactionRepository;
    @Mock private BoletoPaymentRepository boletoPaymentRepository;
    @Mock private NotificationService notificationService;
    @Mock private InvestmentRepository investmentRepository;

    @InjectMocks
    private AccountService accountService;

    private User user;
    private Account account;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("user@email.com");
        account = new Account();
        account.setId(10L);
        account.setUser(user);
        account.setBalance(new BigDecimal("1000.00"));
    }

    // getBalance - sucesso
    @Test
    void getBalance_givenValidEmail_whenUserAndAccountExist_thenReturnBalance() {
        when(userRepository.findByEmail("user@email.com")).thenReturn(Optional.of(user));
        when(accountRepository.findByUser(user)).thenReturn(Optional.of(account));

        AccountBalanceResponseDTO response = accountService.getBalance("user@email.com");

        assertThat(response.balance()).isEqualByComparingTo("1000.00");
    }

    // getBalance - usuário não encontrado
    @Test
    void getBalance_givenInvalidEmail_whenUserNotFound_thenThrowException() {
        when(userRepository.findByEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.getBalance("notfound@email.com"))
                .isInstanceOf(org.springframework.security.core.userdetails.UsernameNotFoundException.class)
                .hasMessage("Usuário não encontrado");
    }

    // deposit - sucesso
    @Test
    void deposit_givenValidEmailAndAmount_whenAccountExists_thenDepositAndReturnResponse() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AccountDepositResponseDTO response = accountService.deposit("user@email.com", new BigDecimal("200.00"));

        assertThat(response.newBalance()).isEqualByComparingTo("1200.00");
        assertThat(response.message()).isEqualTo("Depósito realizado com sucesso!");
        verify(notificationService).notify(eq(user), anyString(), contains("200.00"));
    }

    // deposit - conta não encontrada
    @Test
    void deposit_givenInvalidEmail_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.deposit("notfound@email.com", new BigDecimal("100.00")))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessageContaining("Conta com email fornecido não encontrada");
    }

    // transferPix - saldo insuficiente
    @Test
    void transferPix_givenInsufficientBalance_whenTransferAttempted_thenThrowException() {
        account.setBalance(new BigDecimal("50.00"));
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));

        // Mock do destinatário
        User receiverUser = new User();
        receiverUser.setId(2L);
        receiverUser.setEmail("dest@email.com");
        Account receiver = new Account();
        receiver.setId(20L);
        receiver.setUser(receiverUser);
        receiver.setBalance(new BigDecimal("1000.00"));
        when(accountRepository.findByUserEmail("dest@email.com")).thenReturn(Optional.of(receiver));

        PixTransferRequestDTO request = new PixTransferRequestDTO("dest@email.com", PixKeyType.EMAIL, new BigDecimal("100.00"));

        assertThatThrownBy(() -> accountService.transferPix("user@email.com", request))
                .isInstanceOf(InsufficientBalanceException.class)
                .hasMessage("Saldo insuficiente");
    }

    // transferPix - transferência para si mesmo
    @Test
    void transferPix_givenSameSenderAndReceiver_whenTransferAttempted_thenThrowException() {
        // O remetente e o destinatário são a mesma conta
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));

        PixTransferRequestDTO request = new PixTransferRequestDTO("user@email.com", PixKeyType.EMAIL, new BigDecimal("100.00"));

        assertThatThrownBy(() -> accountService.transferPix("user@email.com", request))
                .isInstanceOf(PixTransferNotAllowedException.class)
                .hasMessage("Não é permitido transferir para si mesmo");
    }

    // payBoleto - saldo insuficiente
    @Test
    void payBoleto_givenInsufficientBalance_whenPaymentAttempted_thenThrowException() {
        account.setBalance(new BigDecimal("10.00"));
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));

        BoletoPaymentRequestDTO request = new BoletoPaymentRequestDTO("123456789", new BigDecimal("100.00"));

        assertThatThrownBy(() -> accountService.payBoleto("user@email.com", request))
                .isInstanceOf(InsufficientBalanceException.class)
                .hasMessage("Saldo insuficiente");
    }

    // payBoleto - sucesso
    @Test
    void payBoleto_givenValidRequest_whenSufficientBalance_thenReturnResponse() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(boletoPaymentRepository.save(any(BoletoPayment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BoletoPaymentRequestDTO request = new BoletoPaymentRequestDTO("123456789", new BigDecimal("100.00"));

        BoletoPaymentResponseDTO response = accountService.payBoleto("user@email.com", request);

        assertThat(response.barcode()).isEqualTo("123456789");
        assertThat(response.amount()).isEqualByComparingTo("100.00");
        assertThat(response.status()).isEqualTo(BoletoPaymentStatus.PAID);
        assertThat(response.description()).contains("Pagamento de boleto realizado com sucesso!");
        verify(notificationService).notify(eq(user), anyString(), contains("123456789"));
    }
}