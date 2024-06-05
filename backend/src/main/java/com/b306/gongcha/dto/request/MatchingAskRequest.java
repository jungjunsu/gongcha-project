package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Matching;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "매칭 신청 요청 DTO")
public class MatchingAskRequest {

    @Schema(description = "매칭 상대팀 id", example = "2L")
    private Long versusTeamId;

    @Schema(description = "매칭 신청 승인 여부", allowableValues = { "true", "false"}, example = "false")
    private Boolean permit;

}
