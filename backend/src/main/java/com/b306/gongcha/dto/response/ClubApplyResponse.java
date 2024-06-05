package com.b306.gongcha.dto.response;

import lombok.Builder;
import lombok.Getter;

import com.b306.gongcha.entity.ClubApply;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubApplyResponse {

    private Long userId;
    private Long clubId;
    private String userName;
    private String content;

    public static ClubApplyResponse fromEntity(ClubApply clubApply) {

        return ClubApplyResponse.builder()
                .userId(clubApply.getUser().getId())
                .clubId(clubApply.getId())
                .userName(clubApply.getUser().getName())
                .content(clubApply.getApplyContent())
                .build();
    }

}
