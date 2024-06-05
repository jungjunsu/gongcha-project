package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Matching;
import com.b306.gongcha.entity.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Getter
@Builder
@Schema(description = "매칭 응답 DTO")
public class MatchingResponse {

    @Schema(description = "매칭 id", example = "1L")
    private Long id;

    @Schema(description = "매칭 팀장 이름", example = "박하윤")
    private String captainName;

    @Schema(description = "매칭 팀 인원 수", example = "5")
    private int playerNum;

    @Schema(description = "매칭 팀 인원 수", example = "5")
    private String teamPic;

    @Schema(description = "경기 시간", example = "2024-05-14 15:00")
    private String date; // 경기 시간

    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도

    @Schema(description = "일반시, 군, 구",example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "매치 한마디", example = "매너 게임해요.")
    private String info; // 매치 한마디

    @Schema(description = "경기 수준", allowableValues = { "초급", "중급", "상급"}, example = "초급")
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "매칭 상태", allowableValues = { "매칭중", "매칭완료", "경기종료"}, example = "매칭중")
    private Status status; // 팀 상태 - 매칭중, 매칭완료

    @Schema(description = "매칭 팀 id", example = "1L")
    private Long matchingTeamId;

    public void updateCaptainName(String captainName) {

        this.captainName = captainName;
    }

    public void updatePlayerNum(int playerNum) {

        this.playerNum = playerNum;
    }

    public void updateTeamPic(String teamPic) {

        this.teamPic = teamPic;
    }

    public static MatchingResponse fromEntity(Matching matching) {

        return MatchingResponse.builder()
                .id(matching.getId())
                .date(matching.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd E요일 HH:mm")))
                .region(matching.getRegion())
                .district(matching.getDistrict())
                .info(matching.getInfo())
                .difficulty(matching.getDifficulty())
                .status(matching.getStatus())
                .matchingTeamId(matching.getMatchingTeamId())
                .build();
    }

}
