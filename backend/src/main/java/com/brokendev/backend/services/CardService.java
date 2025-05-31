package com.brokendev.backend.services;


import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Card;
import com.brokendev.backend.dto.card.CardBlockResponseDTO;
import com.brokendev.backend.dto.card.CardCreateRequestDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.brokendev.backend.utils.CardUtils.*;

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

    @Transactional
    public CardBlockResponseDTO blockCard(Long cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Cartão não encontrado"));
        card.setBlocked(true);
        cardRepository.save(card);
        return new CardBlockResponseDTO(card.getId(), card.isBlocked(), "Cartão bloqueado com sucesso.");
    }

    @Transactional
    public CardBlockResponseDTO unblockCard(Long cardId) {
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Cartão não encontrado"));
        card.setBlocked(false);
        cardRepository.save(card);
        return new CardBlockResponseDTO(card.getId(), card.isBlocked(), "Cartão desbloqueado com sucesso.");
    }




}
