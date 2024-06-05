package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.MatchingAskRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "매칭 신청 Entity")
public class MatchingAsk extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "matching_ask_id")
    private Long id;

    @Schema(description = "매칭 글 올린 팀 id", allowableValues = "1L" )
    @Column(name = "versus_team_id")
    private Long versusTeamId;

    @Schema(description = "매칭 수락 여부", defaultValue = "false", allowableValues = { "true", "false" } )
    @Builder.Default
    private Boolean permit = false;

    // 팀 id - 팀 정보 없이 팀원들의 카드 정보만 필요하기 때문
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "matching_id")
    private Matching matching;

    public void updatePermit(Boolean permit) {

        this.permit = permit;
    }

    public void updateMatching(Matching matching) {

        this.matching = matching;
    }

    public static MatchingAsk fromRequest(MatchingAskRequest matchingAskRequest) {

        return MatchingAsk.builder()
                .versusTeamId(matchingAskRequest.getVersusTeamId())
                .permit(matchingAskRequest.getPermit())
                .build();
    }

}
