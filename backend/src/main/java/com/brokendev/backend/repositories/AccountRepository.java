package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.Account;
import com.brokendev.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String>{

    Optional<Account>findByUser(User user);
    Optional<Account>findByUserEmail(String email);
}
