package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.BoletoPayment;
import com.brokendev.backend.domain.PixTransaction;
import com.brokendev.backend.domain.User;
import com.brokendev.backend.dto.*;
import com.brokendev.backend.enums.BoletoPaymentStatus;
import com.brokendev.backend.enums.PixTransactionStatus;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.BoletoPaymentRepository;
import com.brokendev.backend.repositories.PixTransactionRepository;
import com.brokendev.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PixTransactionRepository pixTransactionRepository;

    @Autowired
    private BoletoPaymentRepository boletoPaymentRepository;

    public AccountBalanceResponseDTO getBalance(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        Account account = accountRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        return new AccountBalanceResponseDTO(account.getBalance());
    }

    public AccountDepositResponseDTO deposit(String email, BigDecimal amount){
        Account account = accountRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Conta com email fornecido não encontrada"));

        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        return new AccountDepositResponseDTO(account.getBalance(), "Depósito realizado com sucesso!");


    }

    @Transactional
    public PixTransferResponseDTO transferPix(String senderEmail, PixTransferRequestDTO request) {
        Account sender = accountRepository.findByUserEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Conta do remetente não encontrada"));

        Account receiver = switch (request.pixKeyType()) {
            case EMAIL -> accountRepository.findByUserEmail(request.pixKey())
                    .orElseThrow(() -> new RuntimeException("Conta do destinatário não encontrada"));
            case CPF -> accountRepository.findByUserCpf(request.pixKey())
                    .orElseThrow(() -> new RuntimeException("Conta do destinatário não encontrada"));
            case PHONE -> accountRepository.findByUserTelephone(request.pixKey())
                    .orElseThrow(() -> new RuntimeException("Conta do destinatário não encontrada"));
            case RANDOM -> throw new UnsupportedOperationException("Chave aleatória ainda não suportada");
        };

        if (sender.getBalance().compareTo(request.amount()) < 0) {
            throw new RuntimeException("Saldo insuficiente");
        }
        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("Não é permitido transferir para si mesmo");
        }

        sender.setBalance(sender.getBalance().subtract(request.amount()));
        receiver.setBalance(receiver.getBalance().add(request.amount()));
        accountRepository.save(sender);
        accountRepository.save(receiver);

        PixTransaction transaction = new PixTransaction();
        transaction.setSender(sender);
        transaction.setReceiver(receiver);
        transaction.setAmount(request.amount());
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setStatus(PixTransactionStatus.COMPLETED);
        transaction.setDescription("Transferência PIX realizada com sucesso!");
        transaction.setPixKeyType(request.pixKeyType());
        transaction.setPixKey(request.pixKey());

        pixTransactionRepository.save(transaction);

        return new PixTransferResponseDTO(
                sender.getUser().getEmail(),
                receiver.getUser().getEmail(),
                request.amount(),
                transaction.getTimestamp(),
                transaction.getStatus(),
                transaction.getDescription(),
                transaction.getPixKeyType(),
                transaction.getPixKey()
        );
    }

    public BoletoPaymentResponseDTO payBoleto(String payerEmail, BoletoPaymentRequestDTO request) {
        Account payer = accountRepository.findByUserEmail(payerEmail)
                .orElseThrow(() -> new RuntimeException("Conta com email fornecido não encontrada"));

        if(payer.getBalance().compareTo(request.amount()) < 0) {
            throw new RuntimeException("Saldo insuficiente");
        }

        payer.setBalance(payer.getBalance().subtract(request.amount()));
        accountRepository.save(payer);

        BoletoPayment boleto = new BoletoPayment();
        boleto.setPayer(payer);
        boleto.setBarcode(request.barcode());
        boleto.setAmount(request.amount());
        boleto.setPaymentDate(LocalDateTime.now());
        boleto.setStatus(BoletoPaymentStatus.PAID);
        boleto.setDescription("Pagamento de boleto realizado com sucesso!");
        boletoPaymentRepository.save(boleto);

        return new BoletoPaymentResponseDTO(
                boleto.getBarcode(),
                boleto.getAmount(),
                boleto.getPaymentDate(),
                boleto.getStatus(),
                boleto.getDescription()
        );
    }
}