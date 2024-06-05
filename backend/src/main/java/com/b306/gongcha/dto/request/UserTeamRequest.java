package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Role;
import com.b306.gongcha.entity.Team;
import com.b306.gongcha.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserTeamRequest {

    private Role role;
    private Boolean permit;
    private User user;
    private Team team;

}
