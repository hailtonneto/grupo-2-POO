package com.brokendev.backend.exception;

public class PixTransferNotAllowedException extends RuntimeException {
    public PixTransferNotAllowedException(String message) {
        super(message);
    }
}
