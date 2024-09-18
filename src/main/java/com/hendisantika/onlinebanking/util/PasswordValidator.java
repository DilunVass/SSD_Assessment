package com.hendisantika.onlinebanking.util;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class PasswordValidator {

    private static Pattern pattern = null;

    // Load pattern from the configuration file
    public PasswordValidator(@Value("${password.pattern}") String passwordPattern) {
        pattern = Pattern.compile(passwordPattern);
    }
    public static boolean isValid(final String password) {
        return pattern.matcher(password).matches();
    }
}
