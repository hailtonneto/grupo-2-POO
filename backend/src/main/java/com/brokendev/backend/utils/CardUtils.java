package com.brokendev.backend.utils;

public class CardUtils {

    public static String maskCardNumber(String cardNumber) {
        return "**** **** **** " + cardNumber.substring(12);
    }
}
