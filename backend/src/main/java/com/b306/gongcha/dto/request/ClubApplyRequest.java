package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.ClubApply;
import com.b306.gongcha.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClubApplyRequest {

    private String content;

    public ClubApply fromRequestWithUserAndClub(User user, Club club) {

        return ClubApply.builder()
                .user(user)
                .club(club)
                .applyContent(content)
                .build();
    }

}
