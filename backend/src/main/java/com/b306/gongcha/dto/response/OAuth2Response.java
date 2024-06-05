package com.b306.gongcha.dto.response;

public interface OAuth2Response {
    // 제공자
    String getProvider();
    String getProviderId();
    String getEmail();
    String getName();
}
