package com.brokendev.backend.exception;

public class InvestmentAlreadyRedeemedException extends RuntimeException {
    public InvestmentAlreadyRedeemedException(String message) {
        super(message);
    }
}
