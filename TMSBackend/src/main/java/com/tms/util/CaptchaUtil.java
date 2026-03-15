package com.tms.util;

import java.util.Random;

public class CaptchaUtil {

    public static String generateCaptcha(int length) {

        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        StringBuilder captcha = new StringBuilder();

        Random random = new Random();

        for (int i = 0; i < length; i++) {

            captcha.append(chars.charAt(random.nextInt(chars.length())));
        }

        return captcha.toString();
    }
}
