package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Investiment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvestimentRepository extends JpaRepository<Investiment, Long> {

    List<Investiment> findByInvestor(Account investor);
}
