package com.brokendev.backend.domain;


import com.brokendev.backend.enums.PixKeyType;
import com.brokendev.backend.enums.PixTransactionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pix_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PixTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Account sender;

    @ManyToOne
    private Account receiver;

    private BigDecimal amount;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private PixTransactionStatus status;

    private String description;

    @Enumerated(EnumType.STRING)
    private PixKeyType pixKeyType; // tipo de chave

    private String pixKey; // valor da chave

}
