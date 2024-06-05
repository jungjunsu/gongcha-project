package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.MatchType;
import com.b306.gongcha.entity.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Builder
@Schema(description = "매칭 생성/수정 요청 DTO")
public class MatchingRequest {

    @Schema(description = "예약 시간", example = "2024-05-14 15:00")
    private String date; // 예약 시간
    
    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도
    
    @Schema(description = "일반시, 군, 구",example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "매치 한마디", example = "매너 게임해요.")
    private String info; // 매치 한마디

    @Schema(description = "경기 수준", allowableValues = { "초급", "중급", "상급"}, example = "초급")
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "매칭 팀 id", example = "1L")
    private Long matchingTeamId; // 작성자(팀장) id

    public void updateMatchingTeamId(Long matchingTeamId) {

        this.matchingTeamId = matchingTeamId;
    }

}
