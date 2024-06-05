package com.b306.gongcha.entity;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Builder
@RedisHash(value = "SmsInfo")
public class SmsInfo {

    @Id
    private String phoneNumber;

    private String verificationCode;

    @TimeToLive
    private Long expirationSeconds;

    public static SmsInfo from(String phoneNumber, String verificationCode) {
        return SmsInfo.builder()
                .phoneNumber(phoneNumber)
                .verificationCode(verificationCode)
                .expirationSeconds(5 * 60L) // 5분 설정
                .build();
    }

}
