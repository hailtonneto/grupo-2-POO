package com.brokendev.backend.dto.dashboard;

import com.brokendev.backend.dto.account.TransactionStatementResponseDTO;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponseDTO(
        String name,
        String email,
        BigDecimal balance,
        List<TransactionStatementResponseDTO> lastTransactions
) {
}
