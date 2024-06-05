package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserInfoResponse {

    private Long userId;
    private String name;
    private String profileImage;
    private int manner;

    public static UserInfoResponse fromEntity(User user) {

        return UserInfoResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .profileImage(user.getProfile())
                .manner(user.getManner())
                .build();
    }
}
