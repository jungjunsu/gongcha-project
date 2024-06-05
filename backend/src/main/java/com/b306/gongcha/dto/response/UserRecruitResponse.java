package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Recruit;
import com.b306.gongcha.entity.User;
import lombok.*;

@Getter
@Builder
public class UserRecruitResponse {

    private Long id;
    private Boolean recruit_permit;
    private String writerNickname;
    private String userNickname;

}
