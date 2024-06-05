package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.UserTeamRequest;
import com.b306.gongcha.dto.response.UserTeamResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserTeam extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_team_id")
    @Schema(description = "유저_팀_id", example = "1L")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Schema(description = "소속 역할", allowableValues = { "팀장", "팀원" }, example = "팀원")
    private Role role; // 소속 역할 - 팀장, 팀원

    @Builder.Default
    @Schema(description = "팀 승인 여부", allowableValues = { "true", "false" }, deprecated = false)
    private Boolean permit = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    public void changeRole(Role role) {

        this.role = role;
    }

    public void changePermit(Boolean permit) {

        this.permit = permit;
    }

    public void changeUser(User user) {

        this.user = user;
    }

    public void changeTeam(Team team) {

        this.team = team;
    }

    public static UserTeam fromRequest(UserTeamRequest userTeamRequest) {

        return UserTeam.builder()
                .role(userTeamRequest.getRole())
                .user(userTeamRequest.getUser())
                .team(userTeamRequest.getTeam())
                .permit(userTeamRequest.getPermit())
                .build();
    }


    public UserTeamResponse toUserTeamResponse() {

        return UserTeamResponse.builder()
                .role(role)
                .userName(user.getName())
                .userId(user.getId())
                .permit(permit)
                .build();
    }
}
