package com.b306.gongcha.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {

    private Long userId;
    private String role;
    private String name;
    private String userInfo;
}
