package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileResponse {

    private String profileUrl;

    public static ProfileResponse fromEntity(String profileUrl){

        return ProfileResponse.builder()
                .profileUrl(profileUrl)
                .build();
    }
}
