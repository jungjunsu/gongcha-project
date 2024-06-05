package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.MatchingAsk;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "매칭 요청 응답 DTO")
public class MatchingAskResponse {

    private Long id;

    @Schema(description = "매칭 팀 id", example = "1L")
    private Long matchingTeamId;

    @Schema(description = "상대 팀 id", example = "2L")
    private Long versusTeamId;

    @Schema(description = "매칭 승인 여부", allowableValues = { "true", "false"}, example = "false")
    private Boolean permit;

    public static MatchingAskResponse fromEntity(MatchingAsk matchingAsk) {

        return MatchingAskResponse.builder()
                .id(matchingAsk.getId())
                .matchingTeamId(matchingAsk.getMatching().getMatchingTeamId())
                .versusTeamId(matchingAsk.getVersusTeamId())
                .permit(matchingAsk.getPermit())
                .build();
    }

}
