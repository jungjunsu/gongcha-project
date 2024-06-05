package com.b306.gongcha.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VerifyCodeRequest {

    private String name;
    private String verifyCode;
    private String phone;
}
