package com.b306.gongcha.util;

import java.util.Random;

public class ValidationUtil {

    // 6자리의 랜덤 인증 코드 생성
    public static String createCode() {

        // 랜덤 인증 코드의 길이 설정
        int length = 6;

        // 랜덤 인증 코드 생성을 위한 문자열
        String numbers = "0123456789";

        // 랜덤 인증 코드를 저장할 문자열 버퍼 생성
        StringBuilder code = new StringBuilder();

        // 랜덤 객체 생성
        Random random = new Random();

        // 인증 코드의 길이만큼 반복하여 랜덤한 숫자로 인증 코드 생성
        for (int i = 0; i < length; i++) {
            // numbers 문자열에서 랜덤하게 한 문자를 선택하여 인증 코드에 추가
            code.append(numbers.charAt(random.nextInt(numbers.length())));
        }

        // 생성된 랜덤 인증 코드 반환
        return code.toString();
    }
}
