package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.PixTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PixTransactionRepository extends JpaRepository<PixTransaction, Long> {

}
