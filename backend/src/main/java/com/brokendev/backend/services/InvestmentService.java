package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Investment;
import com.brokendev.backend.dto.investment.InvestmentRequestDTO;
import com.brokendev.backend.dto.investment.InvestmentResponseDTO;
import com.brokendev.backend.enums.InvestmentType;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestmentService {

    private final InvestmentRepository investmentRepository;

    private final AccountRepository accountRepository;

    @Transactional
    public InvestmentResponseDTO invest(String userEmail, InvestmentRequestDTO request) {
        Account investor = accountRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));
        if(investor.getBalance().compareTo(request.amount()) < 0){
            throw new RuntimeException("Saldo insuficiente para investir");
        }

        // Debita o valor investido
        investor.setBalance(investor.getBalance().subtract(request.amount()));
        accountRepository.save(investor);

        // Simulação de retorno e vencimento
        BigDecimal expectedReturn = calcularRetorno(request.type(), request.amount());
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime maturityDate = now.plus(30, ChronoUnit.DAYS); // Exemplo: 30 dias

        Investment investment = new Investment();
        investment.setInvestor(investor);
        investment.setType(request.type());
        investment.setAmount(request.amount());
        investment.setInvestmentDate(now);
        investment.setExpectedReturn(expectedReturn);
        investment.setMaturityDate(maturityDate);
        investment.setRedeemed(false);

        investmentRepository.save(investment);

        return new InvestmentResponseDTO(
                investment.getId(),
                investment.getType(),
                investment.getAmount(),
                investment.getInvestmentDate(),
                investment.getExpectedReturn(),
                investment.getMaturityDate(),
                investment.isRedeemed()
        );
    }

    public List<InvestmentResponseDTO> listInvestments(String userEmail) {
        Account investor = accountRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));
        return investmentRepository.findByInvestor(investor)
                .stream()
                .map(inv -> new InvestmentResponseDTO(
                        inv.getId(),
                        inv.getType(),
                        inv.getAmount(),
                        inv.getInvestmentDate(),
                        inv.getExpectedReturn(),
                        inv.getMaturityDate(),
                        inv.isRedeemed()
                ))
                .toList();
    }

    @Transactional
    public InvestmentResponseDTO redeemInvestment(String userEmail, Long investmentId) {
        Account investor = accountRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        Investment investment = investmentRepository.findById(investmentId)
                .orElseThrow(() -> new RuntimeException("Investimento não encontrado"));

        if (!investment.getInvestor().getId().equals(investor.getId())) {
            throw new RuntimeException("Investimento não pertence ao usuário");
        }
        if (investment.isRedeemed()) {
            throw new RuntimeException("Investimento já foi resgatado");
        }
        if (LocalDateTime.now().isBefore(investment.getMaturityDate())) {
            throw new RuntimeException("Investimento ainda não venceu");
        }

        // Credita o valor de retorno na conta
        investor.setBalance(investor.getBalance().add(investment.getExpectedReturn()));
        accountRepository.save(investor);

        // Marca como resgatado
        investment.setRedeemed(true);
        investmentRepository.save(investment);

        return new InvestmentResponseDTO(
                investment.getId(),
                investment.getType(),
                investment.getAmount(),
                investment.getInvestmentDate(),
                investment.getExpectedReturn(),
                investment.getMaturityDate(),
                investment.isRedeemed()
        );
    }

    // funçao para calcular retorno
    private BigDecimal calcularRetorno(InvestmentType type, BigDecimal amount) {
        double taxa = switch (type) {
            case CDB -> 1.10;
            case TESOURO_DIRETO -> 1.12;
            case LCI -> 1.09;
            case LCA -> 1.08;
            case POUPANCA -> 1.06;
        };
        return amount.multiply(BigDecimal.valueOf(taxa));
    }
}
