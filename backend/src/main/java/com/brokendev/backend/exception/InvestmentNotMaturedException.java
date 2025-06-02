package com.brokendev.backend.exception;

public class InvestmentNotMaturedException extends RuntimeException {
    public InvestmentNotMaturedException(String message) {
        super(message);
    }
}
