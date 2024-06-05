package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import lombok.*;

import java.util.List;

@Getter
@Builder
public class TransferRequest {

    private MatchType matchType; // 매치 성격 - 내전/친선
    private int startTime; // 희망 신청 시간 시작
    private int endTime; // 희망 신청 시간 종료
    private String region; // 광역시/도
    private String district; // 일반시/군/구
    private Difficulty difficulty; // 경기 수준
    private List<String> dayOfWeek; // 희망 요일
    private String info; // 선수 한마디
//    private Boolean isJoined; // 선수 팀 합류 여부
    private Long writerId; // 작성자

    public Transfer toTransfer() {

        return Transfer.builder()
                .matchType(matchType)
                .startTime(startTime)
                .endTime(endTime)
                .region(region)
                .district(district)
                .difficulty(difficulty)
                .dayOfWeek(dayOfWeek)
                .info(info)
                .isJoined(false)
                .build();
    }

}
