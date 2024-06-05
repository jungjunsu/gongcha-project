package com.b306.gongcha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "firebase device token 요청 DTO")
public class DeviceTokenRequest {

    private String token;
}
