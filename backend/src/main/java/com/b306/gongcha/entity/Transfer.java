package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.TransferResponse;
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
public class Transfer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_type")
    @Schema(description = "매칭 성격", allowableValues = { "친선", "내전"} )
    private MatchType matchType; // 매치 성격 - 내전/친선

    @Column(name = "start_time")
    @Schema(description = "희망 시작 시간", example = "9")
    private int startTime; // 희망 시간 시작

    @Schema(description = "희망 종료 시간", example = "18")
    @Column(name = "end_time")
    private int endTime; // 희망 시간 종료

    @Schema(description = "광역시, 도", example = "대전")
    private String region; // 광역시, 도

    @Schema(description = "일반시, 군, 구", example = "유성구")
    private String district; // 일반시, 군, 구

    @Schema(description = "매칭 수준", allowableValues = { "초급", "중급", "고급"} )
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준

    @Schema(description = "희망요일")
    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> dayOfWeek;

    @Schema(description = "하고 싶은 말")
    private String info; // 선수 한마디

    @Schema(description = "선수의 팀 합류 상태", defaultValue = "false")
    @Builder.Default
    private Boolean isJoined = false; // 선수가 (모집중, 모집완료, 매칭중)팀에 합류하면 선수 목록에서 보이지 않음

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "transfer", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserTransfer> userTransferList = new ArrayList<>();

    public void updateTransfer(TransferRequest transferRequest) {

        this.matchType = transferRequest.getMatchType();
        this.startTime = transferRequest.getStartTime();
        this.endTime = transferRequest.getEndTime();
        this.region = transferRequest.getRegion();
        this.district = transferRequest.getDistrict();
        this.difficulty = transferRequest.getDifficulty();
        this.dayOfWeek = transferRequest.getDayOfWeek();
        this.info = transferRequest.getInfo();
//        this.user = transferRequest.toTransfer().getUser();
    }

    public void addUser(User user) {
        this.user = user;
    }

    public void updateJoin(Boolean isJoined) {
        this.isJoined = isJoined;
    }

    public TransferResponse toTransferResponse() {

        return TransferResponse.builder()
                .id(id)
                .matchType(matchType)
                .startTime(startTime)
                .endTime(endTime)
                .region(region)
                .district(district)
                .difficulty(difficulty)
                .dayOfWeek(dayOfWeek)
                .info(info)
                .isJoined(isJoined)
                .userId(user.getId())
                .userName(user.getName())
                .build();
    }

}
