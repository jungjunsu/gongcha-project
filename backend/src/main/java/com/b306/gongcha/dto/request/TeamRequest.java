package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
@Schema(description = "팀 생성/수정 요청DTO")
public class TeamRequest {

    @Schema(description = "매칭 성격", allowableValues = { "친선", "내전"}, example = "내전")
    private MatchType matchType; // 매치 종류 - 내전, 친선전

    @Schema(description = "팀 로고")
    private String teamPic;

    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도

    @Schema(description = "일반시, 군, 구", example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "희망 시작 시간", example = "9")
    private int startTime; // 희망 매치 시간 시작

    @Schema(description = "희망 종료 시간", example = "18")
    private int endTime; // 희망 매치 시간 종료

    @Schema(description = "희망요일", example = "[월, 수, 금]")
    private List<String> dayOfWeek; // 희망 요일 목록

    @Schema(description = "경기 수준", allowableValues = { "초급", "중급", "고급" }, example = "초급")
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "팀 참여자", example = "[3]")
    private List<Long> userList; // 참여 클럽원 목록

    @Schema(description = "팀 게시글 작성자", example = "1L")
    private Long writerId; // 작성자(팀장) id

    public Team toTeam() {

        return Team.builder()
                .matchType(matchType)
                .teamPic(teamPic)
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeek(dayOfWeek)
                .region(region)
                .district(district)
                .difficulty(difficulty)
                .build();
    }

}
