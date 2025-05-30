package com.brokendev.backend.services;


import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Card;
import com.brokendev.backend.dto.card.CardCreateRequestDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import static com.brokendev.backend.utils.CardUtils.maskCardNumber;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public CardResponseDTO createCard(String userEmail, CardCreateRequestDTO request) {
        Account account = accountRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));

        // Geração simples de número de cartão e validade
        String cardNumber = generateCardNumber();
        String expiration = generateExpiration();
        LocalDate createdAt = LocalDate.now();

        Card card = new Card();
        card.setAccount(account);
        card.setHolderName(request.holderName());
        card.setCardNumber(cardNumber);
        card.setExpiration(expiration);
        card.setBlocked(false);
        card.setCreatedAt(createdAt);

        cardRepository.save(card);

        return new CardResponseDTO(
                card.getId(),
                maskCardNumber(card.getCardNumber()),
                card.getHolderName(),
                card.getExpiration(),
                card.isBlocked(),
                card.getCreatedAt()
        );
    }

    public List<CardResponseDTO> listCards(String userEmail) {
        Account account = accountRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));
        return cardRepository.findByAccount(account)
                .stream()
                .map(card -> new CardResponseDTO(
                        card.getId(),
                        maskCardNumber(card.getCardNumber()),
                        card.getHolderName(),
                        card.getExpiration(),
                        card.isBlocked(),
                        card.getCreatedAt()
                ))
                .toList();
    }

    // Métodos utilitários para geração e mascaramento
    private String generateCardNumber() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            sb.append(rand.nextInt(10));
        }
        return sb.toString();
    }

    private String generateExpiration() {
        LocalDate now = LocalDate.now();
        int year = now.getYear() + 4;
        int month = now.getMonthValue();
        return String.format("%02d/%02d", month, year % 100);
    }
}
