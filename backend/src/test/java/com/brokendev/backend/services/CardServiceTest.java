package com.brokendev.backend.services;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Card;
import com.brokendev.backend.dto.card.CardBlockResponseDTO;
import com.brokendev.backend.dto.card.CardCreateRequestDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;
import com.brokendev.backend.exception.AccountNotFoundException;
import com.brokendev.backend.exception.CardNotFoundException;
import com.brokendev.backend.repositories.AccountRepository;
import com.brokendev.backend.repositories.CardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

    @Mock private CardRepository cardRepository;
    @Mock private AccountRepository accountRepository;

    @InjectMocks
    private CardService cardService;

    private Account account;
    private Card card;

    @BeforeEach
    void setUp() {
        account = new Account();
        account.setId(1L);

        card = new Card();
        card.setId(100L);
        card.setAccount(account);
        card.setHolderName("Test User");
        card.setCardNumber("1234567890123456");
        card.setExpiration("12/29");
        card.setBlocked(false);
        card.setCreatedAt(LocalDate.now());
    }

    // createCard - sucesso
    @Test
    void createCard_givenValidUserAndRequest_whenAccountExists_thenReturnCardResponse() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(cardRepository.save(any(Card.class))).thenAnswer(invocation -> {
            Card c = invocation.getArgument(0);
            c.setId(100L); // Simula o ID gerado pelo banco
            return c;
        });

        CardCreateRequestDTO request = new CardCreateRequestDTO("Test User");

        CardResponseDTO response = cardService.createCard("user@email.com", request);

        assertThat(response.holderName()).isEqualTo("Test User");
        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.blocked()).isFalse();
        assertThat(response.cardNumber()).contains("****"); // Mascara aplicada
    }

    // createCard - conta não encontrada
    @Test
    void createCard_givenInvalidUser_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());
        CardCreateRequestDTO request = new CardCreateRequestDTO("Test User");

        assertThatThrownBy(() -> cardService.createCard("notfound@email.com", request))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("Conta não encontrada");
    }

    // listCards - sucesso
    @Test
    void listCards_givenValidUser_whenAccountExists_thenReturnListOfCards() {
        when(accountRepository.findByUserEmail("user@email.com")).thenReturn(Optional.of(account));
        when(cardRepository.findByAccount(account)).thenReturn(List.of(card));

        List<CardResponseDTO> cards = cardService.listCards("user@email.com");

        assertThat(cards).hasSize(1);
        assertThat(cards.get(0).holderName()).isEqualTo("Test User");
    }

    // listCards - conta não encontrada
    @Test
    void listCards_givenInvalidUser_whenAccountNotFound_thenThrowException() {
        when(accountRepository.findByUserEmail("notfound@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> cardService.listCards("notfound@email.com"))
                .isInstanceOf(AccountNotFoundException.class)
                .hasMessage("Conta não encontrada");
    }

    // blockCard - sucesso
    @Test
    void blockCard_givenValidCardId_whenCardExists_thenBlockAndReturnResponse() {
        card.setBlocked(false);
        when(cardRepository.findById(100L)).thenReturn(Optional.of(card));
        when(cardRepository.save(any(Card.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CardBlockResponseDTO response = cardService.blockCard(100L);

        assertThat(response.blocked()).isTrue();
        assertThat(response.message()).contains("bloqueado");
    }

    // blockCard - cartão não encontrado
    @Test
    void blockCard_givenInvalidCardId_whenCardNotFound_thenThrowException() {
        when(cardRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> cardService.blockCard(999L))
                .isInstanceOf(CardNotFoundException.class)
                .hasMessage("Cartão não encontrado");
    }

    // unblockCard - sucesso
    @Test
    void unblockCard_givenValidCardId_whenCardExists_thenUnblockAndReturnResponse() {
        card.setBlocked(true);
        when(cardRepository.findById(100L)).thenReturn(Optional.of(card));
        when(cardRepository.save(any(Card.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CardBlockResponseDTO response = cardService.unblockCard(100L);

        assertThat(response.blocked()).isFalse();
        assertThat(response.message()).contains("desbloqueado");
    }

    // unblockCard - cartão não encontrado
    @Test
    void unblockCard_givenInvalidCardId_whenCardNotFound_thenThrowException() {
        when(cardRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> cardService.unblockCard(999L))
                .isInstanceOf(CardNotFoundException.class)
                .hasMessage("Cartão não encontrado");
    }
}