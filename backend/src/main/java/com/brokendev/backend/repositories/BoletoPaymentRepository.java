package com.brokendev.backend.repositories;

import com.brokendev.backend.domain.BoletoPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoletoPaymentRepository extends JpaRepository<BoletoPayment, Long> {
}
