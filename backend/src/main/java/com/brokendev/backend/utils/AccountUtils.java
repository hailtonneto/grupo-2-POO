package com.brokendev.backend.utils;

public class AccountUtils {
    public static String generateAccountNumber() {
        return String.valueOf(System.currentTimeMillis());
    }
}
