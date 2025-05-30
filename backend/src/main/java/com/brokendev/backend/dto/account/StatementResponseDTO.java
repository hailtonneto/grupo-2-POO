package com.brokendev.backend.dto.account;

import java.util.List;

public record StatementResponseDTO(
        List<TransactionStatementResponseDTO> transactions
) {
}
