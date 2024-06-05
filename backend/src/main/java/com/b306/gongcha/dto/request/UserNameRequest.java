package com.b306.gongcha.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "닉네임 변경 DTO")
public class UserNameRequest {

    private String name;
}
