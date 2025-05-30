package com.brokendev.backend.dto.profile;

import com.brokendev.backend.dto.account.AccountInfoResponseDTO;
import com.brokendev.backend.dto.card.CardResponseDTO;

import java.util.List;

public record UserProfileResponseDTO(
        String name,
        String email,
        String cpf,
        String telephone,
        AccountInfoResponseDTO account,
        List<CardResponseDTO> cards
) {
}
