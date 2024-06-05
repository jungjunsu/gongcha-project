package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@Schema(description = "팀 응답 DTO")
public class TeamResponse {

    @Schema(description = "팀 id", example = "1L")
    private Long id;

    @Schema(description = "팀장 이름", example = "박하윤")
    private String captainName;

    @Schema(description = "매치 성격", allowableValues = { "친선", "내전" }, example = "내전")
    private MatchType matchType;

    @Schema(description = "팀 로고")
    private String teamPic;

    @Schema(description = "광역시, 도", example = "대전")
    private String region;

    @Schema(description = "일반시, 군, 구", example = "유성구")
    private String district;

    @Schema(description = "희망 시작 시간", example = "9")
    private int startTime;

    @Schema(description = "희망 종료 시간", example = "18")
    private int endTime;

    @Schema(description = "희망요일", example = "[월, 수, 금]")
    private List<String> dayOfWeekList;

    @Schema(description = "경기 수준", allowableValues = { "초급", "중급", "고급" }, example = "초급")
    private Difficulty difficulty;

    @Schema(description = "매칭 성격", defaultValue = "모집중", allowableValues = { "모집중", "모집완료", "매칭중", "매칭완료", "경기종료" } )
    private Status status;

    public void updateCaptainName(String captainName) {

        this.captainName = captainName;
    }

    public static TeamResponse fromEntity(Team team) {

        return TeamResponse.builder()
                .id(team.getId())
                .matchType(team.getMatchType())
                .teamPic(team.getTeamPic())
                .region(team.getRegion())
                .district(team.getDistrict())
                .startTime(team.getStartTime())
                .endTime(team.getEndTime())
                .dayOfWeekList(team.getDayOfWeek())
                .difficulty(team.getDifficulty())
                .status(team.getStatus())
                .build();
    }

}
