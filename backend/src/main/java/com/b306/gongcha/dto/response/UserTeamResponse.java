package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.BaseEntity;
import com.b306.gongcha.entity.Role;
import com.b306.gongcha.entity.Team;
import com.b306.gongcha.entity.UserTeam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@Schema(description = "팀 유저 정보 응답 DTO")
public class UserTeamResponse {

    @Schema(description = "소속 역할", allowableValues = { "팀장", "팀원" }, example = "팀원")
    private Role role;

    @Schema(description = "소속 팀원 유저 id", example = "1L")
    private Long userId;

    @Schema(description = "소속 팀원 유저 이름", example = "박하윤")
    private String userName;

    @Schema(description = "팀 승인 여부", allowableValues = { "true", "false" }, deprecated = false)
    private Boolean permit;

    @Schema(description = "선수 참여 경기 수", example = "20")
    private int games;

    private String phone;

    public void updateGames(int games) {

        this.games = games;
    }

    public void updatePhone(String phone) {

        this.phone = phone;
    }

    public static List<UserTeamResponse> fromEntity(Team team) {

        return team.getUserTeamList().stream()
                .map(user -> UserTeamResponse.builder()
                        .role(user.getRole())
                        .userId(user.getUser().getId())
                        .userName(user.getUser().getName())
                        .permit(user.getPermit())
                        .build())
                .collect(Collectors.toList());
    }

}
