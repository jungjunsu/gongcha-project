package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.MatchingRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "매칭 Entity")
public class Matching extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "matching_id")
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    @Schema(description = "경기 날찌 시간", example = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime date; // 경기 시간

    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도

    @Schema(description = "일반시, 군, 구", example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "모집 한마디", allowableValues = "매너 풋살 팀 구합니다." )
    private String info; // 모집 한마디

    @Schema(description = "매칭 성격", allowableValues = { "초급", "중급", "고급" } )
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "매칭 성격", defaultValue = "매칭중", allowableValues = {"매칭중", "매칭완료", "경기종료"} )
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.valueOf("매칭중"); // 팀 상태 - 매칭중, 매칭완료

    // 팀 id - 팀 정보 없이 팀원들의 카드 정보만 필요하기 때문
    @Schema(description = "매칭 글 올린 팀 id", allowableValues = "1L" )
    @Column(name = "matching_team_id")
    private Long matchingTeamId;

    public void updateStatus(Status status) {

        this.status = status;
    }

    public void updateMatching(MatchingRequest matchingRequest) {

        this.date = LocalDateTime.parse(matchingRequest.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.region = matchingRequest.getRegion();
        this.district = matchingRequest.getDistrict();
        this.info = matchingRequest.getInfo();
        this.difficulty = matchingRequest.getDifficulty();
    }

    public static Matching fromRequest(MatchingRequest matchingRequest) {

        return Matching.builder()
                .date(LocalDateTime.parse(matchingRequest.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .region(matchingRequest.getRegion())
                .district(matchingRequest.getDistrict())
                .info(matchingRequest.getInfo())
                .difficulty(matchingRequest.getDifficulty())
                .matchingTeamId(matchingRequest.getMatchingTeamId())
                .build();
    }

}
