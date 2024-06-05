package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.TeamResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "팀 관련 Entity")
public class Team extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    @Schema(description = "팀 id", example = "1L")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_type")
    @Schema(description = "매칭 성격", allowableValues = { "친선", "내전"}, example = "내전")
    private MatchType matchType; // 매치 성격 - 내전/친선

    @Column(name = "team_pic")
    @Schema(description = "팀 로고")
    private String teamPic;

    @Column(name = "start_time")
    @Schema(description = "희망 시작 시간", example = "9")
    private int startTime; // 희망 시간 시작

    @Column(name = "end_time")
    @Schema(description = "희망 시작 시간", example = "18")
    private int endTime; // 희망 시간 종료

    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도

    @Schema(description = "일반시, 군, 구", example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "경기 수준", allowableValues = { "초급", "중급", "고급" }, example = "초급")
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "매칭 성격", defaultValue = "모집중", allowableValues = { "모집중", "모집완료", "매칭중", "매칭완료", "경기종료" } )
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.valueOf("모집중"); // 팀 상태 - 모집중, 모집완료, 매칭중, 매칭완료

    @Schema(description = "희망요일", example = "['월', '수', '금']")
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> dayOfWeek;

    // 팀원 목록
    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserTeam> userTeamList = new ArrayList<>();

    public void updateTeam(TeamRequest teamRequest) {

        this.matchType = teamRequest.getMatchType();
        this.teamPic = teamRequest.getTeamPic();
        this.startTime = teamRequest.getStartTime();
        this.endTime = teamRequest.getEndTime();
        this.region = teamRequest.getRegion();
        this.district = teamRequest.getDistrict();
        this.difficulty = teamRequest.getDifficulty();
        this.dayOfWeek = teamRequest.getDayOfWeek();
    }

    public void updateStatus(Status status) {

        this.status = status;
    }

    public TeamResponse toTeamResponse() {

        return TeamResponse.builder()
                .id(id)
                .matchType(matchType)
                .teamPic(teamPic)
                .region(region)
                .district(district)
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeekList(dayOfWeek)
                .difficulty(difficulty)
                .status(status)
//                .userTeamList(userTeamList)
                .build();
    }

    public static Team fromTeamRequest(TeamRequest teamRequest) {

        return Team.builder()
                .matchType(teamRequest.getMatchType())
                .teamPic(teamRequest.getTeamPic())
                .startTime(teamRequest.getStartTime())
                .endTime(teamRequest.getEndTime())
                .region(teamRequest.getRegion())
                .district(teamRequest.getDistrict())
                .difficulty(teamRequest.getDifficulty())
                .dayOfWeek(teamRequest.getDayOfWeek())
                .build();
    }

}
