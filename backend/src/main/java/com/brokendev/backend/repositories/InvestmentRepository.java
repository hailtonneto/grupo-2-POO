package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    List<Investment> findByInvestor(Account investor);
}
