package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card>findByAccount(Account account);
}
