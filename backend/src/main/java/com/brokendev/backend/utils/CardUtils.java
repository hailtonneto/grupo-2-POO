package com.brokendev.backend.utils;

import java.time.LocalDate;
import java.util.Random;

public class CardUtils {

    public static String generateCardNumber() {
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            sb.append(rand.nextInt(10));
        }
        return sb.toString();
    }

    // Método para gerar data de expiração
    public static String generateExpiration() {
        LocalDate now = LocalDate.now();
        int year = now.getYear() + 4;  // Expiração daqui a 4 anos
        int month = now.getMonthValue();
        return String.format("%02d/%02d", month, year % 100);
    }

    // Método para mascarar número de cartão
    public static String maskCardNumber(String cardNumber) {
        return "**** **** **** " + cardNumber.substring(12);
    }


}
